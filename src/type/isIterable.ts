import { isFunction } from "./isFunction";
import { isNil } from "./isNil";

export function isIterable(value: unknown): value is Iterable<unknown> {
  return (
    !isNil(value) &&
    isFunction((value as Record<symbol, unknown>)[Symbol.iterator])
  );
}
