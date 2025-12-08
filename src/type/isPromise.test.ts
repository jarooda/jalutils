import { describe, it, expect } from "vitest";
import { isPromise } from "./isPromise";

describe("isPromise", () => {
  it("should return true for Promise instances", () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise(Promise.reject().catch(() => {}))).toBe(true);
    expect(isPromise(new Promise(() => {}))).toBe(true);
  });

  it("should return true for async function results", () => {
    async function asyncFunc() {
      return 42;
    }
    expect(isPromise(asyncFunc())).toBe(true);
  });

  it("should return false for promise-like objects", () => {
    const promiseLike = {
      then: () => {},
      catch: () => {},
    };
    expect(isPromise(promiseLike)).toBe(false);
  });

  it("should return false for non-promise values", () => {
    expect(isPromise(null)).toBe(false);
    expect(isPromise(undefined)).toBe(false);
    expect(isPromise({})).toBe(false);
    expect(isPromise([])).toBe(false);
    expect(isPromise(123)).toBe(false);
    expect(isPromise("promise")).toBe(false);
    expect(isPromise(true)).toBe(false);
    expect(isPromise(() => {})).toBe(false);
  });
});
