// pipe is a utility function that composes multiple functions from left to right.
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T): T => {
    return fns.reduce((acc, fn) => fn(acc), arg);
  };
}
