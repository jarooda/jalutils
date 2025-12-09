import { describe, it, expect } from "vitest";
import { defaults } from "./defaults";

describe("defaults", () => {
  it("should fill in undefined properties with default values", () => {
    const obj = { a: 1 };
    const defaultValues = { a: 100, b: 2, c: 3 };
    const result = defaults(obj, defaultValues);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("should not override existing properties", () => {
    const obj = { name: "John", age: 30 };
    const defaultValues = { name: "Default", age: 0, city: "NYC" };
    const result = defaults(obj, defaultValues);
    expect(result).toEqual({ name: "John", age: 30, city: "NYC" });
  });

  it("should handle empty object", () => {
    const obj = {};
    const defaultValues = { a: 1, b: 2, c: 3 };
    const result = defaults(obj, defaultValues);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("should handle empty defaults", () => {
    const obj = { a: 1, b: 2 };
    const defaultValues = {};
    const result = defaults(obj, defaultValues);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("should treat undefined as missing but not null", () => {
    const obj: Partial<{ a: number; b: number | null; c: number }> = {
      a: undefined,
      b: null,
      c: 0,
    };
    const defaultValues = { a: 1, b: 2, c: 3 };
    const result = defaults(obj, defaultValues);
    expect(result).toEqual({ a: 1, b: null, c: 0 });
  });

  it("should handle nested objects", () => {
    const obj = { user: { name: "John" } };
    const defaultValues = { user: { name: "Default", age: 30 }, active: true };
    const result = defaults(obj, defaultValues);
    expect(result).toEqual({ user: { name: "John" }, active: true });
  });

  it("should not mutate the original object", () => {
    const original = { a: 1, nested: { value: "original" } };
    const defaultValues = { b: 2, nested: { value: "default", extra: "data" } };
    const result = defaults(original, defaultValues);

    // Modify the result
    result.a = 999;
    if (typeof result.nested === "object" && result.nested !== null) {
      (result.nested as Record<string, unknown>).value = "changed";
    }

    // Original should remain unchanged
    expect(original.a).toBe(1);
    expect(original.nested.value).toBe("original");
  });

  it("should not mutate the default values object", () => {
    const obj: Partial<{ a: number; b: { nested: string }; c: number[] }> = {
      a: 1,
    };
    const defaultValues = { b: { nested: "value" }, c: [1, 2, 3] };
    const result = defaults(obj, defaultValues);

    // Modify the result
    if (typeof result.b === "object" && result.b !== null) {
      (result.b as Record<string, unknown>).nested = "changed";
    }
    if (Array.isArray(result.c)) {
      result.c.push(4);
    }

    // Default values should remain unchanged
    expect(defaultValues.b).toEqual({ nested: "value" });
    expect(defaultValues.c).toEqual([1, 2, 3]);
  });

  it("should handle boolean false values correctly", () => {
    const obj = { enabled: false };
    const defaultValues = { enabled: true, active: true };
    const result = defaults(obj, defaultValues);
    expect(result).toEqual({ enabled: false, active: true });
  });

  it("should handle zero values correctly", () => {
    const obj = { count: 0 };
    const defaultValues = { count: 10, total: 100 };
    const result = defaults(obj, defaultValues);
    expect(result).toEqual({ count: 0, total: 100 });
  });

  it("should handle empty string values correctly", () => {
    const obj = { name: "" };
    const defaultValues = { name: "Default", title: "Mr." };
    const result = defaults(obj, defaultValues);
    expect(result).toEqual({ name: "", title: "Mr." });
  });

  it("should work with arrays as values", () => {
    const obj = { tags: ["tag1"] };
    const defaultValues = { tags: ["default"], items: [1, 2, 3] };
    const result = defaults(obj, defaultValues);
    expect(result).toEqual({ tags: ["tag1"], items: [1, 2, 3] });
  });
});
