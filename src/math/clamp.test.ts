import { describe, expect, it } from "vitest";
import { clamp } from "./clamp";

describe("clamp", () => {
  it("should return the value when it is within the range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(0, -10, 10)).toBe(0);
    expect(clamp(-5, -10, 10)).toBe(-5);
  });

  it("should return min when value is below the minimum", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(-100, -50, 50)).toBe(-50);
    expect(clamp(0, 5, 10)).toBe(5);
  });

  it("should return max when value is above the maximum", () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(100, -50, 50)).toBe(50);
    expect(clamp(20, 5, 10)).toBe(10);
  });

  it("should handle when value equals min", () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(-10, -10, 10)).toBe(-10);
  });

  it("should handle when value equals max", () => {
    expect(clamp(10, 0, 10)).toBe(10);
    expect(clamp(100, 0, 100)).toBe(100);
  });

  it("should handle when min equals max", () => {
    expect(clamp(5, 10, 10)).toBe(10);
    expect(clamp(10, 10, 10)).toBe(10);
    expect(clamp(15, 10, 10)).toBe(10);
  });

  it("should handle negative ranges", () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
    expect(clamp(-15, -10, -1)).toBe(-10);
    expect(clamp(0, -10, -1)).toBe(-1);
  });

  it("should handle decimal values", () => {
    expect(clamp(5.5, 0, 10)).toBe(5.5);
    expect(clamp(10.5, 0, 10)).toBe(10);
    expect(clamp(-0.5, 0, 10)).toBe(0);
  });

  it("should handle very large numbers", () => {
    expect(clamp(1e10, 0, 1e9)).toBe(1e9);
    expect(clamp(500, 0, 1e9)).toBe(500);
  });

  it("should handle very small numbers", () => {
    expect(clamp(0.001, 0.01, 1)).toBe(0.01);
    expect(clamp(0.5, 0.01, 1)).toBe(0.5);
    expect(clamp(1.5, 0.01, 1)).toBe(1);
  });
});
