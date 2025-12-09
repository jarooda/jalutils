import { describe, expect, it } from "vitest";
import { percentile } from "./percentile";

describe("percentile", () => {
  it("should return 0 for empty array", () => {
    expect(percentile([], 50)).toBe(0);
  });

  it("should throw error for percentile less than 0", () => {
    expect(() => percentile([1, 2, 3], -1)).toThrow(
      "Percentile must be between 0 and 100",
    );
  });

  it("should throw error for percentile greater than 100", () => {
    expect(() => percentile([1, 2, 3], 101)).toThrow(
      "Percentile must be between 0 and 100",
    );
  });

  it("should calculate 0th percentile (minimum)", () => {
    expect(percentile([1, 2, 3, 4, 5], 0)).toBe(1);
    expect(percentile([10, 20, 30], 0)).toBe(10);
  });

  it("should calculate 100th percentile (maximum)", () => {
    expect(percentile([1, 2, 3, 4, 5], 100)).toBe(5);
    expect(percentile([10, 20, 30], 100)).toBe(30);
  });

  it("should calculate 50th percentile (median)", () => {
    expect(percentile([1, 2, 3, 4, 5], 50)).toBe(3);
    expect(percentile([1, 2, 3, 4], 50)).toBe(2.5);
  });

  it("should calculate 25th percentile", () => {
    expect(percentile([1, 2, 3, 4, 5], 25)).toBe(2);
    expect(percentile([10, 20, 30, 40], 25)).toBe(17.5);
  });

  it("should calculate 75th percentile", () => {
    expect(percentile([1, 2, 3, 4, 5], 75)).toBe(4);
    expect(percentile([10, 20, 30, 40], 75)).toBe(32.5);
  });

  it("should handle unsorted arrays", () => {
    expect(percentile([5, 1, 3, 2, 4], 50)).toBe(3);
    expect(percentile([40, 10, 30, 20], 50)).toBe(25);
  });

  it("should handle single value", () => {
    expect(percentile([5], 0)).toBe(5);
    expect(percentile([5], 50)).toBe(5);
    expect(percentile([5], 100)).toBe(5);
  });

  it("should handle negative numbers", () => {
    expect(percentile([-5, -3, -1, 1, 3, 5], 50)).toBe(0);
    expect(percentile([-10, -5, 0, 5, 10], 25)).toBe(-5);
  });

  it("should interpolate between values", () => {
    const result = percentile([1, 2, 3, 4, 5], 30);
    expect(result).toBeCloseTo(2.2, 10);
  });

  it("should handle decimal numbers", () => {
    expect(percentile([1.5, 2.5, 3.5, 4.5, 5.5], 50)).toBe(3.5);
  });

  it("should handle duplicate values", () => {
    expect(percentile([5, 5, 5, 5, 5], 50)).toBe(5);
    expect(percentile([1, 2, 2, 3], 50)).toBe(2);
  });

  it("should handle two values", () => {
    expect(percentile([10, 20], 50)).toBe(15);
    expect(percentile([10, 20], 25)).toBe(12.5);
  });
});
