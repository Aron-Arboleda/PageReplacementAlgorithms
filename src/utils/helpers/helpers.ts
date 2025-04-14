import { compute, computeString } from './computations/mathLibrariesFunctions';

export const handleNumericInput = (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  if (
    ['e', 'E', '+', '-', '.'].includes(e.key) || // Block non-numeric keys
    (e.key === '0' && e.currentTarget.value.length === 0) // Prevent leading zeros
  ) {
    e.preventDefault();
  }
};

export const handleNumericPaste = (
  e: React.ClipboardEvent<HTMLInputElement>,
) => {
  const pastedText = e.clipboardData.getData('text');
  if (!/^\d+$/.test(pastedText)) {
    e.preventDefault();
  }
};

export const handleDecimalInput = (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  if (
    ['e', 'E', '+', '-'].includes(e.key) || // Block non-numeric keys
    (e.key === '.' && e.currentTarget.value.includes('.')) // Prevent multiple dots
  ) {
    e.preventDefault();
  }
};

export const handleDecimalPaste = (
  e: React.ClipboardEvent<HTMLInputElement>,
) => {
  const pastedText = e.clipboardData.getData('text');
  if (!/^\d*\.?\d*$/.test(pastedText)) {
    // Allow only numbers with one optional dot
    e.preventDefault();
  }
};

export function removeDuplicates<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export function toRankString(number: number): string {
  if (!Number.isInteger(number) || number <= 0) {
    return `0`;
  }

  const suffixes = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
  const numStr = number.toString();

  if (numStr.endsWith('11') || numStr.endsWith('12') || numStr.endsWith('13')) {
    return `${number}th`;
  }

  const lastDigit = number % 10;
  return `${number}${suffixes[lastDigit]}`;
}

export function roundToThreeDecimals(numStr: string | undefined) {
  if (!numStr) return undefined; // Handle undefined input
  let num = parseFloat(numStr);
  if (isNaN(num)) return 'Invalid input'; // Handle invalid numbers
  return parseFloat(num.toFixed(3)).toString(); // Remove trailing zeros
}

export function multiplyString(str: string, times: number) {
  return str.repeat(times);
}
