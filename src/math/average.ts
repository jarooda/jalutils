export function average(...values: number[]): number {
  if (values.length === 0) return 0;
  const total = values.reduce((acc, val) => acc + val, 0);
  return total / values.length;
}
