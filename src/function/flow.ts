import { pipe } from "./pipe";
import { compose } from "./compose";

export function flow<T>(
  direction: "left" | "right",
  ...fns: Array<(arg: T) => T>
): (arg: T) => T {
  if (direction === "right") {
    return compose(...fns);
  } else {
    return pipe(...fns);
  }
}
