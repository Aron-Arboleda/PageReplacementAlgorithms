import { PageReplacementAlgorithm } from './PageReplacement';

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
  }

  compute(): void {}
}
