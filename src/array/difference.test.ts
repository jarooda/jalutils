import { describe, it, expect } from "vitest";
import { difference } from "./difference";

describe("difference", () => {
  it("should return elements that are in the first array but not in others", () => {
    const result = difference([1, 2, 3, 4], [2, 4], [3]);
    expect(result).toEqual([1]);
  });

  it("should return all elements when no other arrays provided", () => {
    const result = difference([1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  it("should return empty array when all elements are excluded", () => {
    const result = difference([1, 2, 3], [1, 2, 3]);
    expect(result).toEqual([]);
  });

  it("should handle empty first array", () => {
    const result = difference([], [1, 2, 3]);
    expect(result).toEqual([]);
  });

  it("should handle empty exclusion arrays", () => {
    const result = difference([1, 2, 3], [], []);
    expect(result).toEqual([1, 2, 3]);
  });

  it("should work with strings", () => {
    const result = difference(["a", "b", "c"], ["b"], ["c"]);
    expect(result).toEqual(["a"]);
  });

  it("should work with multiple exclusion arrays", () => {
    const result = difference([1, 2, 3, 4, 5], [2], [3], [4]);
    expect(result).toEqual([1, 5]);
  });

  it("should handle duplicates in first array", () => {
    const result = difference([1, 2, 2, 3, 3], [2]);
    expect(result).toEqual([1, 3, 3]);
  });

  it("should handle duplicates in exclusion arrays", () => {
    const result = difference([1, 2, 3], [2, 2, 2]);
    expect(result).toEqual([1, 3]);
  });

  it("should work with objects using reference equality", () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const result = difference([obj1, obj2, obj3], [obj2]);
    expect(result).toEqual([obj1, obj3]);
  });

  it("should not exclude objects with same properties but different references", () => {
    const result = difference([{ id: 1 }, { id: 2 }], [{ id: 1 }]);
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("should handle mixed types", () => {
    const result = difference([1, "1", 2, "2"], [1, "2"]);
    expect(result).toEqual(["1", 2]);
  });

  it("should preserve order of elements", () => {
    const result = difference([5, 3, 1, 4, 2], [3, 1]);
    expect(result).toEqual([5, 4, 2]);
  });
});
