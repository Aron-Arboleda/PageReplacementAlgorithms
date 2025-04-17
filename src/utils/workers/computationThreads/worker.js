/**
 * This file is also a worker file used to register all of
 * the worker threads used in the application.
 *
 * (used also for managing threads)
 */

import { Results } from '@utils/helpers/classes/Results';
import registerPromiseWorker from 'promise-worker/register';

registerPromiseWorker(async (message) => {
  if (message.type === 'computeResultsSeparateMessage') {
    const resultsObject = new Results();
    const results = message.results;
    resultsObject.assignValues(results);

    await resultsObject.runAlgorithms();
    return JSON.stringify({ results: resultsObject });
  }
});
