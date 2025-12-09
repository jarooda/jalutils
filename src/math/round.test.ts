import { describe, expect, it } from "vitest";
import { round } from "./round";

describe("round", () => {
  it("should return the same value for integers", () => {
    expect(round(5)).toBe(5);
    expect(round(0)).toBe(0);
    expect(round(-10)).toBe(-10);
    expect(round(100)).toBe(100);
  });

  it("should round up when fractional part is >= 0.5", () => {
    expect(round(5.5)).toBe(6);
    expect(round(5.6)).toBe(6);
    expect(round(5.9)).toBe(6);
    expect(round(0.5)).toBe(1);
  });

  it("should round down when fractional part is < 0.5", () => {
    expect(round(5.4)).toBe(5);
    expect(round(5.3)).toBe(5);
    expect(round(5.1)).toBe(5);
    expect(round(0.4)).toBe(0);
  });

  it("should round negative numbers away from zero", () => {
    expect(round(-5.5)).toBe(-6);
    expect(round(-5.6)).toBe(-6);
    expect(round(-5.9)).toBe(-6);
  });

  it("should handle negative numbers with fractional part < 0.5", () => {
    expect(round(-5.4)).toBe(-6);
    expect(round(-5.3)).toBe(-6);
    expect(round(-5.1)).toBe(-6);
  });

  it("should handle edge case 0.5", () => {
    expect(round(0.5)).toBe(1);
    expect(round(1.5)).toBe(2);
    expect(round(2.5)).toBe(3);
  });

  it("should handle negative edge cases with 0.5", () => {
    expect(round(-0.5)).toBe(-1);
    expect(round(-1.5)).toBe(-2);
    expect(round(-2.5)).toBe(-3);
  });

  it("should handle very small fractional parts", () => {
    expect(round(5.0001)).toBe(5);
    expect(round(5.4999)).toBe(5);
  });

  it("should handle very large numbers", () => {
    expect(round(1000000.6)).toBe(1000001);
    expect(round(1000000.4)).toBe(1000000);
  });

  it("should handle zero", () => {
    expect(round(0)).toBe(0);
    expect(round(0.0)).toBe(0);
  });
});
