import { describe, it, expect } from "vitest";
import { clone } from "./clone";

describe("clone", () => {
  it("should return null for null", () => {
    expect(clone(null)).toBe(null);
  });

  it("should return undefined for undefined", () => {
    expect(clone(undefined)).toBe(undefined);
  });

  it("should clone primitive string", () => {
    const str = "hello";
    expect(clone(str)).toBe(str);
  });

  it("should clone primitive number", () => {
    const num = 42;
    expect(clone(num)).toBe(num);
  });

  it("should clone primitive boolean", () => {
    const bool = true;
    expect(clone(bool)).toBe(bool);
  });

  it("should clone symbol", () => {
    const sym = Symbol("test");
    expect(clone(sym)).toBe(sym);
  });

  it("should clone bigint", () => {
    const bigInt = BigInt(123456789);
    expect(clone(bigInt)).toBe(bigInt);
  });

  it("should clone Date object", () => {
    const date = new Date("2023-01-01");
    const cloned = clone(date);
    expect(cloned).toEqual(date);
    expect(cloned).not.toBe(date);
    expect(cloned.getTime()).toBe(date.getTime());
  });

  it("should clone RegExp object", () => {
    const regex = /test/gi;
    const cloned = clone(regex);
    expect(cloned).toEqual(regex);
    expect(cloned).not.toBe(regex);
    expect(cloned.source).toBe(regex.source);
    expect(cloned.flags).toBe(regex.flags);
  });

  it("should clone simple array", () => {
    const arr = [1, 2, 3];
    const cloned = clone(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
  });

  it("should clone nested array", () => {
    const arr = [1, [2, 3], [4, [5, 6]]];
    const cloned = clone(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[1]).not.toBe(arr[1]);
    expect(cloned[2]).not.toBe(arr[2]);
  });

  it("should clone simple object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const cloned = clone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
  });

  it("should clone nested object", () => {
    const obj = {
      a: 1,
      b: { c: 2, d: { e: 3 } },
      f: [1, 2, { g: 4 }],
    };
    const cloned = clone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
    expect(cloned.b.d).not.toBe(obj.b.d);
    expect(cloned.f).not.toBe(obj.f);
  });

  it("should clone Map", () => {
    const map = new Map<string, number | { d: number }>([
      ["a", 1],
      ["b", 2],
      ["c", { d: 3 }],
    ]);
    const cloned = clone(map);
    expect(cloned).toEqual(map);
    expect(cloned).not.toBe(map);
    expect(cloned.get("c")).toEqual(map.get("c"));
    expect(cloned.get("c")).not.toBe(map.get("c"));
  });

  it("should clone Set", () => {
    const set = new Set([1, 2, 3, { a: 4 }]);
    const cloned = clone(set);
    expect(cloned).toEqual(set);
    expect(cloned).not.toBe(set);
  });

  it("should clone TypedArray (Uint8Array)", () => {
    const arr = new Uint8Array([1, 2, 3, 4]);
    const cloned = clone(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
  });

  it("should clone TypedArray (Int32Array)", () => {
    const arr = new Int32Array([1, 2, 3, 4]);
    const cloned = clone(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
  });

  it("should clone ArrayBuffer", () => {
    const buffer = new ArrayBuffer(8);
    const view = new Uint8Array(buffer);
    view[0] = 255;
    const cloned = clone(buffer);
    expect(cloned).not.toBe(buffer);
    expect(new Uint8Array(cloned)[0]).toBe(255);
  });

  it("should clone DataView", () => {
    const buffer = new ArrayBuffer(8);
    const dataView = new DataView(buffer);
    dataView.setInt8(0, 127);
    const cloned = clone(dataView);
    expect(cloned).not.toBe(dataView);
    expect(cloned.getInt8(0)).toBe(127);
  });

  it("should clone Error object", () => {
    const error = new Error("Test error");
    const cloned = clone(error);
    expect(cloned).not.toBe(error);
    expect(cloned.message).toBe(error.message);
    expect(cloned.name).toBe(error.name);
  });

  it("should clone Error with custom properties", () => {
    const error = new Error("Test error") as Error & {
      customProp: { nested: string };
    };
    error.customProp = { nested: "value" };
    const cloned = clone(error);
    expect(cloned).not.toBe(error);
    expect(cloned.customProp).toEqual(error.customProp);
    expect(cloned.customProp).not.toBe(error.customProp);
  });

  it("should clone Promise", async () => {
    const promise = Promise.resolve(42);
    const cloned = clone(promise);
    expect(cloned).not.toBe(promise);
    await expect(cloned).resolves.toBe(42);
  });

  it("should clone Promise with nested object", async () => {
    const obj = { a: 1, b: { c: 2 } };
    const promise = Promise.resolve(obj);
    const cloned = clone(promise);
    expect(cloned).not.toBe(promise);
    const result = await cloned;
    expect(result).toEqual(obj);
    expect(result).not.toBe(obj);
  });

  it("should clone rejected Promise", async () => {
    const error = new Error("Test error");
    const promise = Promise.reject(error);
    const cloned = clone(promise);
    expect(cloned).not.toBe(promise);
    await expect(cloned).rejects.toThrow("Test error");
  });

  it("should handle complex nested structures", () => {
    const complex = {
      str: "hello",
      num: 42,
      bool: true,
      nil: null,
      undef: undefined,
      date: new Date("2023-01-01"),
      regex: /test/gi,
      arr: [1, 2, [3, 4]],
      map: new Map([["key", "value"]]),
      set: new Set([1, 2, 3]),
      nested: {
        deep: {
          value: "nested",
        },
      },
    };
    const cloned = clone(complex);
    expect(cloned).toEqual(complex);
    expect(cloned).not.toBe(complex);
    expect(cloned.date).not.toBe(complex.date);
    expect(cloned.arr).not.toBe(complex.arr);
    expect(cloned.map).not.toBe(complex.map);
    expect(cloned.set).not.toBe(complex.set);
    expect(cloned.nested).not.toBe(complex.nested);
  });

  it("should not affect original when modifying clone", () => {
    const original = { a: 1, b: { c: 2 } };
    const cloned = clone(original);
    cloned.a = 999;
    cloned.b.c = 888;
    expect(original.a).toBe(1);
    expect(original.b.c).toBe(2);
  });
});
