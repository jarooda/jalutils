import { describe, it, expect } from "vitest";
import { isIterable } from "./isIterable";

describe("isIterable", () => {
  it("should return true for arrays", () => {
    expect(isIterable([])).toBe(true);
    expect(isIterable([1, 2, 3])).toBe(true);
  });

  it("should return true for strings", () => {
    expect(isIterable("")).toBe(true);
    expect(isIterable("hello")).toBe(true);
  });

  it("should return true for Sets", () => {
    expect(isIterable(new Set())).toBe(true);
    expect(isIterable(new Set([1, 2, 3]))).toBe(true);
  });

  it("should return true for Maps", () => {
    expect(isIterable(new Map())).toBe(true);
    expect(isIterable(new Map([[1, "a"]]))).toBe(true);
  });

  it("should return true for custom iterables", () => {
    const customIterable = {
      [Symbol.iterator]() {
        let step = 0;
        return {
          next() {
            step++;
            if (step <= 3) {
              return { value: step, done: false };
            }
            return { value: undefined, done: true };
          },
        };
      },
    };
    expect(isIterable(customIterable)).toBe(true);
  });

  it("should return false for null and undefined", () => {
    expect(isIterable(null)).toBe(false);
    expect(isIterable(undefined)).toBe(false);
  });

  it("should return false for non-iterable values", () => {
    expect(isIterable(123)).toBe(false);
    expect(isIterable(true)).toBe(false);
    expect(isIterable({})).toBe(false);
    expect(isIterable(() => {})).toBe(false);
  });
});
