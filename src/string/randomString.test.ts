import { describe, expect, it } from "vitest";
import { randomString } from "./randomString";

describe("randomString", () => {
  it("generates a string of the specified length", () => {
    const length = 10;
    const result = randomString(length);
    expect(result).toHaveLength(length);
  });

  it("generates different strings on multiple calls", () => {
    const length = 10;
    const result1 = randomString(length);
    const result2 = randomString(length);
    expect(result1).not.toBe(result2);
  });

  it("uses custom characters when provided", () => {
    const length = 15;
    const chars = "ABC123";
    const result = randomString(length, { chars });
    for (const char of result) {
      expect(chars).toContain(char);
    }
  });

  it("generates an empty string when length is 0", () => {
    const result = randomString(0);
    expect(result).toBe("");
  });
});
