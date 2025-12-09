import { describe, it, expect } from "vitest";
import { keys } from "./keys";

describe("keys", () => {
  it("should return keys of a flat object", () => {
    const obj = { name: "John", age: 25, city: "New York" };
    const result = keys(obj);

    expect(result).toEqual(["name", "age", "city"]);
  });

  it("should return keys of nested objects", () => {
    const obj = {
      name: "John",
      address: { city: "New York", zip: "10001" },
    };
    const result = keys(obj);

    expect(result).toEqual(["name", "address"]);
  });

  it("should return empty array for empty objects", () => {
    const obj = {};
    const result = keys(obj);

    expect(result).toEqual([]);
  });

  it("should handle objects with string keys", () => {
    const obj = { firstName: "John", lastName: "Doe" };
    const result = keys(obj);

    expect(result).toEqual(["firstName", "lastName"]);
    expect(typeof result[0]).toBe("string");
  });

  it("should handle objects with various value types", () => {
    const obj = {
      string: "text",
      number: 42,
      boolean: true,
      null: null,
      undefined: undefined,
      array: [1, 2, 3],
      object: { nested: "value" },
    };
    const result = keys(obj);

    expect(result).toEqual([
      "string",
      "number",
      "boolean",
      "null",
      "undefined",
      "array",
      "object",
    ]);
  });

  it("should return cloned keys", () => {
    const obj = { key1: "value1", key2: "value2" };
    const result = keys(obj);

    expect(result).toEqual(["key1", "key2"]);
    expect(result).not.toBe(Object.keys(obj));
  });

  it("should handle objects with numeric-like string keys", () => {
    const obj = { "0": "zero", "1": "one", "2": "two" };
    const result = keys(obj);

    expect(result).toEqual(["0", "1", "2"]);
  });

  it("should handle single property objects", () => {
    const obj = { onlyKey: "onlyValue" };
    const result = keys(obj);

    expect(result).toEqual(["onlyKey"]);
    expect(result.length).toBe(1);
  });

  it("should handle objects with special characters in keys", () => {
    const obj = {
      "key-with-dash": 1,
      key_with_underscore: 2,
      "key.with.dot": 3,
    };
    const result = keys(obj);

    expect(result).toEqual([
      "key-with-dash",
      "key_with_underscore",
      "key.with.dot",
    ]);
  });

  it("should return array type", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = keys(obj);

    expect(Array.isArray(result)).toBe(true);
  });

  it("should handle objects with Date values", () => {
    const obj = { createdAt: new Date(), updatedAt: new Date() };
    const result = keys(obj);

    expect(result).toEqual(["createdAt", "updatedAt"]);
  });

  it("should handle objects with function values", () => {
    const obj = {
      method1: () => "test",
      method2: function () {
        return "test2";
      },
    };
    const result = keys(obj);

    expect(result).toEqual(["method1", "method2"]);
  });
});
