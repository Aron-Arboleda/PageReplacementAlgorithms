import { PageReplacementAlgorithm } from './PageReplacement';
import { OutputType } from './PageReplacement';

export class FIFO extends PageReplacementAlgorithm {
  constructor({
    referenceString,
    noOfFrames,
  }: {
    referenceString: string;
    noOfFrames: number;
  }) {
    super();
    this.name = 'First-In-First-Out (FIFO) Algorithm';
    this.referenceString = referenceString;
    this.noOfFrames = noOfFrames;
  }

  compute(): void {
    const pageNumbers = this.referenceString.split(',').map(Number);
    const outputTable: OutputType[] = [];
    let indexTracker = 0;
    const generalMemory: number[] = [];
    let totalPageFaults = 0;
    for (let i = 0; i < pageNumbers.length; i++) {
      const pageNumber = pageNumbers[i];
      let memoryState: (number | null)[] = Array(3).fill(null);

      if (generalMemory.includes(pageNumber)) {
        outputTable.push({
          pageNumber,
          memoryState,
        });
        continue;
      }

      generalMemory[indexTracker] = pageNumber;
      totalPageFaults++;
      memoryState = [...generalMemory];

      if (indexTracker + 1 >= this.noOfFrames) {
        indexTracker = 0;
      } else {
        indexTracker++;
      }

      outputTable.push({
        pageNumber,
        memoryState,
      });
    }

    this.recordOfOutputs = outputTable;
    this.pageFaults = totalPageFaults;
  }
}
