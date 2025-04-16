import { FIFO } from './FIFO';
import { LRU } from './LRU';
import { OPT } from './OPT';

export class Results {
  referenceString: string;
  noOfFrames: number;
  fifoResults: FIFO | null;
  optResults: OPT | null;
  lruResults: LRU | null;
  algorithmWithLeastPageFaults: FIFO | OPT | LRU | null;

  constructor() {
    this.referenceString = '';
    this.noOfFrames = 0;
    this.fifoResults = null;
    this.optResults = null;
    this.lruResults = null;
    this.algorithmWithLeastPageFaults = null;
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

    // const algorithms = [fifo, lru, opt];
    // algorithms.sort((a, b) => a.pageFaults - b.pageFaults);
    // this.algorithmWithLeastPageFaults = algorithms[0];
  }

  assignValues(parametersObject: any): void {
    Object.assign(this, parametersObject);
  }
}
