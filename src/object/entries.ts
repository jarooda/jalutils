import { clone } from "./clone";

export function entries<T extends object>(obj: T): [string, unknown][] {
  return Object.entries(obj).map(([key, value]) => [clone(key), clone(value)]);
}
