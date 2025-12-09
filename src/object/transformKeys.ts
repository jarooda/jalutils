import { clone } from "./clone";

export function transformKeys<T extends object>(
  obj: T,
  transformFn: (key: string) => string,
): { [key: string]: unknown } {
  const result: { [key: string]: unknown } = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = transformFn(key);
      const value = obj[key];

      // Recursively transform keys for nested objects
      // But not for special object types (Date, RegExp, Map, Set, etc.)
      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        !(value instanceof Date) &&
        !(value instanceof RegExp) &&
        !(value instanceof Map) &&
        !(value instanceof Set) &&
        !ArrayBuffer.isView(value)
      ) {
        result[newKey] = transformKeys(value, transformFn);
      } else {
        result[newKey] = clone(value);
      }
    }
  }

  return result;
}
