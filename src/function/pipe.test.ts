import { describe, it, expect } from "vitest";
import { pipe } from "./pipe";

describe("pipe", () => {
  it("should compose functions from left to right", () => {
    const add2 = (x: number): number => x + 2;
    const multiply3 = (x: number): number => x * 3;
    const subtract5 = (x: number): number => x - 5;

    const pipedFunction = pipe(add2, multiply3, subtract5);

    const result = pipedFunction(4); // ((4 + 2) * 3) - 5 = 13
    expect(result).toBe(13);
  });

  it("should work with a single function", () => {
    const add10 = (x: number): number => x + 10;

    const pipedFunction = pipe(add10);

    const result = pipedFunction(5); // 5 + 10 = 15
    expect(result).toBe(15);
  });

  it("should return the input when no functions are provided", () => {
    const pipedFunction = pipe<number>();

    const result = pipedFunction(7); // should return 7
    expect(result).toBe(7);
  });
});
