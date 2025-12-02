import { describe, expect, it } from "vitest";
import { unix } from "./unix";

describe("unix", () => {
  it("should convert Date to Unix timestamp", () => {
    const date = new Date("2023-01-01T00:00:00Z");
    expect(unix(date)).toBe(1672531200);
  });

  it("should convert ISO string to Unix timestamp", () => {
    const isoString = "2023-01-01T00:00:00Z";
    expect(unix(isoString)).toBe(1672531200);
  });

  it("should convert milliseconds to Unix timestamp", () => {
    const milliseconds = 1672531200000;
    expect(unix(milliseconds)).toBe(1672531200);
  });

  it("should throw TypeError for invalid input", () => {
    expect(() => unix({} as never)).toThrow(TypeError);
  });
});
