export function kebabCase(str: string): string {
  return str
    .split(/[\s_]+/)
    .filter((word) => word.length > 0)
    .map((word) => word.toLowerCase())
    .join("-");
}
