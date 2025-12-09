import { describe, it, expect } from "vitest";
import { flow } from "./flow";

describe("flow", () => {
  it("should compose functions from left to right", () => {
    const add2 = (x: number): number => x + 2;
    const multiply3 = (x: number): number => x * 3;
    const subtract5 = (x: number): number => x - 5;

    const flowedFunction = flow("left", add2, multiply3, subtract5);

    const result = flowedFunction(4); // ((4 + 2) * 3) - 5 = 13
    expect(result).toBe(13);
  });

  it("should compose functions from right to left", () => {
    const add2 = (x: number): number => x + 2;
    const multiply3 = (x: number): number => x * 3;
    const subtract5 = (x: number): number => x - 5;

    const flowedFunction = flow("right", add2, multiply3, subtract5);

    const result = flowedFunction(4); // ((4 - 5) * 3) + 2 = -1
    expect(result).toBe(-1);
  });
});
