export interface OutputType {
  pageNumber: number;
  memoryState: (number | null)[];
}

export class PageReplacementAlgorithm {
  // Inputs
  name: string;
  referenceString: string;
  noOfFrames: number;
  recordOfOutputs: OutputType[];
  pageFaults: number;

  constructor() {
    this.name = '';
    this.referenceString = '';
    this.noOfFrames = 0;
    this.recordOfOutputs = [];
    this.pageFaults = 0;
  }

  assignValues(parametersObject: any): void {
    Object.assign(this, parametersObject);
  }
}
