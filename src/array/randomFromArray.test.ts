import { describe, expect, it } from "vitest";
import { randomFromArray } from "./randomFromArray";

describe("randomFromArray", () => {
  it("should return an element from the array", () => {
    const array = [1, 2, 3, 4, 5];
    const result = randomFromArray(array);
    expect(array).toContain(result);
  });

  it("should work with string arrays", () => {
    const array = ["apple", "banana", "cherry"];
    const result = randomFromArray(array);
    expect(array).toContain(result);
  });

  it("should work with object arrays", () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = randomFromArray(array);
    expect(array).toContain(result);
  });

  it("should work with single-element arrays", () => {
    const array = [42];
    const result = randomFromArray(array);
    expect(result).toBe(42);
  });

  it("should throw an error for an empty array", () => {
    expect(() => randomFromArray([])).toThrow(
      "Array must not be null or empty",
    );
  });

  it("should throw an error for a null array", () => {
    expect(() => randomFromArray(null as never)).toThrow(
      "Array must not be null or empty",
    );
  });

  it("should throw an error for an undefined array", () => {
    expect(() => randomFromArray(undefined as never)).toThrow(
      "Array must not be null or empty",
    );
  });
});
