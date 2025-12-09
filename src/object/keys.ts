import { clone } from "./clone";

export function keys<T extends object>(obj: T): string[] {
  return Object.keys(obj).map((key) => clone(key));
}
