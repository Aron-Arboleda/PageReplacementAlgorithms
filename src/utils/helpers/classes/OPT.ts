/**
 * This file contains the OPT class, which implements the Optimal page replacement algorithm.
 */

import { getFarthestPageNumber } from '../helpers';
import {
  PageReplacementAlgorithm,
  OutputType,
} from './PageReplacementAlgorithm';

// A subclass of the PageReplacementAlgorithm class
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

  // This is the core function that implements the Optimal algorithm
  compute(): void {
    // Split the reference string into an array of page numbers
    const pageNumbers = this.referenceString.split(',').map(Number);

    // Initializing the array representation and other necessary counters
    const outputTable: OutputType[] = [];
    const generalMemory: (number | null)[] = Array(this.noOfFrames).fill(null);
    let totalPageFaults = 0;

    // Looping through each page number in the reference string
    for (let i = 0; i < pageNumbers.length; i++) {
      const pageNumber = pageNumbers[i]; // page number to be processed
      let memoryState: (number | null)[] = Array(this.noOfFrames).fill(null);
      // filling the memory state with null values to represent the memory
      // being empty initially.

      // If the page number is already in memory, it skips to the next iteration
      if (generalMemory.includes(pageNumber)) {
        outputTable.push({
          pageNumber,
          memoryState,
        });
        // this push is used to record the current state of memory
        // (mainly for displaying the output in the UI)
        continue;
      }

      if (generalMemory.includes(null)) {
        /**
         * If the memory contains empty slots, it fills the
         * first empty slot with the current page number.
         */
        const index = generalMemory.indexOf(null);
        generalMemory[index] = pageNumber;
      } else {
        // If the memory doesn't contains empty slots, it does the OPT logic.

        /**
         * Initializing an array to store the distances of each page number
         * in memory to future page numbers equal to them (to find the page that
         * will not be used for the longest period of time).
         */
        const distances: { pageNumber: number; distance: number }[] = [];

        // iterates through the memory to get all the distances
        for (let j = 0; j < generalMemory.length; j++) {
          // Gets the distance using the indexOf method starting from the
          // current index. (instead of slicing the array for memory efficiency)
          const distance = pageNumbers.indexOf(Number(generalMemory[j]), i);
          // note: indexOf returns -1 value if the pageNumber was not found.

          // store the distance computed with the attached page number
          distances.push({
            pageNumber: Number(generalMemory[j]),
            distance: distance,
          });
        }

        // Using the getFarthestPageNumber function, it finds the page number
        // that will not be used for the longest period of time.
        const farthest = getFarthestPageNumber(distances);

        // Getting the index of the page number to be replaced
        const indexOfPageNumberToChange = generalMemory.indexOf(
          farthest.pageNumber,
        );

        // Using that index to replace the page number in memory
        generalMemory[indexOfPageNumberToChange] = pageNumber;
      }

      // increment the totalPageFaults counter
      totalPageFaults++;

      // Creates a copy of the current state of memory
      // (to be used for displaying the output in the UI)
      memoryState = [...generalMemory];

      // also for displaying the output in the UI
      outputTable.push({
        pageNumber,
        memoryState,
      });
    }

    // Assigning the final outputs to the class properties
    this.recordOfOutputs = outputTable;
    this.pageFaults = totalPageFaults;
  }
}
