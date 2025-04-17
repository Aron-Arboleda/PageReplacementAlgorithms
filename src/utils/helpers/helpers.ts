/**
 * All the helper functions used in the app
 */

// function to handle numeric input in a text field
export const handleNumericInput = (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  if (
    ['e', 'E', '+', '-', '.'].includes(e.key) ||
    (e.key === '0' && e.currentTarget.value.length === 0)
  ) {
    e.preventDefault();
  }
};

// function to handle numeric pasting in a text field
export const handleNumericPaste = (
  e: React.ClipboardEvent<HTMLInputElement>,
) => {
  const pastedText = e.clipboardData.getData('text');
  if (!/^\d+$/.test(pastedText)) {
    e.preventDefault();
  }
};

// used for UI purposes only
export function multiplyString(str: string, times: number) {
  return str.repeat(times);
}

// The function that is used to generate a random number string separated by commas
export function generateRandomNumberString(limit: number = 50): string {
  // Mainly using a combination of Math.random() and Math.floor() to generate random number(s)

  const count = Math.floor(Math.random() * limit) + 1; // 1 to 50

  const numbers: number[] = [];
  for (let i = 0; i < count; i++) {
    const randomDigit = Math.floor(Math.random() * 10); // 0 to 9
    numbers.push(randomDigit);
  }

  // return the numbers as a string separated by commas
  return numbers.join(',');
}

// The function used to get the farthest page number from the distances array
export function getFarthestPageNumber(
  distances: { pageNumber: number; distance: number }[],
): { pageNumber: number; distance: number } {
  // Find all entries with distance === -1
  const infinityDistances = distances.filter((item) => item.distance === -1);

  if (infinityDistances.length > 0) {
    // if there are one or more entries with distance === -1, return a random one
    const randomIndex = Math.floor(Math.random() * infinityDistances.length);
    return infinityDistances[randomIndex];
  }

  // If there are no distances === -1,
  // find the entry with the maximum distance (farthest page number)
  const farthest = distances.reduce(
    (max, current) => (current.distance > max.distance ? current : max),
    distances[0],
  );

  // return the farthest page number
  return farthest;
}
