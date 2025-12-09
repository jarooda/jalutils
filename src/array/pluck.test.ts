import { describe, it, expect } from "vitest";
import { pluck } from "./pluck";

describe("pluck", () => {
  it("should extract values from array of objects by key", () => {
    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];
    const result = pluck(users, "name");
    expect(result).toEqual(["Alice", "Bob", "Charlie"]);
  });

  it("should extract numeric values", () => {
    const users = [
      { id: 1, age: 25 },
      { id: 2, age: 30 },
      { id: 3, age: 35 },
    ];
    const result = pluck(users, "age");
    expect(result).toEqual([25, 30, 35]);
  });

  it("should handle empty array", () => {
    const result = pluck([], "name");
    expect(result).toEqual([]);
  });

  it("should handle single element array", () => {
    const users = [{ id: 1, name: "Alice" }];
    const result = pluck(users, "name");
    expect(result).toEqual(["Alice"]);
  });

  it("should extract boolean values", () => {
    const items = [
      { id: 1, active: true },
      { id: 2, active: false },
      { id: 3, active: true },
    ];
    const result = pluck(items, "active");
    expect(result).toEqual([true, false, true]);
  });

  it("should extract null and undefined values", () => {
    const items = [
      { id: 1, value: null },
      { id: 2, value: undefined },
      { id: 3, value: "test" },
    ];
    const result = pluck(items, "value");
    expect(result).toEqual([null, undefined, "test"]);
  });

  it("should extract nested objects", () => {
    const users = [
      { id: 1, profile: { age: 25 } },
      { id: 2, profile: { age: 30 } },
      { id: 3, profile: { age: 35 } },
    ];
    const result = pluck(users, "profile");
    expect(result).toEqual([{ age: 25 }, { age: 30 }, { age: 35 }]);
  });

  it("should extract array values", () => {
    const items = [
      { id: 1, tags: ["a", "b"] },
      { id: 2, tags: ["c", "d"] },
      { id: 3, tags: ["e", "f"] },
    ];
    const result = pluck(items, "tags");
    expect(result).toEqual([
      ["a", "b"],
      ["c", "d"],
      ["e", "f"],
    ]);
  });

  it("should not mutate original array", () => {
    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    const copy = JSON.parse(JSON.stringify(users));
    pluck(users, "name");
    expect(users).toEqual(copy);
  });

  it("should work with objects having multiple properties", () => {
    const products = [
      { id: 1, name: "Product 1", price: 100, stock: 50 },
      { id: 2, name: "Product 2", price: 200, stock: 30 },
      { id: 3, name: "Product 3", price: 300, stock: 20 },
    ];
    const result = pluck(products, "price");
    expect(result).toEqual([100, 200, 300]);
  });

  it("should extract symbol keys", () => {
    const sym = Symbol("test");
    const items = [
      { [sym]: "value1" },
      { [sym]: "value2" },
      { [sym]: "value3" },
    ];
    const result = pluck(items, sym as keyof (typeof items)[0]);
    expect(result).toEqual(["value1", "value2", "value3"]);
  });

  it("should extract numeric keys from array-like objects", () => {
    const items = [
      { 0: "a", 1: "b", length: 2 },
      { 0: "c", 1: "d", length: 2 },
      { 0: "e", 1: "f", length: 2 },
    ];
    const result = pluck(items, 0 as keyof (typeof items)[0]);
    expect(result).toEqual(["a", "c", "e"]);
  });

  it("should preserve order of elements", () => {
    const users = [
      { id: 5, name: "Eve" },
      { id: 1, name: "Alice" },
      { id: 3, name: "Charlie" },
      { id: 2, name: "Bob" },
    ];
    const result = pluck(users, "name");
    expect(result).toEqual(["Eve", "Alice", "Charlie", "Bob"]);
  });

  it("should handle duplicate values", () => {
    const items = [
      { id: 1, category: "A" },
      { id: 2, category: "A" },
      { id: 3, category: "B" },
      { id: 4, category: "A" },
    ];
    const result = pluck(items, "category");
    expect(result).toEqual(["A", "A", "B", "A"]);
  });
});
