// import { getLoadByCategory } from '@utils/constants/floorTypes';
// import { Beam } from '@utils/helpers/classes/sampleClass';
// import {
//   compare,
//   computeString,
//   roundUpToNearest,
// } from '../mathLibrariesFunctions';
// import { computeSeismicFactors, computeV } from '../initialComputations';

// export function initializeFloorsWithFloorType(parametersObject: Beam) {
//   const { floorsWithFloorType } = parametersObject;
//   floorsWithFloorType.push({ floor: 'Roof', floorType: 'Roof' });
//   const floorsWithFloorTypeReverse = floorsWithFloorType.reverse();
//   return { floorsWithFloorType: floorsWithFloorTypeReverse };
// }

// export interface FloorWeightType {
//   floor: string;
//   LL: string;
//   DL: string;
//   Fv: string;
// }

// export function calculateFloorWeight(parametersObject: Beam) {
//   const {
//     floorsWithFloorType,
//     longestLongitudinalDimension,
//     longestTransverseDimension,
//   } = parametersObject;
//   const LongD = longestLongitudinalDimension;
//   const TransD = longestTransverseDimension;

//   const floorWeightsTable = floorsWithFloorType.map((floorWithFloorType) => {
//     const floor = floorWithFloorType.floor;
//     const LL =
//       getLoadByCategory(floorWithFloorType.floorType)?.toString() || '0';
//     const DL = '3.6';
//     const Fv = computeString(
//       `(1.2 * ${DL} + 1.6 * ${LL}) * (${TransD} * ${LongD})`,
//     );

//     const floorWeight: FloorWeightType = { floor, LL, DL, Fv };

//     return floorWeight;
//   });

//   let W_eq = '';
//   for (let i = 0; i < floorWeightsTable.length; i++) {
//     if (i === floorWeightsTable.length - 1) {
//       W_eq += `${floorWeightsTable[i].Fv}`;
//     } else {
//       W_eq += `${floorWeightsTable[i].Fv} + `;
//     }
//   }

//   const totalWeight_W = computeString(`${W_eq}`);

//   return { floorWeightsTable, totalWeight_W };
// }

// export function determineSeismicParameters(parametersObject: Beam) {
//   const { floorHeight, footingHeight, noOfFloors } = parametersObject;
//   const { Na, Ca, Nv, Cv } = computeSeismicFactors(parametersObject);

//   const T = computeString(
//     `0.0731 * ((${footingHeight} + (${floorHeight} * ${noOfFloors})) ^ 0.75)`,
//   );

//   return { Na, Ca, Nv, Cv, T };
// }

// export function computeBeamBaseShear(parametersObject: Beam) {
//   const { Ca, totalWeight_W, Cv, T } = parametersObject;
//   const { Vmin, Vmax, Vactual, V } = computeV(Ca, totalWeight_W, Cv, T);
//   return { Vmin, Vmax, Vactual, V };
// }

// export interface VerticalDistributionTableType {
//   floor: string;
//   W: string;
//   H: string;
//   WH: string;
//   F: string;
// }

// export function computeVerticalDistribution(parametersObject: Beam) {
//   const { floorWeightsTable, V, T, footingHeight, floorHeight } =
//     parametersObject;

//   interface InitialVerticalDistributionTableType {
//     floor: string;
//     W: string;
//     H: string;
//     WH: string;
//   }

//   const initialVerticalDistributionTable = floorWeightsTable.map(
//     (floorWeight, i) => {
//       const floor = floorWeight.floor;
//       const W = floorWeight.Fv;
//       const H = computeString(
//         `${footingHeight} + (${floorHeight} * (${floorWeightsTable.length} - ${i + 1}))`,
//       );
//       const WH = computeString(`${W} * ${H}`);

//       const verticalDistribution: InitialVerticalDistributionTableType = {
//         floor,
//         W,
//         H,
//         WH,
//       };

//       return verticalDistribution;
//     },
//   );

//   let totalWH_eq = '';
//   for (let i = 0; i < initialVerticalDistributionTable.length; i++) {
//     if (i === initialVerticalDistributionTable.length - 1) {
//       totalWH_eq += `${initialVerticalDistributionTable[i].WH}`;
//     } else {
//       totalWH_eq += `${initialVerticalDistributionTable[i].WH} + `;
//     }
//   }
//   const totalWH = computeString(`${totalWH_eq}`);

//   const verticalDistributionTable = initialVerticalDistributionTable.map(
//     (floorWeight, i) => {
//       const floor = floorWeight.floor;
//       const W = floorWeight.W;
//       const H = floorWeight.H;
//       const WH = floorWeight.WH;

//       const Ft = compare(`${T} >= 0.7`)
//         ? computeString(`0.7 * ${T} * ${V}`)
//         : '0';

//       const F = computeString(`((${V} - ${Ft}) * ${WH}) / ${totalWH}`);

//       const verticalDistribution: VerticalDistributionTableType = {
//         floor,
//         W,
//         H,
//         WH,
//         F,
//       };

//       return verticalDistribution;
//     },
//   );

//   return { totalWH, verticalDistributionTable };
// }

// export interface StoryLateralForcesTableType {
//   floor: string;
//   F: string;
//   DFplusTF: string;
//   storyLateralForce: string;
// }

// export function computeHorizontalDistribution(parametersObject: Beam) {
//   const {
//     longestLongitudinalDimension,
//     longestTransverseDimension,
//     transverseNoOfColumns,
//     longitudinalNoOfColumns,
//     along,
//     frame,
//     verticalDistributionTable,
//   } = parametersObject;

//   const longNCol = longitudinalNoOfColumns;
//   const transNCol = transverseNoOfColumns;

//   const LongD = longestLongitudinalDimension;
//   const TransD = longestTransverseDimension;

//   const momentTrans = computeString(`1 * (0.05 * ${LongD})`);
//   const momentLong = computeString(`1 * (0.05 * ${TransD})`);

//   const HDTransverseTable = makeHorizontalDistributionTable({
//     nRows: longNCol,
//     R: `${transNCol}`,
//     RSummation: computeString(`${transNCol} * ${longNCol}`),
//     dParam: `${LongD}`,
//     dimension: `${LongD}`,
//     noOfColumns: `${longNCol}`,
//     moment: `${momentTrans}`,
//   });

//   const HDLongitudinalTable = makeHorizontalDistributionTable({
//     nRows: transNCol,
//     R: `${longNCol}`,
//     RSummation: computeString(`${transNCol} * ${longNCol}`),
//     dParam: `${TransD}`,
//     dimension: `${TransD}`,
//     noOfColumns: `${transNCol}`,
//     moment: `${momentLong}`,
//   });

//   let finalDFplusTF = '0';
//   let finalDFplusTFInfo = { table: '', index: 0 };
//   const isTrans = compare(`${along} == ${TransD}`);
//   if (isTrans) {
//     finalDFplusTF = HDLongitudinalTable[frame - 1].DFplusTF;
//     finalDFplusTFInfo = { table: 'long', index: frame - 1 };
//   } else {
//     finalDFplusTF = HDTransverseTable[frame - 1].DFplusTF;
//     finalDFplusTFInfo = { table: 'trans', index: frame - 1 };
//   }

//   const storyLateralForcesTable = verticalDistributionTable.map(
//     (verticalDistribution, i) => {
//       const floor = verticalDistribution.floor;
//       const F = verticalDistribution.F;
//       const DFplusTF = finalDFplusTF;
//       const storyLateralForce = computeString(`${F} * ${DFplusTF}`);

//       const storyLateralForceRecord: StoryLateralForcesTableType = {
//         floor,
//         F,
//         DFplusTF,
//         storyLateralForce,
//       };

//       return storyLateralForceRecord;
//     },
//   );

//   return {
//     momentTrans,
//     momentLong,
//     HDTransverseTable,
//     HDLongitudinalTable,
//     finalDFplusTF,
//     finalDFplusTFInfo,
//     storyLateralForcesTable,
//   };
// }

// interface HorizontalDistributionParameters {
//   nRows: number;
//   R: string;
//   RSummation: string;
//   dParam: string;
//   dimension: string;
//   noOfColumns: string;
//   moment: string;
// }

// export interface HDTableType {
//   frame: string;
//   R: string;
//   DF: string;
//   d: string;
//   d2: string;
//   Rd2: string;
//   TF: string;
//   DFplusTF: string;
//   totalRd2: string;
// }

// export function makeHorizontalDistributionTable({
//   nRows,
//   R,
//   RSummation,
//   dParam,
//   dimension,
//   noOfColumns,
//   moment,
// }: HorizontalDistributionParameters): HDTableType[] {
//   interface HDInitialTableType {
//     frame: string;
//     R: string;
//     DF: string;
//     d: string;
//     d2: string;
//     Rd2: string;
//   }

//   const HDInitialTable: HDInitialTableType[] = [];

//   for (let i = 0; i < nRows; i++) {
//     const frameName = `${i + 1}`;
//     const DF = computeString(`${R} / ${RSummation}`);
//     const d = computeString(
//       `abs((${dParam} / 2) - ((${dimension} / (${noOfColumns} - 1)) * ${i}))`,
//     );
//     const d2 = computeString(`${d} ^ 2`);
//     const Rd2 = computeString(`${R} * ${d2}`);

//     const HDInitial: HDInitialTableType = {
//       frame: frameName,
//       R,
//       DF,
//       d,
//       d2,
//       Rd2,
//     };

//     HDInitialTable.push(HDInitial);
//   }

//   let totalRd2_eq = '';
//   for (let i = 0; i < HDInitialTable.length; i++) {
//     if (i === HDInitialTable.length - 1) {
//       totalRd2_eq += `${HDInitialTable[i].Rd2}`;
//     } else {
//       totalRd2_eq += `${HDInitialTable[i].Rd2} + `;
//     }
//   }
//   const totalRd2 = computeString(`${totalRd2_eq}`);

//   const HDTable: HDTableType[] = HDInitialTable.map((HDInitial) => {
//     const frame = HDInitial.frame;
//     const R = HDInitial.R;
//     const DF = HDInitial.DF;
//     const d = HDInitial.d;
//     const d2 = HDInitial.d2;
//     const Rd2 = HDInitial.Rd2;

//     let TF = '0';
//     try {
//       TF = computeString(`(${moment} / ${d}) * (${Rd2} / ${totalRd2})`);
//     } catch (error) {
//       TF = '0';
//     }

//     const DFplusTF = computeString(`${DF} + ${TF}`);

//     const HD: HDTableType = {
//       frame,
//       R,
//       DF,
//       d,
//       d2,
//       Rd2,
//       TF,
//       DFplusTF,
//       totalRd2,
//     };
//     return HD;
//   });

//   return HDTable;
// }

// export interface MomentDistributionTableType {
//   floor: string;
//   V: string;
//   moment: string;
// }

// export function computeMomentDistribution(parametersObject: Beam) {
//   const {
//     noOfFloors,
//     storyLateralForcesTable,
//     along,
//     longestTransverseDimension,
//     transverseNoOfColumns,
//     longitudinalNoOfColumns,
//     floorHeight,
//   } = parametersObject;
//   const TransD = longestTransverseDimension;

//   const momentDistributionTable: MomentDistributionTableType[] = [];
//   const isTrans = compare(`${along} == ${TransD}`);
//   const noOfColumns = isTrans ? longitudinalNoOfColumns : transverseNoOfColumns;

//   let momentMemory = '0';

//   const noOfV = computeString(`2 + ((${noOfColumns} - 2) * 2)`);
//   for (let i = 0; i < noOfFloors + 1; i++) {
//     const V = computeString(
//       `${storyLateralForcesTable[i].storyLateralForce} / ${noOfV}`,
//     );
//     const moment = computeString(
//       `${momentMemory} + ${V} * (${floorHeight} / 2)`,
//     );
//     momentMemory = moment;

//     momentDistributionTable.push({
//       floor: storyLateralForcesTable[i].floor,
//       V,
//       moment,
//     });
//   }

//   return { momentDistributionTable, noOfV };
// }

// interface A1orA2Parameters {
//   A1orA2_shorterSide: number;
//   A1orA2_longerSide: number;
//   LL: string;
//   DL: string;
//   span: number;
// }

// export interface A1orA2MomentType {
//   otherLength: number;
//   L: number;
//   w: string;
//   Fu_oneway: string;
//   a: string;
//   Fu_twoway: string;
//   Mu_oneway: string;
//   Mu_twoway: string;
//   chosenMoment: string;
// }

// function computeMomentForA1orA2({
//   A1orA2_shorterSide,
//   A1orA2_longerSide,
//   LL,
//   DL,
//   span,
// }: A1orA2Parameters): A1orA2MomentType {
//   const otherLength =
//     span === A1orA2_shorterSide ? A1orA2_longerSide : A1orA2_shorterSide;
//   const L =
//     span === A1orA2_shorterSide ? A1orA2_shorterSide : A1orA2_longerSide;
//   const w = computeString(`(1.2 * ${DL} + 1.6 * ${LL}) * (${otherLength} / 2)`);
//   const Fu_oneway = computeString(`${w} * ${L}`);
//   const a = computeString(`${otherLength} / 2`);
//   const Fu_twoway = computeString(`${w} * (${L} - ${a})`);

//   const Mu_oneway = computeString(`(${Fu_oneway} * ${L}) / 8`);
//   let Mu_twoway;
//   try {
//     Mu_twoway = computeString(
//       `(${Fu_twoway} * (3 * (${L} ^ 2) - 4 * (${a} ^ 2))) / (24 * (${L} - ${a}))`,
//     );
//   } catch (error) {
//     Mu_twoway = '0';
//   }

//   let chosenMoment;
//   try {
//     chosenMoment = compare(
//       `(${A1orA2_longerSide} / ${A1orA2_shorterSide}) <= 2`,
//     )
//       ? Mu_twoway
//       : Mu_oneway;
//   } catch (error) {
//     chosenMoment = Mu_twoway;
//     throw new Error('Error in chosenMoment computation');
//   }

//   return {
//     otherLength,
//     L,
//     w,
//     Fu_oneway,
//     a,
//     Fu_twoway,
//     Mu_oneway,
//     Mu_twoway,
//     chosenMoment,
//   };
// }

// export interface BeamResultsType {
//   A1Results: A1orA2MomentType;
//   A2Results: A1orA2MomentType;
//   momentFromLevel: string;
//   totalMoment: string;
//   finalMoment: string;
// }

// export function computeForSpecificBeam(parametersObject: Beam) {
//   const {
//     level,
//     span,
//     a1_longerSide,
//     a1_shorterSide,
//     a2_longerSide,
//     a2_shorterSide,
//     floorWeightsTable,
//     momentDistributionTable,
//   } = parametersObject;

//   const LL =
//     floorWeightsTable.find((floorWeight) => floorWeight.floor === level)?.LL ||
//     '0';
//   const DL = '3.6';

//   const A1Results = computeMomentForA1orA2({
//     A1orA2_shorterSide: a1_shorterSide,
//     A1orA2_longerSide: a1_longerSide,
//     LL,
//     DL,
//     span,
//   });
//   const A2Results = computeMomentForA1orA2({
//     A1orA2_shorterSide: a2_shorterSide,
//     A1orA2_longerSide: a2_longerSide,
//     LL,
//     DL,
//     span,
//   });

//   const momentFromLevel =
//     momentDistributionTable.find((moment) => moment.floor === level)?.moment ||
//     '0';
//   const totalMoment = computeString(
//     `${momentFromLevel} + ${A1Results.chosenMoment} + ${A2Results.chosenMoment}`,
//   );

//   let finalMoment = '0';
//   if (compare(`${span} > 5`)) {
//     finalMoment = computeString(`0.6 * ${totalMoment}`);
//   } else if (compare(`${span} < 4`)) {
//     finalMoment = computeString(`1 * ${totalMoment}`);
//   } else {
//     finalMoment = computeString(`0.85 * ${totalMoment}`);
//   }

//   return {
//     A1Results,
//     A2Results,
//     momentFromLevel,
//     totalMoment,
//     finalMoment,
//   };
// }

// export function computeForSteelRatio(parametersObject: Beam) {
//   const { level } = parametersObject;

//   const fc = '27.6';
//   const fy = '280';
//   const valueDifferentOnBothCases = level !== 'Roof' ? '0.009' : '0.023';

//   const P = computeString(
//     `(0.85 ^ 2) * (${fc} / ${fy}) * (0.003 / (0.003 + ${valueDifferentOnBothCases}))`,
//   );

//   return { fc, fy, P };
// }

// export function computeForBeamDimension(parametersObject: Beam) {
//   const { finalMoment, P, fy, fc, width, reinforcementBar } = parametersObject;

//   const phi = '0.9';
//   const bd2 = computeString(
//     `(${finalMoment} * 1000000) / (${phi} * ${P} * ${fy} * (1 - ((${P} * ${fy}) / (1.7 * ${fc}))))`,
//   );

//   const L = width ? width : '300';
//   const d = computeString(`sqrt(${bd2} / ${L})`);

//   const cc = '40';
//   const Hinitial = computeString(
//     `${d} + ${cc} + ${reinforcementBar ? reinforcementBar : '12.5'}`,
//   );
//   const H = roundUpToNearest(Hinitial, '25');

//   const finalSize = `${L} mm x ${H} mm (B x H)`;

//   return { bd2, L, d, Hinitial, H, finalSize };
// }
