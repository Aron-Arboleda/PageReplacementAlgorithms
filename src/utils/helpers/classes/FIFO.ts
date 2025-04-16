import {
  OutputType,
  PageReplacementAlgorithm,
} from '@utils/helpers/classes/PageReplacementAlgorithm';

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
    this.infos = [
      'FIFO (First-In-First-Out) is a page replacement algorithm that replaces the oldest page in memory when a new page needs to be loaded.',
      'In FIFO, the pages are organized in a queue, and the page that has been in memory the longest is replaced first.',
      'This algorithm is simple to implement but can lead to suboptimal performance in certain scenarios.',
    ];
  }

  compute(): void {
    const pageNumbers = this.referenceString.split(',').map(Number);
    const outputTable: OutputType[] = [];
    let indexTracker = 0;
    const generalMemory: (number | null)[] = Array(this.noOfFrames).fill(null);
    let totalPageFaults = 0;
    for (let i = 0; i < pageNumbers.length; i++) {
      const pageNumber = pageNumbers[i];
      let memoryState: (number | null)[] = Array(this.noOfFrames).fill(null);

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
