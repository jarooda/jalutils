import { isNull } from "./isNull";

export function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }

  // Check if it's created by Object constructor or Object.create(null)
  const proto = Object.getPrototypeOf(value);
  return isNull(proto) || proto === Object.prototype;
}
