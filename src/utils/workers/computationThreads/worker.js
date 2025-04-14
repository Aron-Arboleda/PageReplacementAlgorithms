// import { Columns } from '@utils/helpers/classes/columns';
// import { Footing } from '@utils/helpers/classes/footing';
// import registerPromiseWorker from 'promise-worker/register';
// registerPromiseWorker(async (message) => {
//   if (message.type === 'computeColumnsSeparateMessage') {
//     const columnsObject = new Columns();
//     const columns = message.columns;
//     columnsObject.assignValues(columns);

//     await columnsObject.computeColumn();
//     return JSON.stringify({ columns: columnsObject });
//   } else if (message.type === 'computeFootingSeparateMessage') {
//     const footingObject = new Footing();
//     const footing = message.footing;
//     footingObject.assignValues(footing);

//     await footingObject.computeFooting();
//     return JSON.stringify({ footing: footingObject });
//   }
// });
