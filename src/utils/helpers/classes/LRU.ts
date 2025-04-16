import {
  PageReplacementAlgorithm,
  OutputType,
  getFarthestPageNumber,
} from './PageReplacementAlgorithm';

export class LRU extends PageReplacementAlgorithm {
  constructor({
    referenceString,
    noOfFrames,
  }: {
    referenceString: string;
    noOfFrames: number;
  }) {
    super();
    this.name = 'Least Recently Used (LRU) Algorithm';
    this.referenceString = referenceString;
    this.noOfFrames = noOfFrames;
    this.infos = [
      'Least Recently Used (LRU) is a page replacement algorithm that replaces the page that has not been used for the longest period of time.',
      'It keeps track of the order in which pages are accessed and replaces the least recently used page when a page fault occurs.',
      'LRU is more efficient than FIFO and OPT in many cases, especially when the reference string exhibits locality of reference.',
    ];
  }

  compute(): void {
    const pageNumbers = this.referenceString.split(',').map(Number);
    const outputTable: OutputType[] = [];
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

      if (generalMemory.includes(null)) {
        const index = generalMemory.indexOf(null);
        generalMemory[index] = pageNumber;
      } else {
        const distances: { pageNumber: number; distance: number }[] = [];
        for (let j = 0; j < generalMemory.length; j++) {
          // Only difference from OPT is here
          const pastPageNumbers = pageNumbers.slice(0, i).reverse();
          const distance = pastPageNumbers.indexOf(Number(generalMemory[j]));
          distances.push({
            pageNumber: Number(generalMemory[j]),
            distance: distance,
          });
        }
        const farthest = getFarthestPageNumber(distances);
        const indexOfPageNumberToChange = generalMemory.indexOf(
          farthest.pageNumber,
        );
        generalMemory[indexOfPageNumberToChange] = pageNumber;
      }

      totalPageFaults++;
      memoryState = [...generalMemory];

      outputTable.push({
        pageNumber,
        memoryState,
      });
    }

    this.recordOfOutputs = outputTable;
    this.pageFaults = totalPageFaults;
  }
}
