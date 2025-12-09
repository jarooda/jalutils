import { describe, it, expect } from "vitest";
import { groupBy } from "./groupBy";

describe("groupBy", () => {
  it("should group objects by a string key", () => {
    const users = [
      { id: 1, name: "Alice", role: "admin" },
      { id: 2, name: "Bob", role: "user" },
      { id: 3, name: "Charlie", role: "admin" },
      { id: 4, name: "David", role: "user" },
    ];
    const result = groupBy(users, "role");
    expect(result).toEqual({
      admin: [
        { id: 1, name: "Alice", role: "admin" },
        { id: 3, name: "Charlie", role: "admin" },
      ],
      user: [
        { id: 2, name: "Bob", role: "user" },
        { id: 4, name: "David", role: "user" },
      ],
    });
  });

  it("should group objects by a numeric key", () => {
    const items = [
      { id: 1, category: 1 },
      { id: 2, category: 2 },
      { id: 3, category: 1 },
      { id: 4, category: 2 },
    ];
    const result = groupBy(items, "category");
    expect(result).toEqual({
      "1": [
        { id: 1, category: 1 },
        { id: 3, category: 1 },
      ],
      "2": [
        { id: 2, category: 2 },
        { id: 4, category: 2 },
      ],
    });
  });

  it("should handle empty array", () => {
    const result = groupBy([], "name");
    expect(result).toEqual({});
  });

  it("should handle single element array", () => {
    const users = [{ id: 1, name: "Alice", role: "admin" }];
    const result = groupBy(users, "role");
    expect(result).toEqual({
      admin: [{ id: 1, name: "Alice", role: "admin" }],
    });
  });

  it("should handle all items in same group", () => {
    const users = [
      { id: 1, name: "Alice", role: "admin" },
      { id: 2, name: "Bob", role: "admin" },
      { id: 3, name: "Charlie", role: "admin" },
    ];
    const result = groupBy(users, "role");
    expect(result).toEqual({
      admin: [
        { id: 1, name: "Alice", role: "admin" },
        { id: 2, name: "Bob", role: "admin" },
        { id: 3, name: "Charlie", role: "admin" },
      ],
    });
  });

  it("should handle all items in different groups", () => {
    const users = [
      { id: 1, name: "Alice", role: "admin" },
      { id: 2, name: "Bob", role: "user" },
      { id: 3, name: "Charlie", role: "guest" },
    ];
    const result = groupBy(users, "role");
    expect(result).toEqual({
      admin: [{ id: 1, name: "Alice", role: "admin" }],
      user: [{ id: 2, name: "Bob", role: "user" }],
      guest: [{ id: 3, name: "Charlie", role: "guest" }],
    });
  });

  it("should group by boolean values", () => {
    const items = [
      { id: 1, active: true },
      { id: 2, active: false },
      { id: 3, active: true },
      { id: 4, active: false },
    ];
    const result = groupBy(items, "active");
    expect(result).toEqual({
      true: [
        { id: 1, active: true },
        { id: 3, active: true },
      ],
      false: [
        { id: 2, active: false },
        { id: 4, active: false },
      ],
    });
  });

  it("should handle null and undefined values", () => {
    const items = [
      { id: 1, category: "A" },
      { id: 2, category: null },
      { id: 3, category: undefined },
      { id: 4, category: "A" },
    ];
    const result = groupBy(items, "category");
    expect(result).toEqual({
      A: [
        { id: 1, category: "A" },
        { id: 4, category: "A" },
      ],
      null: [{ id: 2, category: null }],
      undefined: [{ id: 3, category: undefined }],
    });
  });

  it("should preserve order within groups", () => {
    const users = [
      { id: 5, name: "Eve", role: "admin" },
      { id: 1, name: "Alice", role: "user" },
      { id: 3, name: "Charlie", role: "admin" },
      { id: 2, name: "Bob", role: "user" },
    ];
    const result = groupBy(users, "role");
    expect(result.admin[0].id).toBe(5);
    expect(result.admin[1].id).toBe(3);
    expect(result.user[0].id).toBe(1);
    expect(result.user[1].id).toBe(2);
  });

  it("should not mutate original array", () => {
    const users = [
      { id: 1, name: "Alice", role: "admin" },
      { id: 2, name: "Bob", role: "user" },
    ];
    const copy = JSON.parse(JSON.stringify(users));
    groupBy(users, "role");
    expect(users).toEqual(copy);
  });

  it("should handle multiple keys with same string representation", () => {
    const items = [
      { id: 1, value: 1 },
      { id: 2, value: "1" },
      { id: 3, value: 1 },
      { id: 4, value: "1" },
    ];
    const result = groupBy(items, "value");
    // Both numeric 1 and string '1' will be grouped under '1'
    expect(result["1"]).toHaveLength(4);
  });

  it("should work with objects having many properties", () => {
    const products = [
      { id: 1, name: "Product 1", category: "Electronics", price: 100 },
      { id: 2, name: "Product 2", category: "Books", price: 20 },
      { id: 3, name: "Product 3", category: "Electronics", price: 150 },
    ];
    const result = groupBy(products, "category");
    expect(result).toEqual({
      Electronics: [
        { id: 1, name: "Product 1", category: "Electronics", price: 100 },
        { id: 3, name: "Product 3", category: "Electronics", price: 150 },
      ],
      Books: [{ id: 2, name: "Product 2", category: "Books", price: 20 }],
    });
  });

  it("should handle special characters in key values", () => {
    const items = [
      { id: 1, tag: "hello-world" },
      { id: 2, tag: "hello_world" },
      { id: 3, tag: "hello-world" },
    ];
    const result = groupBy(items, "tag");
    expect(result).toEqual({
      "hello-world": [
        { id: 1, tag: "hello-world" },
        { id: 3, tag: "hello-world" },
      ],
      hello_world: [{ id: 2, tag: "hello_world" }],
    });
  });

  it("should handle empty string as key value", () => {
    const items = [
      { id: 1, category: "" },
      { id: 2, category: "A" },
      { id: 3, category: "" },
    ];
    const result = groupBy(items, "category");
    expect(result).toEqual({
      "": [
        { id: 1, category: "" },
        { id: 3, category: "" },
      ],
      A: [{ id: 2, category: "A" }],
    });
  });
});
