import { clone } from "./clone";

export function values<T extends object>(obj: T): unknown[] {
  return Object.values(obj).map((value) => clone(value));
}
