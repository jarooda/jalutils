import { describe, it, expect } from "vitest";
import { merge } from "./merge";

describe("merge", () => {
  it("should merge two simple objects", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };
    const result = merge<{ a?: number; b?: number; c?: number; d?: number }>(
      obj1,
      obj2,
    );
    expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });

  it("should override properties from later objects", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const result = merge<{ a?: number; b?: number; c?: number }>(obj1, obj2);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it("should deeply merge nested objects", () => {
    const obj1 = { a: { x: 1, y: 2 } };
    const obj2 = { a: { y: 3, z: 4 } };
    const result = merge<{ a?: { x?: number; y?: number; z?: number } }>(
      obj1,
      obj2,
    );
    expect(result).toEqual({ a: { x: 1, y: 3, z: 4 } });
  });

  it("should handle multiple levels of nesting", () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { d: 2 } } };
    const result = merge<{ a?: { b?: { c?: number; d?: number } } }>(
      obj1,
      obj2,
    );
    expect(result).toEqual({ a: { b: { c: 1, d: 2 } } });
  });

  it("should merge more than two objects", () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };
    const result = merge<{ a?: number; b?: number; c?: number }>(
      obj1,
      obj2,
      obj3,
    );
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("should handle empty objects", () => {
    const obj1 = { a: 1 };
    const obj2 = {};
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: 1 });
  });

  it("should handle arrays as values (not deep merge arrays)", () => {
    const obj1 = { arr: [1, 2, 3] };
    const obj2 = { arr: [4, 5] };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ arr: [4, 5] });
  });

  it("should not mutate original objects", () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { b: { d: 3 } };
    merge<{ a?: number; b?: { c?: number; d?: number } }>(obj1, obj2);

    expect(obj1).toEqual({ a: 1, b: { c: 2 } });
    expect(obj2).toEqual({ b: { d: 3 } });
  });

  it("should handle null values", () => {
    const obj1 = { a: 1, b: null };
    const obj2 = { c: 2 };
    const result = merge<{ a?: number; b?: null; c?: number }>(obj1, obj2);
    expect(result).toEqual({ a: 1, b: null, c: 2 });
  });

  it("should handle undefined values", () => {
    const obj1 = { a: 1, b: undefined };
    const obj2 = { c: 2 };
    const result = merge<{ a?: number; b?: undefined; c?: number }>(obj1, obj2);
    expect(result).toEqual({ a: 1, b: undefined, c: 2 });
  });

  it("should handle primitive values replacing objects", () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: "string" };
    const result = merge<{ a?: { b?: number } | string }>(obj1, obj2);
    expect(result).toEqual({ a: "string" });
  });

  it("should handle objects replacing primitive values", () => {
    const obj1 = { a: 5 };
    const obj2 = { a: { b: 1 } };
    const result = merge<{ a?: number | { b?: number } }>(obj1, obj2);
    expect(result).toEqual({ a: { b: 1 } });
  });

  it("should handle boolean values", () => {
    const obj1 = { a: true };
    const obj2 = { b: false };
    const result = merge<{ a?: boolean; b?: boolean }>(obj1, obj2);
    expect(result).toEqual({ a: true, b: false });
  });

  it("should handle number values including zero", () => {
    const obj1 = { a: 0, b: 1 };
    const obj2 = { c: 2 };
    const result = merge<{ a?: number; b?: number; c?: number }>(obj1, obj2);
    expect(result).toEqual({ a: 0, b: 1, c: 2 });
  });

  it("should handle empty string values", () => {
    const obj1 = { a: "", b: "text" };
    const obj2 = { c: "more" };
    const result = merge<{ a?: string; b?: string; c?: string }>(obj1, obj2);
    expect(result).toEqual({ a: "", b: "text", c: "more" });
  });

  it("should work with no arguments", () => {
    const result = merge();
    expect(result).toEqual({});
  });

  it("should work with a single object", () => {
    const obj = { a: 1, b: 2 };
    const result = merge(obj);
    expect(result).toEqual({ a: 1, b: 2 });
    expect(result).not.toBe(obj); // Should be a clone
  });

  it("should handle complex nested structures", () => {
    type User = {
      user?: {
        name?: string;
        age?: number;
        settings?: {
          theme?: string;
          notifications?: boolean;
        };
      };
    };
    const obj1: User = {
      user: {
        name: "John",
        settings: {
          theme: "dark",
          notifications: true,
        },
      },
    };
    const obj2: User = {
      user: {
        age: 30,
        settings: {
          theme: "light",
        },
      },
    };
    const result = merge<User>(obj1, obj2);
    expect(result).toEqual({
      user: {
        name: "John",
        age: 30,
        settings: {
          theme: "light",
          notifications: true,
        },
      },
    });
  });

  it("should handle Date objects", () => {
    const date = new Date("2023-01-01");
    const obj1 = { a: 1 };
    const obj2 = { date };
    const result = merge<{ a?: number; date?: Date }>(obj1, obj2);
    expect(result.date).toEqual(date);
    expect(result.date).not.toBe(date); // Should be cloned
  });
});
