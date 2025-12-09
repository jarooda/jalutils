import { describe, expect, it } from "vitest";
import { average } from "./average";

describe("average", () => {
  it("should return 0 for empty array", () => {
    expect(average()).toBe(0);
  });

  it("should return the value itself for a single number", () => {
    expect(average(5)).toBe(5);
    expect(average(0)).toBe(0);
    expect(average(-10)).toBe(-10);
  });

  it("should calculate average of multiple positive numbers", () => {
    expect(average(1, 2, 3, 4, 5)).toBe(3);
    expect(average(10, 20, 30)).toBe(20);
    expect(average(2, 4, 6, 8)).toBe(5);
  });

  it("should calculate average of negative numbers", () => {
    expect(average(-1, -2, -3, -4, -5)).toBe(-3);
    expect(average(-10, -20, -30)).toBe(-20);
  });

  it("should calculate average of mixed positive and negative numbers", () => {
    expect(average(-5, 5)).toBe(0);
    expect(average(-10, 0, 10)).toBe(0);
    expect(average(-2, 4, 6)).toBeCloseTo(2.67, 1);
  });

  it("should handle decimal numbers", () => {
    expect(average(1.5, 2.5, 3.5)).toBe(2.5);
    expect(average(0.1, 0.2, 0.3)).toBeCloseTo(0.2, 10);
  });

  it("should handle large numbers", () => {
    expect(average(1000000, 2000000, 3000000)).toBe(2000000);
  });

  it("should handle very small numbers", () => {
    expect(average(0.001, 0.002, 0.003)).toBeCloseTo(0.002, 10);
  });

  it("should calculate average correctly for two numbers", () => {
    expect(average(10, 20)).toBe(15);
    expect(average(5, 15)).toBe(10);
  });

  it("should handle zeros in the array", () => {
    expect(average(0, 0, 0)).toBe(0);
    expect(average(0, 5, 10)).toBe(5);
  });
});
