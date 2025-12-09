import { ceil } from "./ceil.js";
import { floor } from "./floor.js";

export function round(value: number): number {
  const fractionalPart = value % 1;
  if (fractionalPart === 0) return value;
  return fractionalPart >= 0.5 ? ceil(value) : floor(value);
}
