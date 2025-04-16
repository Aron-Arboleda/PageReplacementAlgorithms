import { FIFO } from './FIFO';
import { LRU } from './LRU';
import { OPT } from './OPT';

export class Results {
  referenceString: string;
  noOfFrames: number;
  fifoResults: FIFO | null;
  optResults: OPT | null;
  lruResults: LRU | null;
  finalResultsTable: { algorithm: string; pageFaults: number }[];
  algorithmsWithLeastPageFaults: (FIFO | OPT | LRU | null)[];

  constructor() {
    this.referenceString = '';
    this.noOfFrames = 0;
    this.fifoResults = null;
    this.optResults = null;
    this.lruResults = null;
    this.algorithmsWithLeastPageFaults = [];
    this.finalResultsTable = [];
  }

  runAlgorithms(): void {
    const fifo = new FIFO({
      referenceString: this.referenceString,
      noOfFrames: this.noOfFrames,
    });
    fifo.compute();
    this.fifoResults = fifo;

    const opt = new OPT({
      referenceString: this.referenceString,
      noOfFrames: this.noOfFrames,
    });
    opt.compute();
    this.optResults = opt;

    const lru = new LRU({
      referenceString: this.referenceString,
      noOfFrames: this.noOfFrames,
    });
    lru.compute();
    this.lruResults = lru;

    this.finalResultsTable = [
      {
        algorithm: 'First-In-First-Out (FIFO)',
        pageFaults: fifo.pageFaults,
      },
      {
        algorithm: 'Optimal (OPT)',
        pageFaults: opt.pageFaults,
      },
      {
        algorithm: 'Least Recently Used (LRU)',
        pageFaults: lru.pageFaults,
      },
    ];

    const algorithms = [fifo, lru, opt];
    algorithms.sort((a, b) => a.pageFaults - b.pageFaults);
    this.algorithmsWithLeastPageFaults = algorithms.filter(
      (algorithm) => algorithm.pageFaults === algorithms[0].pageFaults,
    );
  }

  assignValues(parametersObject: any): void {
    Object.assign(this, parametersObject);
  }
}
