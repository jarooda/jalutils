import { describe, it, expect } from "vitest";
import { compare } from "./compare";

describe("compare", () => {
  it("should return true for identical primitive values", () => {
    expect(compare(1, 1)).toBe(true);
    expect(compare("hello", "hello")).toBe(true);
    expect(compare(true, true)).toBe(true);
    expect(compare(null, null)).toBe(true);
    expect(compare(undefined, undefined)).toBe(true);
  });

  it("should return false for different primitive values", () => {
    expect(compare(1, 2)).toBe(false);
    expect(compare("hello", "world")).toBe(false);
    expect(compare(true, false)).toBe(false);
  });

  it("should return false for different types", () => {
    expect(compare(1, "1")).toBe(false);
    expect(compare(0, false)).toBe(false);
    expect(compare(null, undefined)).toBe(false);
    expect(compare({}, [])).toBe(false);
  });

  it("should compare simple objects correctly", () => {
    expect(compare({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(compare({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    expect(compare({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  it("should compare nested objects correctly", () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 } };
    const obj2 = { a: 1, b: { c: 2, d: 3 } };
    const obj3 = { a: 1, b: { c: 2, d: 4 } };

    expect(compare(obj1, obj2)).toBe(true);
    expect(compare(obj1, obj3)).toBe(false);
  });

  it("should compare deeply nested objects correctly", () => {
    const obj1 = { a: { b: { c: { d: 1 } } } };
    const obj2 = { a: { b: { c: { d: 1 } } } };
    const obj3 = { a: { b: { c: { d: 2 } } } };

    expect(compare(obj1, obj2)).toBe(true);
    expect(compare(obj1, obj3)).toBe(false);
  });

  it("should compare simple arrays correctly", () => {
    expect(compare([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(compare([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(compare([1, 2], [1, 2, 3])).toBe(false);
  });

  it("should compare nested arrays correctly", () => {
    expect(compare([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(compare([1, [2, 3]], [1, [2, 4]])).toBe(false);
  });

  it("should compare arrays with objects correctly", () => {
    const arr1 = [{ a: 1 }, { b: 2 }];
    const arr2 = [{ a: 1 }, { b: 2 }];
    const arr3 = [{ a: 1 }, { b: 3 }];

    expect(compare(arr1, arr2)).toBe(true);
    expect(compare(arr1, arr3)).toBe(false);
  });

  it("should compare objects with arrays correctly", () => {
    const obj1 = { a: [1, 2, 3], b: "test" };
    const obj2 = { a: [1, 2, 3], b: "test" };
    const obj3 = { a: [1, 2, 4], b: "test" };

    expect(compare(obj1, obj2)).toBe(true);
    expect(compare(obj1, obj3)).toBe(false);
  });

  it("should handle empty objects and arrays", () => {
    expect(compare({}, {})).toBe(true);
    expect(compare([], [])).toBe(true);
    expect(compare({}, { a: 1 })).toBe(false);
    expect(compare([], [1])).toBe(false);
  });

  it("should handle objects with null and undefined values", () => {
    expect(compare({ a: null }, { a: null })).toBe(true);
    expect(compare({ a: undefined }, { a: undefined })).toBe(true);
    expect(compare({ a: null }, { a: undefined })).toBe(false);
  });

  it("should handle mixed complex structures", () => {
    const complex1 = {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "NYC",
        coords: [40.7128, -74.006],
      },
      hobbies: ["reading", "coding"],
    };

    const complex2 = {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "NYC",
        coords: [40.7128, -74.006],
      },
      hobbies: ["reading", "coding"],
    };

    const complex3 = {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "NYC",
        coords: [40.7128, -74.0061], // Different coordinate
      },
      hobbies: ["reading", "coding"],
    };

    expect(compare(complex1, complex2)).toBe(true);
    expect(compare(complex1, complex3)).toBe(false);
  });

  it("should handle objects with different key orders", () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { c: 3, b: 2, a: 1 };

    expect(compare(obj1, obj2)).toBe(true);
  });

  it("should handle special number values", () => {
    expect(compare(NaN, NaN)).toBe(false); // NaN !== NaN
    expect(compare(Infinity, Infinity)).toBe(true);
    expect(compare(-Infinity, -Infinity)).toBe(true);
    expect(compare(Infinity, -Infinity)).toBe(false);
  });

  it("should return false when comparing array to object", () => {
    expect(compare([1, 2], { 0: 1, 1: 2 })).toBe(false);
  });

  it("should handle boolean values in structures", () => {
    expect(compare({ active: true }, { active: true })).toBe(true);
    expect(compare({ active: true }, { active: false })).toBe(false);
    expect(compare([true, false], [true, false])).toBe(true);
  });
});
