import { describe, it, expect } from "vitest";
import { isUndefined } from "./isUndefined";

describe("isUndefined", () => {
  it("should return true for undefined", () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  it("should return false for null", () => {
    expect(isUndefined(null)).toBe(false);
  });

  it("should return false for non-undefined values", () => {
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined("")).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined(() => {})).toBe(false);
  });
});
