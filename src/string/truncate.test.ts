import { describe, expect, it } from "vitest";
import { truncate } from "./truncate";

describe("truncate", () => {
  it("should truncate string longer than specified length", () => {
    expect(truncate("Hello World", 5)).toBe("He...");
    expect(truncate("JavaScript", 6)).toBe("Jav...");
  });

  it("should return original string if shorter than or equal to length", () => {
    expect(truncate("Hello", 5)).toBe("Hello");
    expect(truncate("Hello", 10)).toBe("Hello");
  });

  it("should use custom ending", () => {
    expect(truncate("Hello World", 8, "…")).toBe("Hello W…");
    expect(truncate("JavaScript", 7, "...")).toBe("Java...");
    expect(truncate("Long text here", 10, " [more]")).toBe("Lon [more]");
  });

  it("should handle empty string", () => {
    expect(truncate("", 5)).toBe("");
    expect(truncate("", 0)).toBe("");
  });

  it("should return empty string if length is zero or negative", () => {
    expect(truncate("Hello", 0)).toBe("");
    expect(truncate("Hello", -1)).toBe("");
    expect(truncate("Hello", -10)).toBe("");
  });

  it("should handle length equal to ending length", () => {
    expect(truncate("Hello World", 3)).toBe("...");
    expect(truncate("Hello", 3, "...")).toBe("...");
  });

  it("should handle very short length", () => {
    expect(truncate("Hello World", 1)).toBe(".");
    expect(truncate("Hello World", 2)).toBe("..");
  });

  it("should work with default ending", () => {
    expect(truncate("This is a long string", 10)).toBe("This is...");
    expect(truncate("Another long text", 12)).toBe("Another l...");
  });

  it("should handle strings with special characters", () => {
    expect(truncate("Hello @World!", 8)).toBe("Hello...");
    expect(truncate("Test#123", 6)).toBe("Tes...");
  });

  it("should handle strings with numbers", () => {
    expect(truncate("1234567890", 5)).toBe("12...");
    expect(truncate("Test123", 6)).toBe("Tes...");
  });

  it("should handle Unicode characters", () => {
    expect(truncate("Hello 世界", 8)).toBe("Hello 世界");
    expect(truncate("Café ☕", 6)).toBe("Café ☕");
  });

  it("should handle empty ending", () => {
    expect(truncate("Hello World", 5, "")).toBe("Hello");
    expect(truncate("JavaScript", 4, "")).toBe("Java");
  });

  it("should handle very long ending", () => {
    expect(truncate("Hello World", 15, " [read more...]")).toBe("Hello World");
    expect(truncate("Hello World", 11, " [read more...]")).toBe("Hello World");
  });

  it("should handle whitespace in strings", () => {
    expect(truncate("Hello   World", 10)).toBe("Hello  ...");
    expect(truncate("  Spaces  ", 6)).toBe("  S...");
  });
});
