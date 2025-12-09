export function floor(value: number): number {
  return value % 1 === 0 ? value : Math.ceil(value) - 1;
}
