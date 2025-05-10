/**
 * This file is one of the worker threads used to compute the results of the
 * simulation. It is used to offload the computation from the main thread to
 * a separate thread, allowing the main thread to remain responsive.
 *
 * This is useful especially in cases where the computation is heavy and takes a long
 * time to complete.
 */

import PromiseWorker from "promise-worker";
import { Results } from "@utils/helpers/classes/Results";
import { WorkerMessage, WorkerResponse } from "./worker";

// Modern approach for TypeScript workers
// This assumes you're using a bundler like Webpack 5+, Vite, or similar
// that supports URL imports or has worker plugin configuration
const WorkerConstructor = () =>
	new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });

// Define a more specific type for the results
export interface ResultsData {
	// Add specific properties based on your actual Results class structure
	[key: string]: any;
}

// Create and initialize the worker
const createWorker = () => {
	const worker = WorkerConstructor();
	return new PromiseWorker(worker);
};

// Create worker instance
const promiseWorkerResults = createWorker();

/**
 * Computes results in a separate worker thread
 * @param results The results data to process
 * @returns Promise resolving to the computed results
 */
export const computeResultsSeparate = async (
	results: ResultsData
): Promise<Results> => {
	const message: WorkerMessage = {
		type: "computeResultsSeparateMessage",
		results,
	};

	const responseJson = await promiseWorkerResults.postMessage(message);
	const response = JSON.parse(responseJson) as WorkerResponse;
	return response.results;
};

// Export a function to create a new worker if needed
export const createNewWorker = () => createWorker();

// Default export for easier importing
export default {
	computeResultsSeparate,
	createNewWorker,
};
