export function ceil(value: number): number {
  return value % 1 === 0 ? value : Math.floor(value) + 1;
}
