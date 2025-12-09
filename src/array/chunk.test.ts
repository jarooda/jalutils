import { describe, it, expect } from "vitest";
import { chunk } from "./chunk";

describe("chunk", () => {
  it("should split array into chunks of specified size", () => {
    const result = chunk([1, 2, 3, 4, 5, 6], 2);
    expect(result).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it("should handle arrays that do not divide evenly", () => {
    const result = chunk([1, 2, 3, 4, 5], 2);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("should handle chunk size of 1", () => {
    const result = chunk([1, 2, 3], 1);
    expect(result).toEqual([[1], [2], [3]]);
  });

  it("should handle chunk size equal to array length", () => {
    const result = chunk([1, 2, 3], 3);
    expect(result).toEqual([[1, 2, 3]]);
  });

  it("should handle chunk size greater than array length", () => {
    const result = chunk([1, 2, 3], 5);
    expect(result).toEqual([[1, 2, 3]]);
  });

  it("should handle empty array", () => {
    const result = chunk([], 2);
    expect(result).toEqual([]);
  });

  it("should throw error for chunk size of 0", () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow(
      "Chunk size must be greater than 0",
    );
  });

  it("should throw error for negative chunk size", () => {
    expect(() => chunk([1, 2, 3], -1)).toThrow(
      "Chunk size must be greater than 0",
    );
  });

  it("should work with strings", () => {
    const result = chunk(["a", "b", "c", "d", "e"], 2);
    expect(result).toEqual([["a", "b"], ["c", "d"], ["e"]]);
  });

  it("should work with objects", () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const result = chunk([obj1, obj2, obj3], 2);
    expect(result).toEqual([[obj1, obj2], [obj3]]);
  });

  it("should work with large chunk size", () => {
    const result = chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });

  it("should handle single element array", () => {
    const result = chunk([1], 2);
    expect(result).toEqual([[1]]);
  });

  it("should work with mixed types", () => {
    const result = chunk([1, "a", true, null, undefined], 2);
    expect(result).toEqual([[1, "a"], [true, null], [undefined]]);
  });

  it("should not mutate original array", () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];
    chunk(original, 2);
    expect(original).toEqual(copy);
  });
});
