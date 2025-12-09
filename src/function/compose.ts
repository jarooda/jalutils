// compose is a utility function that composes multiple functions from right to left.
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T): T => {
    return fns.reduceRight((acc, fn) => fn(acc), arg);
  };
}
