import {
  PageReplacementAlgorithm,
  OutputType,
  getFarthestPageNumber,
} from './PageReplacementAlgorithm';

export class OPT extends PageReplacementAlgorithm {
  constructor({
    referenceString,
    noOfFrames,
  }: {
    referenceString: string;
    noOfFrames: number;
  }) {
    super();
    this.name = 'Optimal Algorithm';
    this.referenceString = referenceString;
    this.noOfFrames = noOfFrames;
    this.infos = [
      'The Optimal Page Replacement Algorithm (OPT) is a theoretical page replacement algorithm that replaces the page that will not be used for the longest period of time in the future.',
      'It is considered the best page replacement algorithm in terms of page faults, but it is impractical to implement in real systems because it requires future knowledge of page references.',
      'The optimal algorithm is often used as a benchmark to compare the performance of other page replacement algorithms.',
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
          const distance = pageNumbers.indexOf(Number(generalMemory[j]), i);
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
