import { describe, expect, it } from "vitest";
import { random } from "./random";

describe("random", () => {
  it("should return a number within the default range [0, 999]", () => {
    const result = random();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(999);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("should return a number within the specified range", () => {
    const min = 10;
    const max = 20;
    const result = random(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("should swap min and max if max < min", () => {
    const result = random(100, 50);
    expect(result).toBeGreaterThanOrEqual(50);
    expect(result).toBeLessThanOrEqual(100);
  });

  it("should handle when min equals max", () => {
    const value = 42;
    const result = random(value, value);
    expect(result).toBe(value);
  });

  it("should handle negative numbers", () => {
    const result = random(-50, -10);
    expect(result).toBeGreaterThanOrEqual(-50);
    expect(result).toBeLessThanOrEqual(-10);
  });

  it("should handle negative to positive range", () => {
    const result = random(-10, 10);
    expect(result).toBeGreaterThanOrEqual(-10);
    expect(result).toBeLessThanOrEqual(10);
  });

  it("should cap the range if it exceeds 1 billion", () => {
    const min = 0;
    const max = 2_000_000_000;
    const result = random(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(min + 1_000_000_000);
  });

  it("should return an integer value", () => {
    for (let i = 0; i < 100; i++) {
      const result = random(0, 1000);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it("should produce varied results over multiple calls", () => {
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(random(0, 1000));
    }
    // With 100 calls in range 0-1000, we should get at least some variety
    expect(results.size).toBeGreaterThan(50);
  });

  it("should handle very small ranges", () => {
    const result = random(5, 6);
    expect([5, 6]).toContain(result);
  });

  it("should work with only min parameter (max defaults to 999)", () => {
    const min = 100;
    const result = random(min);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(999);
  });
});
