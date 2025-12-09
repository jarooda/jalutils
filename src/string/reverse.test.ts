import { describe, expect, it } from "vitest";
import { reverse } from "./reverse";

describe("reverse", () => {
  it("should reverse a regular string", () => {
    expect(reverse("hello")).toBe("olleh");
    expect(reverse("world")).toBe("dlrow");
  });

  it("should return an empty string if input is empty", () => {
    expect(reverse("")).toBe("");
  });

  it("should handle single character strings", () => {
    expect(reverse("a")).toBe("a");
    expect(reverse("Z")).toBe("Z");
  });

  it("should handle strings with spaces", () => {
    expect(reverse(" hello world")).toBe("dlrow olleh ");
    expect(reverse(" hello")).toBe("olleh ");
    expect(reverse("        hello")).toBe("olleh        ");
    expect(reverse("    d hello ")).toBe(" olleh d    ");
  });

  it("should handle strings with special characters", () => {
    expect(reverse("!hello")).toBe("olleh!");
    expect(reverse("@world")).toBe("dlrow@");
  });

  it("should handle strings with numbers", () => {
    expect(reverse("123abc")).toBe("cba321");
    expect(reverse("1hello")).toBe("olleh1");
    expect(reverse(" 3maximize")).toBe("ezimixam3 ");
  });
});
