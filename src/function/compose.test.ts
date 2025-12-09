import { describe, it, expect } from "vitest";
import { compose } from "./compose";

describe("compose", () => {
  it("should compose functions from right to left", () => {
    const add2 = (x: number): number => x + 2;
    const multiply3 = (x: number): number => x * 3;
    const subtract5 = (x: number): number => x - 5;

    const composedFunction = compose(subtract5, multiply3, add2);

    const result = composedFunction(4); // ((4 + 2) * 3) - 5 = 13
    expect(result).toBe(13);
  });

  it("should work with a single function", () => {
    const add10 = (x: number): number => x + 10;

    const composedFunction = compose(add10);

    const result = composedFunction(5); // 5 + 10 = 15
    expect(result).toBe(15);
  });

  it("should return the input when no functions are provided", () => {
    const composedFunction = compose<number>();

    const result = composedFunction(7); // should return 7
    expect(result).toBe(7);
  });
});
