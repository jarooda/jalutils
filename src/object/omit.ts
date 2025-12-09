import { clone } from "./clone";

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const cloned = clone(obj);
  keys.forEach((key) => {
    delete cloned[key];
  });
  return cloned as Omit<T, K>;
}
