export interface OutputType {
  pageNumber: number;
  memoryState: (number | null)[];
}

export class PageReplacementAlgorithm {
  // Inputs
  name: string;
  referenceString: string;
  noOfFrames: number;
  recordOfOutputs: OutputType[];
  pageFaults: number;

  constructor() {
    this.name = '';
    this.referenceString = '';
    this.noOfFrames = 0;
    this.recordOfOutputs = [];
    this.pageFaults = 0;
  }

  assignValues(parametersObject: any): void {
    Object.assign(this, parametersObject);
  }
}

export function getFarthestPageNumber(
  distances: { pageNumber: number; distance: number }[],
): { pageNumber: number; distance: number } {
  // Find all entries with distance === -1 (infinity)
  const infinityDistances = distances.filter((item) => item.distance === -1);

  if (infinityDistances.length > 0) {
    // Randomly select one from infinityDistances
    const randomIndex = Math.floor(Math.random() * infinityDistances.length);
    return infinityDistances[randomIndex];
  }

  // If there is no -1 distances, find the entry with the maximum distance
  const farthest = distances.reduce(
    (max, current) => (current.distance > max.distance ? current : max),
    distances[0],
  );

  return farthest;
}
