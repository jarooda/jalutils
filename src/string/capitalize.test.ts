import { describe, expect, it } from "vitest";
import { capitalize } from "./capitalize";

describe("capitalize", () => {
  it("should capitalize the first letter of a string", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("world")).toBe("World");
  });

  it("should return an empty string if input is empty", () => {
    expect(capitalize("")).toBe("");
  });

  it("should handle single character strings", () => {
    expect(capitalize("a")).toBe("A");
    expect(capitalize("z")).toBe("Z");
  });

  it("should not change the rest of the string", () => {
    expect(capitalize("hELLO")).toBe("HELLO");
    expect(capitalize("wORLD")).toBe("WORLD");
  });

  it("should handle strings with spaces", () => {
    expect(capitalize(" hello world")).toBe(" Hello world");
    expect(capitalize(" hello")).toBe(" Hello");
    expect(capitalize("        hello")).toBe("        Hello");
    expect(capitalize("    d hello ")).toBe("    D hello ");
  });

  it("should handle strings with special characters", () => {
    expect(capitalize("!hello")).toBe("!hello");
    expect(capitalize("@world")).toBe("@world");
  });

  it("should handle strings with numbers", () => {
    expect(capitalize("123abc")).toBe("123abc");
    expect(capitalize("1hello")).toBe("1hello");
    expect(capitalize(" 3maximize")).toBe(" 3maximize");
  });
});
