// import { determineEarthquakeParameters } from '../computations/initialComputations';

// export interface BeamInputsType {
//   longestTransverseDimension: number;
//   longestLongitudinalDimension: number;
//   transverseNoOfColumns: number;
//   longitudinalNoOfColumns: number;
//   level: string;
//   span: number;
//   along: number;
//   frame: number;
//   a1_longerSide: number;
//   a1_shorterSide: number;
//   a2_longerSide: number;
//   a2_shorterSide: number;
//   width: number;
//   reinforcementBar: number;
// }

// export interface FloorsWithFloorTypeType {
//   floor: string;
//   floorType: string;
// }
// import {
//   HDTableType,
//   StoryLateralForcesTableType,
//   VerticalDistributionTableType,
//   MomentDistributionTableType,
//   A1orA2MomentType,
// } from '../computations/beam/beamComputations';

// export class Beam {
//   // Properties
//   projectLocation: string;
//   noOfFloors: number;

//   longestTransverseDimension: number;
//   longestLongitudinalDimension: number;
//   transverseNoOfColumns: number;
//   longitudinalNoOfColumns: number;

//   level: string;
//   span: number;
//   along: number;
//   frame: number;

//   a1_longerSide: number;
//   a1_shorterSide: number;
//   a2_longerSide: number;
//   a2_shorterSide: number;

//   width: number;
//   reinforcementBar: number;

//   floorsWithFloorType: FloorsWithFloorTypeType[];

//   // Initial Constants
//   floorHeight: number;
//   footingHeight: number;

//   // Floor Weights
//   floorWeightsTable: FloorWeightType[];
//   totalWeight_W: string;

//   // Earthquake Parameters
//   AF: string;
//   ZF: string;

//   // Seismic Parameters
//   Na: string;
//   Ca: string;
//   Nv: string;
//   Cv: string;
//   T: string;

//   // Base Shear (Vmin, Vmax, Vactual, V)
//   Vmin: string;
//   Vmax: string;
//   Vactual: string;
//   V: string;

//   // Vertical Distribution (totalWH, verticalDistributionTable)
//   totalWH: string;
//   verticalDistributionTable: VerticalDistributionTableType[];

//   // Horizontal Distribution (momentTrans,momentLong,HDTransverseTable,HDLongitudinalTable,finalDFplusTF, StoryLateralForcesTable,)
//   momentTrans: string;
//   momentLong: string;
//   HDTransverseTable: HDTableType[];
//   HDLongitudinalTable: HDTableType[];
//   finalDFplusTF: string;
//   finalDFplusTFInfo: { table: string; index: number };
//   storyLateralForcesTable: StoryLateralForcesTableType[];

//   // Moment Distribution (momentDistributionTable, noOfV)
//   momentDistributionTable: MomentDistributionTableType[];
//   noOfV: string;

//   // Specific Beam (A1Results,A2Results,momentFromLevel,totalMoment,finalMoment)
//   A1Results: A1orA2MomentType | null;
//   A2Results: A1orA2MomentType | null;
//   momentFromLevel: string;
//   totalMoment: string;
//   finalMoment: string;

//   // Steel Ratio (fc, fy, P)
//   fc: string;
//   fy: string;
//   P: string;

//   // Beam Dimension (bd2, L, d, H, finalSize)
//   bd2: string;
//   L: string;
//   d: string;
//   Hinitial: string;
//   H: string;
//   finalSize: string;

//   constructor() {
//     this.projectLocation = 'Tarlac';
//     this.noOfFloors = 0;

//     // Plan Dimensions
//     this.longestTransverseDimension = 0;
//     this.longestLongitudinalDimension = 0;
//     this.transverseNoOfColumns = 0;
//     this.longitudinalNoOfColumns = 0;

//     // Beam Information
//     this.level = '0';
//     this.span = 0;
//     this.along = 0;
//     this.frame = 0;

//     // Distance
//     this.a1_longerSide = 0;
//     this.a1_shorterSide = 0;
//     this.a2_longerSide = 0;
//     this.a2_shorterSide = 0;

//     //optional
//     this.width = 0;
//     this.reinforcementBar = 0;

//     this.floorsWithFloorType = [];

//     // Initial Constants
//     this.floorHeight = 3.5; // Default value
//     this.footingHeight = 2; // Default value

//     // Floor Weights
//     this.floorWeightsTable = [];
//     this.totalWeight_W = '0';

//     // Earthquake Parameters
//     this.AF = '0';
//     this.ZF = '0';

//     // Seismic Parameters
//     this.Na = '0';
//     this.Ca = '0';
//     this.Nv = '0';
//     this.Cv = '0';
//     this.T = '0';

//     // Base Shear (Vmin, Vmax, Vactual, V)
//     this.Vmin = '0';
//     this.Vmax = '0';
//     this.Vactual = '0';
//     this.V = '0';

//     // Vertical Distribution (totalWH, verticalDistributionTable)
//     this.totalWH = '0';
//     this.verticalDistributionTable = [];

//     // Horizontal Distribution (momentTrans,momentLong,HDTransverseTable,HDLongitudinalTable,finalDFplusTF, StoryLateralForcesTable,)
//     this.momentTrans = '0';
//     this.momentLong = '0';
//     this.HDTransverseTable = [];
//     this.HDLongitudinalTable = [];
//     this.finalDFplusTF = '0';
//     this.finalDFplusTFInfo = { table: '', index: 0 };
//     this.storyLateralForcesTable = [];

//     // Moment Distribution (momentDistributionTable, noOfV)
//     this.momentDistributionTable = [];
//     this.noOfV = '0';

//     // Specific Beam (A1Results,A2Results,momentFromLevel,totalMoment,finalMoment)
//     this.A1Results = null;
//     this.A2Results = null;
//     this.momentFromLevel = '0';
//     this.totalMoment = '0';
//     this.finalMoment = '0';

//     // Steel Ratio (fc, fy, P)
//     this.fc = '0';
//     this.fy = '0';
//     this.P = '0';

//     // Beam Dimension (bd2, L, d, H, finalSize)
//     this.bd2 = '0';
//     this.L = '0';
//     this.d = '0';
//     this.Hinitial = '0';
//     this.H = '0';
//     this.finalSize = '0';
//   }

//   async computeBeam(): Promise<void> {
//     try {
//       const preparedFloorsWithFloorType =
//         await initializeFloorsWithFloorType(this);
//       Object.assign(this, preparedFloorsWithFloorType);
//     } catch (error) {
//       console.error('Error initializing floors with floor type:', error);
//       throw new Error('Failed to initialize floors with floor type.: ' + error);
//     }

//     try {
//       const floorWeights = await calculateFloorWeight(this);
//       Object.assign(this, floorWeights);
//     } catch (error) {
//       console.error('Error calculating floor weights:', error);
//       throw new Error('Failed to calculate floor weights.: ' + error);
//     }

//     try {
//       const earthquakeParams = await determineEarthquakeParameters(this);
//       Object.assign(this, earthquakeParams);
//     } catch (error) {
//       console.error('Error determining earthquake parameters:', error);
//       throw new Error('Failed to determine earthquake parameters.: ' + error);
//     }

//     try {
//       const seismicParameters = await determineSeismicParameters(this);
//       Object.assign(this, seismicParameters);
//     } catch (error) {
//       console.error('Error determining seismic parameters:', error);
//       throw new Error('Failed to determine seismic parameters.: ' + error);
//     }

//     try {
//       const baseShear = await computeBeamBaseShear(this);
//       Object.assign(this, baseShear);
//     } catch (error) {
//       console.error('Error computing beam base shear:', error);
//       throw new Error('Failed to compute beam base shear.: ' + error);
//     }

//     try {
//       const verticalDistribution = await computeVerticalDistribution(this);
//       Object.assign(this, verticalDistribution);
//     } catch (error) {
//       console.error('Error computing vertical distribution:', error);
//       throw new Error('Failed to compute vertical distribution.: ' + error);
//     }

//     try {
//       const horizontalDistribution = await computeHorizontalDistribution(this);
//       Object.assign(this, horizontalDistribution);
//     } catch (error) {
//       console.error('Error computing horizontal distribution:', error);
//       throw new Error('Failed to compute horizontal distribution.: ' + error);
//     }

//     try {
//       const momentDistribution = await computeMomentDistribution(this);
//       Object.assign(this, momentDistribution);
//     } catch (error) {
//       console.error('Error computing moment distribution:', error);
//       throw new Error('Failed to compute moment distribution.: ' + error);
//     }

//     try {
//       const specificBeam = await computeForSpecificBeam(this);
//       Object.assign(this, specificBeam);
//     } catch (error) {
//       console.error('Error computing specific beam:', error);
//       throw new Error('Failed to compute specific beam.: ' + error);
//     }

//     try {
//       const steelRatio = await computeForSteelRatio(this);
//       Object.assign(this, steelRatio);
//     } catch (error) {
//       console.error('Error computing steel ratio:', error);
//       throw new Error('Failed to compute steel ratio.: ' + error);
//     }

//     try {
//       const beamDimensions = await computeForBeamDimension(this);
//       Object.assign(this, beamDimensions);
//     } catch (error) {
//       console.error('Error computing beam dimensions:', error);
//       throw new Error('Failed to compute beam dimensions.: ' + error);
//     }
//   }

//   assignValues(values: any): void {
//     Object.assign(this, values);
//   }

//   getInputValues(): BeamInputsType {
//     return {
//       longestTransverseDimension: this.longestTransverseDimension,
//       longestLongitudinalDimension: this.longestLongitudinalDimension,
//       transverseNoOfColumns: this.transverseNoOfColumns,
//       longitudinalNoOfColumns: this.longitudinalNoOfColumns,
//       level: this.level,
//       span: this.span,
//       along: this.along,
//       frame: this.frame,
//       a1_longerSide: this.a1_longerSide,
//       a1_shorterSide: this.a1_shorterSide,
//       a2_longerSide: this.a2_longerSide,
//       a2_shorterSide: this.a2_shorterSide,
//       width: this.width,
//       reinforcementBar: this.reinforcementBar,
//     };
//   }
// }

// // const columns = new Columns({
// //   floorType: "Office",
// //   noOfFloors: 4,
// //   projectLocation: "Bataan",
// //   noOfColumns: 9,
// //   floorHeight: 3,
// //   longestTransverseDimension: 6,
// //   longestLongitudinalDimension: 10,
// //   RD: 0,
// //   LD: 2,
// //   UD: 0,
// //   SD: 5,
// // });

// // columns.computeColumn();

// // console.log(`PnavailableX: ${columns.PnavailableX}`);
// // console.log(`PnavailableY: ${columns.PnavailableY}`);
// // console.log(`cX: ${columns.cX}`);
// // console.log(`cY: ${columns.cY}`);
// // console.log(`avgRatio: ${columns.avgRatio}`);
// // console.log(
// //   `finalColumnSize: It is recommended to use ${columns.finalColumnSize}mm x ${columns.finalColumnSize}mm column size.`
// // );
