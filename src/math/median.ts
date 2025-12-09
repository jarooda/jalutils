export function median(...values: number[]): number {
  if (values.length === 0) return 0;
  const sortedValues = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 0) {
    return (sortedValues[mid - 1] + sortedValues[mid]) / 2;
  } else {
    return sortedValues[mid];
  }
}
