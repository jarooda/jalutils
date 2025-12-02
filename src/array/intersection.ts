export function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return arrays[0];

  const [first, ...rest] = arrays;

  const itemSet = new Set(first);
  for (const arr of rest) {
    const currentSet = new Set(arr);
    for (const item of itemSet) {
      if (!currentSet.has(item)) {
        itemSet.delete(item);
      }
    }
  }
  return Array.from(itemSet);
}
