import { describe, expect, it } from "vitest";
import { floor } from "./floor";

describe("floor", () => {
  it("should return the same value for integers", () => {
    expect(floor(5)).toBe(5);
    expect(floor(0)).toBe(0);
    expect(floor(-10)).toBe(-10);
    expect(floor(100)).toBe(100);
  });

  it("should round down positive numbers with fractional parts", () => {
    expect(floor(5.1)).toBe(5);
    expect(floor(5.5)).toBe(5);
    expect(floor(5.9)).toBe(5);
    expect(floor(0.9)).toBe(0);
  });

  it("should round down negative numbers with fractional parts", () => {
    expect(floor(-5.1)).toBe(-6);
    expect(floor(-5.5)).toBe(-6);
    expect(floor(-5.9)).toBe(-6);
    expect(floor(-0.1)).toBe(-1);
  });

  it("should handle very small positive fractional parts", () => {
    expect(floor(5.0001)).toBe(5);
    expect(floor(5.9999)).toBe(5);
  });

  it("should handle very small negative fractional parts", () => {
    expect(floor(-5.0001)).toBe(-6);
    expect(floor(-5.9999)).toBe(-6);
  });

  it("should handle zero", () => {
    expect(floor(0)).toBe(0);
    expect(floor(0.0)).toBe(0);
  });

  it("should handle large numbers", () => {
    expect(floor(1000000.9)).toBe(1000000);
    expect(floor(-1000000.9)).toBe(-1000001);
  });

  it("should handle numbers close to integers", () => {
    expect(floor(4.999999)).toBe(4);
    expect(floor(5.000001)).toBe(5);
  });
});
