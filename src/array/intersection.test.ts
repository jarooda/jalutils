import { describe, expect, it } from "vitest";
import { intersection } from "./intersection";

describe("intersection", () => {
  it("should return an empty array for no input arrays", () => {
    expect(intersection()).toEqual([]);
  });

  it("should return the same array for a single input array", () => {
    const arr = [1, 2, 3];
    expect(intersection(arr)).toEqual(arr);
  });

  it("should return the intersection of multiple arrays", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4];
    const arr3 = [3, 4, 5];
    expect(intersection(arr1, arr2, arr3)).toEqual([3]);
  });

  it("should handle arrays with no common elements", () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    expect(intersection(arr1, arr2)).toEqual([]);
  });

  it("should handle arrays with duplicate elements", () => {
    const arr1 = [1, 2, 2];
    const arr2 = [2, 3, 4];
    expect(intersection(arr1, arr2)).toEqual([2]);
  });

  it("should handle empty arrays", () => {
    const arr1: unknown[] = [];
    const arr2 = [1, 2];
    expect(intersection(arr1, arr2)).toEqual([]);
    expect(intersection(arr1)).toEqual([]);
  });
});
