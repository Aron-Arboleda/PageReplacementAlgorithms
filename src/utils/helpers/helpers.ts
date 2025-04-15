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

export function multiplyString(str: string, times: number) {
  return str.repeat(times);
}

export function generateRandomNumberString(limit: number = 50): string {
  const count = Math.floor(Math.random() * limit) + 1; // 1 to 50

  const numbers: number[] = [];
  for (let i = 0; i < count; i++) {
    const randomDigit = Math.floor(Math.random() * 10); // 0 to 9
    numbers.push(randomDigit);
  }

  return numbers.join(',');
}
