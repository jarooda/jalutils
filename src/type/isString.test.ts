import { describe, it, expect } from "vitest";
import { isString } from "./isString";

describe("isString", () => {
  it("should return true for string literals", () => {
    expect(isString("")).toBe(true);
    expect(isString("hello")).toBe(true);
    expect(isString("123")).toBe(true);
  });

  it("should return true for template literals", () => {
    expect(isString(`template string`)).toBe(true);
    expect(isString(`${1 + 2}`)).toBe(true);
  });

  it("should return false for String objects", () => {
    expect(isString(new String("hello"))).toBe(false);
  });

  it("should return false for non-string values", () => {
    expect(isString(123)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(() => {})).toBe(false);
  });
});
