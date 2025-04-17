/**
 * This file contains the FIFO class, which implements the FIFO page replacement algorithm.
 */

import {
  OutputType,
  PageReplacementAlgorithm,
} from '@utils/helpers/classes/PageReplacementAlgorithm';

// A subclass of the PageReplacementAlgorithm class
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

  // This is the core function that implements the FIFO algorithm
  compute(): void {
    // Split the reference string into an array of page numbers
    const pageNumbers = this.referenceString.split(',').map(Number);

    // Initializing the array representation and other necessary counters
    const outputTable: OutputType[] = [];
    let indexTracker = 0;
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

      /**
       * If the page number is not in memory, it replaces the oldest page.
       * (uses the indexTracker to determine which is the oldest page)
       * It also increments the totalPageFaults counter and updates the memory state.
       */
      generalMemory[indexTracker] = pageNumber;
      totalPageFaults++;
      memoryState = [...generalMemory];

      /**
       * Used to update the indexTracker (so that it doesn't go out of bounds)
       */
      if (indexTracker + 1 >= this.noOfFrames) {
        indexTracker = 0;
      } else {
        indexTracker++;
      }

      // used to record the current state of memory
      // (mainly for displaying the output in the UI)
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
