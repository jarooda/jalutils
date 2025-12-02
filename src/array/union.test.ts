import { describe, it, expect } from "vitest";
import { union } from "./union";

describe("union", () => {
  it("should return a union of multiple arrays", () => {
    const result = union([1, 2, 3], [2, 3, 4], [4, 5]);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("should handle empty arrays", () => {
    const result = union([], [1, 2], [], [3]);
    expect(result).toEqual([1, 2, 3]);
  });

  it("should handle arrays with duplicate elements", () => {
    const result = union([1, 1, 2], [2, 3], [3, 4]);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("should return an empty array when no input arrays are provided", () => {
    const result = union();
    expect(result).toEqual([]);
  });
});
