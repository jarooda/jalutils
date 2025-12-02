import { isUndefined } from "./isUndefined";
import { isNull } from "./isNull";

export function isNil(value: unknown): value is null | undefined {
  return isUndefined(value) || isNull(value);
}
