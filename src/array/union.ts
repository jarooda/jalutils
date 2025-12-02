export function union<T>(...arrays: T[][]): T[] {
  const result: T[] = [];
  const seen = new Set<T>();

  for (const array of arrays) {
    for (const item of array) {
      if (!seen.has(item)) {
        seen.add(item);
        result.push(item);
      }
    }
  }

  return result;
}
