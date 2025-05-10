/**
 * This file is also a worker file used to register all of
 * the worker threads used in the application.
 *
 * (used also for managing threads)
 */

import { Results } from "@utils/helpers/classes/Results";

// Define message types with proper typing
export interface WorkerMessage {
	type: string;
	results?: any;
}

export interface WorkerResponse {
	results: Results;
}

// The worker handler function
const workerHandler = async (message: WorkerMessage): Promise<string> => {
	if (message.type === "computeResultsSeparateMessage") {
		const resultsObject = new Results();
		const results = message.results;
		resultsObject.assignValues(results);

		await resultsObject.runAlgorithms();
		return JSON.stringify({ results: resultsObject });
	}

	throw new Error(`Unknown message type: ${message.type}`);
};

// Setup the worker context
// This pattern works for both web workers and module workers
const ctx: Worker = self as any;

// Event listener for messages
ctx.addEventListener("message", async (event) => {
	try {
		const result = await workerHandler(event.data);
		ctx.postMessage({ success: true, data: result });
	} catch (error) {
		ctx.postMessage({
			success: false,
			error: error instanceof Error ? error.message : String(error),
		});
	}
});

// Support for promise-worker
import registerPromiseWorker from "promise-worker/register";
registerPromiseWorker(workerHandler);

// Export the worker handler for testing purposes
export default workerHandler;
