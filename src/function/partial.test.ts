import { describe, it, expect } from "vitest";
import { partial } from "./partial";

describe("partial", () => {
  it("should partially apply arguments to a function", () => {
    const add = (a: number, b: number, c: number): number => a + b + c;
    const partialAdd = partial(add, 1, 2);

    const result = partialAdd(3); // 1 + 2 + 3 = 6
    expect(result).toBe(6);
  });

  it("should work with different types of arguments", () => {
    const concatenate = (a: string, b: string, c: string): string => a + b + c;
    const partialConcatenate = partial(concatenate, "Hello, ", "World");

    const result = partialConcatenate("!"); // "Hello, " + "World" + "!" = "Hello, World!"
    expect(result).toBe("Hello, World!");
  });

  it("should work with no initial arguments", () => {
    const multiply = (a: number, b: number): number => a * b;
    const partialMultiply = partial(multiply);

    const result = partialMultiply(4, 5); // 4 * 5 = 20
    expect(result).toBe(20);
  });
});
