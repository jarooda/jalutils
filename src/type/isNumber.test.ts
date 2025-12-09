import { describe, it, expect } from "vitest";
import { isNumber } from "./isNumber";

describe("isNumber", () => {
  it("should return true for integers", () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(42)).toBe(true);
    expect(isNumber(-10)).toBe(true);
  });

  it("should return true for floating point numbers", () => {
    expect(isNumber(3.14)).toBe(true);
    expect(isNumber(-0.5)).toBe(true);
  });

  it("should return true for NaN", () => {
    expect(isNumber(NaN)).toBe(true);
  });

  it("should return true for Infinity", () => {
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(-Infinity)).toBe(true);
  });

  it("should return false for numeric strings", () => {
    expect(isNumber("123")).toBe(false);
    expect(isNumber("3.14")).toBe(false);
  });

  it("should return false for non-number values", () => {
    expect(isNumber(true)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber(() => {})).toBe(false);
  });
});
