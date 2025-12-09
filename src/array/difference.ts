export function difference<T>(array: T[], ...others: T[][]): T[] {
  const otherElements = new Set(others.flat());
  return array.filter((item) => !otherElements.has(item));
}
