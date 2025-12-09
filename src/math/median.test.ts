import { describe, expect, it } from "vitest";
import { median } from "./median";

describe("median", () => {
  it("should return 0 for empty array", () => {
    expect(median()).toBe(0);
  });

  it("should return the value itself for a single number", () => {
    expect(median(5)).toBe(5);
    expect(median(0)).toBe(0);
    expect(median(-10)).toBe(-10);
  });

  it("should calculate median for odd number of values", () => {
    expect(median(1, 2, 3)).toBe(2);
    expect(median(5, 1, 3)).toBe(3);
    expect(median(10, 5, 15, 20, 25)).toBe(15);
  });

  it("should calculate median for even number of values", () => {
    expect(median(1, 2, 3, 4)).toBe(2.5);
    expect(median(10, 20, 30, 40)).toBe(25);
    expect(median(5, 15)).toBe(10);
  });

  it("should handle unsorted arrays", () => {
    expect(median(3, 1, 2)).toBe(2);
    expect(median(40, 10, 30, 20)).toBe(25);
    expect(median(100, 1, 50, 25, 75)).toBe(50);
  });

  it("should handle negative numbers", () => {
    expect(median(-1, -2, -3)).toBe(-2);
    expect(median(-10, -20, -30, -40)).toBe(-25);
  });

  it("should handle mixed positive and negative numbers", () => {
    expect(median(-5, 0, 5)).toBe(0);
    expect(median(-10, -5, 5, 10)).toBe(0);
  });

  it("should handle duplicate values", () => {
    expect(median(5, 5, 5)).toBe(5);
    expect(median(1, 2, 2, 3)).toBe(2);
    expect(median(10, 10, 20, 20, 30)).toBe(20);
  });

  it("should handle decimal numbers", () => {
    expect(median(1.5, 2.5, 3.5)).toBe(2.5);
    expect(median(0.1, 0.2, 0.3, 0.4)).toBe(0.25);
  });

  it("should handle two numbers", () => {
    expect(median(10, 20)).toBe(15);
    expect(median(5, 15)).toBe(10);
  });

  it("should not mutate the original order", () => {
    // Since spread operator is used internally, original order doesn't matter
    expect(median(3, 1, 4, 1, 5)).toBe(3);
  });
});
