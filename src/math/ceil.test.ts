import { describe, expect, it } from "vitest";
import { ceil } from "./ceil";

describe("ceil", () => {
  it("should return the same value for integers", () => {
    expect(ceil(5)).toBe(5);
    expect(ceil(0)).toBe(0);
    expect(ceil(-10)).toBe(-10);
    expect(ceil(100)).toBe(100);
  });

  it("should round up positive numbers with fractional parts", () => {
    expect(ceil(5.1)).toBe(6);
    expect(ceil(5.5)).toBe(6);
    expect(ceil(5.9)).toBe(6);
    expect(ceil(0.1)).toBe(1);
  });

  it("should round up negative numbers with fractional parts", () => {
    expect(ceil(-5.1)).toBe(-5);
    expect(ceil(-5.5)).toBe(-5);
    expect(ceil(-5.9)).toBe(-5);
    expect(ceil(-0.1)).toBe(0);
  });

  it("should handle very small positive fractional parts", () => {
    expect(ceil(5.0001)).toBe(6);
    expect(ceil(5.9999)).toBe(6);
  });

  it("should handle very small negative fractional parts", () => {
    expect(ceil(-5.0001)).toBe(-5);
    expect(ceil(-5.9999)).toBe(-5);
  });

  it("should handle zero", () => {
    expect(ceil(0)).toBe(0);
    expect(ceil(0.0)).toBe(0);
  });

  it("should handle large numbers", () => {
    expect(ceil(1000000.1)).toBe(1000001);
    expect(ceil(-1000000.1)).toBe(-1000000);
  });

  it("should handle numbers close to integers", () => {
    expect(ceil(4.999999)).toBe(5);
    expect(ceil(5.000001)).toBe(6);
  });
});
