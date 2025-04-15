import PromiseWorker from 'promise-worker';
import Worker from 'worker-loader!./worker';

const workerResults = new Worker();
const promiseWorkerResults = new PromiseWorker(workerResults);
export const computeResultsSeparate = (results) =>
  promiseWorkerResults.postMessage({
    type: 'computeResultsSeparateMessage',
    results,
  });

// const workerFooting = new Worker();
// const promiseWorkerFooting = new PromiseWorker(workerFooting);
// export const computeFootingSeparate = (footing) =>
//   promiseWorkerFooting.postMessage({
//     type: 'computeFootingSeparateMessage',
//     footing,
//   });
