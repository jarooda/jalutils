import { describe, it, expect } from "vitest";
import { entries } from "./entries";

describe("entries", () => {
  it("should return entries of a flat object", () => {
    const obj = { name: "John", age: 25 };
    const result = entries(obj);

    expect(result).toEqual([
      ["name", "John"],
      ["age", 25],
    ]);
  });

  it("should return entries with nested objects", () => {
    const obj = {
      name: "John",
      address: { city: "New York", zip: "10001" },
    };
    const result = entries(obj);

    expect(result).toEqual([
      ["name", "John"],
      ["address", { city: "New York", zip: "10001" }],
    ]);
  });

  it("should handle empty objects", () => {
    const obj = {};
    const result = entries(obj);

    expect(result).toEqual([]);
  });

  it("should clone values to prevent mutation", () => {
    const original = { items: [1, 2, 3] };
    const result = entries(original);

    result[0][1].push(4);

    expect(original.items).toEqual([1, 2, 3]);
  });

  it("should handle objects with null values", () => {
    const obj = { name: "John", middleName: null };
    const result = entries(obj);

    expect(result).toEqual([
      ["name", "John"],
      ["middleName", null],
    ]);
  });

  it("should handle objects with undefined values", () => {
    const obj = { name: "John", middleName: undefined };
    const result = entries(obj);

    expect(result).toEqual([
      ["name", "John"],
      ["middleName", undefined],
    ]);
  });

  it("should handle objects with boolean values", () => {
    const obj = { isActive: true, isVerified: false };
    const result = entries(obj);

    expect(result).toEqual([
      ["isActive", true],
      ["isVerified", false],
    ]);
  });

  it("should handle objects with number values", () => {
    const obj = { count: 42, price: 19.99 };
    const result = entries(obj);

    expect(result).toEqual([
      ["count", 42],
      ["price", 19.99],
    ]);
  });

  it("should handle objects with array values", () => {
    const obj = { hobbies: ["reading", "coding"], scores: [95, 87, 92] };
    const result = entries(obj);

    expect(result).toEqual([
      ["hobbies", ["reading", "coding"]],
      ["scores", [95, 87, 92]],
    ]);
  });

  it("should handle objects with Date values", () => {
    const date = new Date("2023-01-01");
    const obj = { createdAt: date };
    const result = entries(obj);

    expect(result).toEqual([["createdAt", date]]);
    expect(result[0][1]).toBeInstanceOf(Date);
  });

  it("should clone nested objects independently", () => {
    const original = { user: { name: "John", age: 25 } };
    const result = entries(original);

    result[0][1].age = 30;

    expect(original.user.age).toBe(25);
  });

  it("should handle objects with multiple data types", () => {
    const obj = {
      string: "text",
      number: 42,
      boolean: true,
      null: null,
      array: [1, 2, 3],
      object: { nested: "value" },
    };
    const result = entries(obj);

    expect(result).toEqual([
      ["string", "text"],
      ["number", 42],
      ["boolean", true],
      ["null", null],
      ["array", [1, 2, 3]],
      ["object", { nested: "value" }],
    ]);
  });

  it("should return array with proper tuple type", () => {
    const obj = { key1: "value1", key2: "value2" };
    const result = entries(obj);

    expect(Array.isArray(result)).toBe(true);
    expect(Array.isArray(result[0])).toBe(true);
    expect(result[0].length).toBe(2);
  });
});
