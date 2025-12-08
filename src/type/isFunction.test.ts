import { describe, it, expect } from "vitest";
import { isFunction } from "./isFunction";

describe("isFunction", () => {
  it("should return true for function declarations", () => {
    function testFunc() {}
    expect(isFunction(testFunc)).toBe(true);
  });

  it("should return true for arrow functions", () => {
    const arrowFunc = () => {};
    expect(isFunction(arrowFunc)).toBe(true);
  });

  it("should return true for async functions", () => {
    async function asyncFunc() {}
    expect(isFunction(asyncFunc)).toBe(true);
  });

  it("should return true for class constructors", () => {
    class TestClass {}
    expect(isFunction(TestClass)).toBe(true);
  });

  it("should return false for non-function values", () => {
    expect(isFunction(0)).toBe(false);
    expect(isFunction("function")).toBe(false);
    expect(isFunction(true)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
  });
});
