export function partial<T extends unknown[], U>(
  fn: (...args: T) => U,
  ...presetArgs: Partial<T>
): (...laterArgs: Partial<T>) => U {
  return (...laterArgs: Partial<T>): U => {
    const args: T = [] as unknown as T;

    let presetIndex = 0;
    let laterIndex = 0;

    for (let i = 0; i < fn.length; i++) {
      if (
        presetIndex < presetArgs.length &&
        presetArgs[presetIndex] !== undefined
      ) {
        args[i] = presetArgs[presetIndex] as T[number];
        presetIndex++;
      } else if (
        laterIndex < laterArgs.length &&
        laterArgs[laterIndex] !== undefined
      ) {
        args[i] = laterArgs[laterIndex] as T[number];
        laterIndex++;
      } else {
        throw new Error("Not enough arguments provided");
      }
    }

    return fn(...args);
  };
}
