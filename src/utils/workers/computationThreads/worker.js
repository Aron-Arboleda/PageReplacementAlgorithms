import { Results } from '@utils/helpers/classes/results';
import registerPromiseWorker from 'promise-worker/register';

registerPromiseWorker(async (message) => {
  if (message.type === 'computeResultsSeparateMessage') {
    const resultsObject = new Results();
    const results = message.results;
    resultsObject.assignValues(results);

    await resultsObject.runAlgorithms();
    return JSON.stringify({ results: resultsObject });
  }
  //  else if (message.type === 'computeFootingSeparateMessage') {
  //   const footingObject = new Footing();
  //   const footing = message.footing;
  //   footingObject.assignValues(footing);

  //   await footingObject.computeFooting();
  //   return JSON.stringify({ footing: footingObject });
  // }
});
