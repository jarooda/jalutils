import { capitalize } from "./capitalize";

export function camelCase(str: string): string {
  return str
    .split(/[\s-_]+/)
    .filter((word) => word.length > 0)
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : capitalize(word.toLowerCase()),
    )
    .join("");
}
