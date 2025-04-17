/**
 * This file is one of the worker threads used to compute the results of the
 * simulation. It is used to offload the computation from the main thread to
 * a separate thread, allowing the main thread to remain responsive.
 *
 * This is useful especially in cases where the computation is heavy and takes a long
 * time to complete.
 */

import PromiseWorker from 'promise-worker';
import Worker from 'worker-loader!./worker';

const workerResults = new Worker();
const promiseWorkerResults = new PromiseWorker(workerResults);
export const computeResultsSeparate = (results) =>
  promiseWorkerResults.postMessage({
    type: 'computeResultsSeparateMessage',
    results,
  });
