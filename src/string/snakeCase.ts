export function snakeCase(str: string): string {
  return str
    .split(/[\s-]+/)
    .filter((word) => word.length > 0)
    .map((word) => word.toLowerCase())
    .join("_");
}
