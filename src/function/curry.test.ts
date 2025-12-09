import { describe, it, expect } from "vitest";
import { curry } from "./curry";

describe("curry", () => {
  it("should curry a function with multiple arguments", () => {
    const add = (a: number, b: number, c: number): number => a + b + c;
    const curriedAdd = curry(add);

    const result = curriedAdd(1)(2)(3);
    expect(result).toBe(6);
  });

  it("should allow partial application of arguments", () => {
    const multiply = (a: number, b: number, c: number): number => a * b * c;
    const curriedMultiply = curry(multiply);

    const partial = curriedMultiply(2)(3);
    const result = partial(4);
    expect(result).toBe(24);
  });

  it("should work with zero-argument functions", () => {
    const greet = (): string => "Hello, World!";
    const curriedGreet = curry(greet);

    const result = curriedGreet();
    expect(result).toBe("Hello, World!");
  });
});
