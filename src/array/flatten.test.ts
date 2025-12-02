import { describe, it, expect } from "vitest";
import { flatten } from "./flatten";

describe("flatten", () => {
  it("should flatten a simple array", () => {
    const arr = [1, 2, 3];
    const flattened = flatten(arr);
    expect(flattened).toEqual(arr);
  });

  it("should flatten nested arrays", () => {
    const arr = [1, [2, [3, 4]], 5];
    const flattened = flatten(arr);
    expect(flattened).toEqual([1, 2, 3, 4, 5]);
  });

  it("should handle empty arrays", () => {
    const arr: unknown[] = [];
    const flattened = flatten(arr);
    expect(flattened).toEqual([]);
  });

  it("should handle arrays with mixed types", () => {
    const arr = [1, "two", [3, { four: 4 }]];
    const flattened = flatten(arr);
    expect(flattened).toEqual([1, "two", 3, { four: 4 }]);
  });

  it("should handle deeply nested arrays", () => {
    const arr = [[[[1]]], [[2]], [[[3]]], [[[[[[[[4]]]]]]]]];
    const flattened = flatten(arr);
    expect(flattened).toEqual([1, 2, 3, 4]);
  });
});
