import { describe, it, expect, vi } from "vitest";
import { shuffle } from "./shuffle";

describe("shuffle", () => {
  it("should return an array with the same length", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result).toHaveLength(input.length);
  });

  it("should contain all original elements", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result.sort()).toEqual(input.sort());
  });

  it("should not mutate the original array", () => {
    const input = [1, 2, 3, 4, 5];
    const copy = [...input];
    shuffle(input);
    expect(input).toEqual(copy);
  });

  it("should handle empty array", () => {
    const result = shuffle([]);
    expect(result).toEqual([]);
  });

  it("should handle single element array", () => {
    const result = shuffle([1]);
    expect(result).toEqual([1]);
  });

  it("should handle two element array", () => {
    const input = [1, 2];
    const result = shuffle(input);
    expect(result).toHaveLength(2);
    expect(result.sort()).toEqual([1, 2]);
  });

  it("should work with strings", () => {
    const input = ["a", "b", "c", "d"];
    const result = shuffle(input);
    expect(result).toHaveLength(4);
    expect(result.sort()).toEqual(["a", "b", "c", "d"]);
  });

  it("should work with objects", () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const input = [obj1, obj2, obj3];
    const result = shuffle(input);
    expect(result).toHaveLength(3);
    expect(result).toContain(obj1);
    expect(result).toContain(obj2);
    expect(result).toContain(obj3);
  });

  it("should work with mixed types", () => {
    const input = [1, "a", true, null, undefined];
    const result = shuffle(input);
    expect(result).toHaveLength(5);
    expect(result).toContain(1);
    expect(result).toContain("a");
    expect(result).toContain(true);
    expect(result).toContain(null);
    expect(result).toContain(undefined);
  });

  it("should handle arrays with duplicate values", () => {
    const input = [1, 1, 2, 2, 3];
    const result = shuffle(input);
    expect(result).toHaveLength(5);
    expect(result.sort()).toEqual([1, 1, 2, 2, 3]);
  });

  it("should produce different results on multiple calls (probabilistic)", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = new Set();

    // Run shuffle multiple times and check if we get different results
    for (let i = 0; i < 10; i++) {
      results.add(shuffle(input).join(","));
    }

    // With 10 elements, it's extremely unlikely to get the same result 10 times
    expect(results.size).toBeGreaterThan(1);
  });

  it("should use Fisher-Yates algorithm correctly with mocked random", () => {
    const mockRandom = vi.spyOn(Math, "random");

    // Mock Math.random to return predictable values
    // For i = 2: j = Math.floor(0 * 3) = 0, swap positions 2 and 0: [3, 2, 1]
    // For i = 1: j = Math.floor(0 * 2) = 0, swap positions 1 and 0: [2, 3, 1]
    mockRandom.mockReturnValueOnce(0);
    mockRandom.mockReturnValueOnce(0);

    const result = shuffle([1, 2, 3]);

    expect(result).toEqual([2, 3, 1]);

    mockRandom.mockRestore();
  });

  it("should maintain all elements even with large arrays", () => {
    const input = Array.from({ length: 100 }, (_, i) => i);
    const result = shuffle(input);
    expect(result).toHaveLength(100);
    expect(result.sort((a, b) => a - b)).toEqual(input);
  });
});
