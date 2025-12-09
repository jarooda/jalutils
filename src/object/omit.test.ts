import { describe, it, expect } from "vitest";
import { omit } from "./omit";

describe("omit", () => {
  it("should omit specified properties from an object", () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = omit(obj, ["b", "d"]);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it("should return full object when omitting empty keys array", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, []);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("should handle omitting single property", () => {
    const obj = { name: "John", age: 30, city: "NYC" };
    const result = omit(obj, ["age"]);
    expect(result).toEqual({ name: "John", city: "NYC" });
  });

  it("should handle omitting all properties", () => {
    const obj = { x: 10, y: 20 };
    const result = omit(obj, ["x", "y"]);
    expect(result).toEqual({});
  });

  it("should work with different value types", () => {
    const obj = {
      str: "hello",
      num: 42,
      bool: true,
      arr: [1, 2, 3],
      obj: { nested: "value" },
    };
    const result = omit(obj, ["num", "arr"]);
    expect(result).toEqual({
      str: "hello",
      bool: true,
      obj: { nested: "value" },
    });
  });

  it("should handle objects with undefined values", () => {
    const obj = { a: 1, b: undefined, c: 3 };
    const result = omit(obj, ["b"]);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it("should handle objects with null values", () => {
    const obj = { a: null, b: 2, c: 3 };
    const result = omit(obj, ["a"]);
    expect(result).toEqual({ b: 2, c: 3 });
  });

  it("should not mutate the original object", () => {
    const original = { a: 1, b: { nested: "value" }, c: [1, 2, 3], d: 4 };
    const result = omit(original, ["d"]);

    // Modify the result
    result.b.nested = "changed";
    result.c.push(4);

    // Original should remain unchanged
    expect(original.b.nested).toBe("value");
    expect(original.c).toEqual([1, 2, 3]);
  });

  it("should deep clone nested objects", () => {
    const original = {
      id: 1,
      data: {
        user: { name: "John", age: 30 },
        tags: ["tag1", "tag2"],
      },
      extra: "removed",
    };
    const result = omit(original, ["extra"]);

    // Modify nested properties
    result.data.user.name = "Jane";
    result.data.tags[0] = "modified";

    // Original should remain unchanged
    expect(original.data.user.name).toBe("John");
    expect(original.data.tags[0]).toBe("tag1");
  });

  it("should not have omitted keys in result", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ["b"]);
    expect("a" in result).toBe(true);
    expect("b" in result).toBe(false);
    expect("c" in result).toBe(true);
  });
});
