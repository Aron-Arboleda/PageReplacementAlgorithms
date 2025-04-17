/**
 * This file contains the main class to be inherited by the
 * different page replacement algorithms (FIFO, OPT, LRU).
 */

export interface OutputType {
  pageNumber: number;
  memoryState: (number | null)[];
}

export class PageReplacementAlgorithm {
  // Properties that is inherited by all page replacement algorithms
  name: string;
  referenceString: string;
  noOfFrames: number;
  recordOfOutputs: OutputType[];
  pageFaults: number;
  infos: string[];

  constructor() {
    this.name = '';
    this.referenceString = '';
    this.noOfFrames = 0;
    this.recordOfOutputs = [];
    this.pageFaults = 0;
    this.infos = [];
  }

  // helper function to assign values to the class properties
  assignValues(parametersObject: any): void {
    Object.assign(this, parametersObject);
  }
}
