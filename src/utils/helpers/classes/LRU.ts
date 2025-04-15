import { PageReplacementAlgorithm } from './PageReplacement';

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
  }

  compute(): void {}
}
