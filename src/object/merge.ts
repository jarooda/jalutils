import { clone } from "./clone";

export function merge<T>(...objects: Partial<T>[]): T {
  const result: Record<string, unknown> = {};

  objects.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      const value = (obj as Record<string, unknown>)[key];
      if (value && typeof value === "object" && !Array.isArray(value)) {
        if (!(key in result)) {
          result[key] = clone(value);
        } else {
          result[key] = merge(
            result[key] as Record<string, unknown>,
            value as Record<string, unknown>,
          );
        }
      } else {
        result[key] = clone(value);
      }
    });
  });

  return result as T;
}
