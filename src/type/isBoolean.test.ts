import { describe, it, expect } from "vitest";
import { isBoolean } from "./isBoolean";

describe("isBoolean", () => {
  it("should return true for boolean true", () => {
    expect(isBoolean(true)).toBe(true);
  });

  it("should return true for boolean false", () => {
    expect(isBoolean(false)).toBe(true);
  });

  it("should return false for non-boolean values", () => {
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean("true")).toBe(false);
    expect(isBoolean("false")).toBe(false);
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean({})).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean(() => {})).toBe(false);
  });
});
