import { describe, it, expect } from "vitest";
import { pick } from "./pick";

describe("pick", () => {
  it("should pick specified properties from an object", () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = pick(obj, ["a", "c"]);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it("should return empty object when picking from empty keys array", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, []);
    expect(result).toEqual({});
  });

  it("should handle picking single property", () => {
    const obj = { name: "John", age: 30, city: "NYC" };
    const result = pick(obj, ["name"]);
    expect(result).toEqual({ name: "John" });
  });

  it("should handle picking all properties", () => {
    const obj = { x: 10, y: 20 };
    const result = pick(obj, ["x", "y"]);
    expect(result).toEqual({ x: 10, y: 20 });
  });

  it("should work with different value types", () => {
    const obj = {
      str: "hello",
      num: 42,
      bool: true,
      arr: [1, 2, 3],
      obj: { nested: "value" },
    };
    const result = pick(obj, ["str", "bool", "obj"]);
    expect(result).toEqual({
      str: "hello",
      bool: true,
      obj: { nested: "value" },
    });
  });

  it("should not include properties not in the original object", () => {
    const obj = { a: 1, b: 2 };
    const result = pick(obj, ["a", "b"]);
    expect(result).toEqual({ a: 1, b: 2 });
    expect("c" in result).toBe(false);
  });

  it("should handle objects with undefined values", () => {
    const obj = { a: 1, b: undefined, c: 3 };
    const result = pick(obj, ["a", "b"]);
    expect(result).toEqual({ a: 1, b: undefined });
  });

  it("should handle objects with null values", () => {
    const obj = { a: null, b: 2, c: 3 };
    const result = pick(obj, ["a", "c"]);
    expect(result).toEqual({ a: null, c: 3 });
  });

  it("should not mutate the original object", () => {
    const original = { a: 1, b: { nested: "value" }, c: [1, 2, 3] };
    const result = pick(original, ["b", "c"]);

    // Modify the result
    result.b.nested = "changed";
    result.c.push(4);

    // Original should remain unchanged
    expect(original.b.nested).toBe("value");
    expect(original.c).toEqual([1, 2, 3]);
  });

  it("should deep clone nested objects", () => {
    const original = {
      data: {
        user: { name: "John", age: 30 },
        tags: ["tag1", "tag2"],
      },
    };
    const result = pick(original, ["data"]);

    // Modify nested properties
    result.data.user.name = "Jane";
    result.data.tags[0] = "modified";

    // Original should remain unchanged
    expect(original.data.user.name).toBe("John");
    expect(original.data.tags[0]).toBe("tag1");
  });
});
