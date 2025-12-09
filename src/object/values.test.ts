import { describe, it, expect } from "vitest";
import { values } from "./values";

describe("values", () => {
  it("should return values of a flat object", () => {
    const obj = { name: "John", age: 25, city: "New York" };
    const result = values(obj);

    expect(result).toEqual(["John", 25, "New York"]);
  });

  it("should return values including nested objects", () => {
    const obj = {
      name: "John",
      address: { city: "New York", zip: "10001" },
    };
    const result = values(obj);

    expect(result).toEqual(["John", { city: "New York", zip: "10001" }]);
  });

  it("should return empty array for empty objects", () => {
    const obj = {};
    const result = values(obj);

    expect(result).toEqual([]);
  });

  it("should clone values to prevent mutation", () => {
    const original = { items: [1, 2, 3], data: { count: 5 } };
    const result = values(original);

    result[0].push(4);
    result[1].count = 10;

    expect(original.items).toEqual([1, 2, 3]);
    expect(original.data.count).toBe(5);
  });

  it("should handle objects with null values", () => {
    const obj = { a: null, b: "value", c: null };
    const result = values(obj);

    expect(result).toEqual([null, "value", null]);
  });

  it("should handle objects with undefined values", () => {
    const obj = { a: undefined, b: "value", c: undefined };
    const result = values(obj);

    expect(result).toEqual([undefined, "value", undefined]);
  });

  it("should handle objects with boolean values", () => {
    const obj = { isActive: true, isVerified: false, isEnabled: true };
    const result = values(obj);

    expect(result).toEqual([true, false, true]);
  });

  it("should handle objects with number values", () => {
    const obj = { count: 42, price: 19.99, quantity: 0 };
    const result = values(obj);

    expect(result).toEqual([42, 19.99, 0]);
  });

  it("should handle objects with array values", () => {
    const obj = { hobbies: ["reading", "coding"], scores: [95, 87, 92] };
    const result = values(obj);

    expect(result).toEqual([
      ["reading", "coding"],
      [95, 87, 92],
    ]);
  });

  it("should handle objects with Date values", () => {
    const date1 = new Date("2023-01-01");
    const date2 = new Date("2023-12-31");
    const obj = { createdAt: date1, updatedAt: date2 };
    const result = values(obj);

    expect(result).toEqual([date1, date2]);
    expect(result[0]).toBeInstanceOf(Date);
    expect(result[1]).toBeInstanceOf(Date);
  });

  it("should clone nested objects independently", () => {
    const original = {
      user: { name: "John", age: 25 },
      admin: { name: "Admin" },
    };
    const result = values(original);

    result[0].age = 30;

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
    const result = values(obj);

    expect(result).toEqual([
      "text",
      42,
      true,
      null,
      [1, 2, 3],
      { nested: "value" },
    ]);
  });

  it("should return array type", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = values(obj);

    expect(Array.isArray(result)).toBe(true);
  });

  it("should handle single property objects", () => {
    const obj = { onlyKey: "onlyValue" };
    const result = values(obj);

    expect(result).toEqual(["onlyValue"]);
    expect(result.length).toBe(1);
  });

  it("should handle objects with function values", () => {
    const fn1 = () => "test";
    const fn2 = function () {
      return "test2";
    };
    const obj = { method1: fn1, method2: fn2 };
    const result = values(obj);

    expect(result).toEqual([fn1, fn2]);
    expect(typeof result[0]).toBe("function");
    expect(typeof result[1]).toBe("function");
  });

  it("should handle cloning of array values", () => {
    const original = { arr1: [1, 2, 3], arr2: [4, 5, 6] };
    const result = values(original);

    result[0].push(99);

    expect(original.arr1).toEqual([1, 2, 3]);
  });
});
