type CurriedFunction<F> = F extends (...args: infer P) => infer R
  ? P extends [infer A, ...infer Rest]
    ? (arg: A) => CurriedFunction<(...args: Rest) => R>
    : () => R
  : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function curry<F extends (...args: any[]) => any>(
  fn: F,
): CurriedFunction<F> {
  return function curried(...args: unknown[]): unknown {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...moreArgs: unknown[]) => curried(...args, ...moreArgs);
    }
  } as CurriedFunction<F>;
}
