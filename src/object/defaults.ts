import { clone } from "./clone";

export function defaults<T>(obj: Partial<T>, defaultValues: Partial<T>): T {
  const result: Record<string, unknown> = clone(obj);

  Object.keys(defaultValues).forEach((key) => {
    if (result[key] === undefined) {
      result[key] = clone((defaultValues as Record<string, unknown>)[key]);
    }
  });

  return result as T;
}
