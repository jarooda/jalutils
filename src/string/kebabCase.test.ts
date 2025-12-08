import { describe, expect, it } from "vitest";
import { kebabCase } from "./kebabCase";

const cases = [
  {
    input: "hello world",
    expected: "hello-world",
  },
  {
    input: "Hello World",
    expected: "hello-world",
  },
  {
    input: "hello-world",
    expected: "hello-world",
  },
  {
    input: "hello_world",
    expected: "hello-world",
  },
  {
    input: "HELLO WORLD",
    expected: "hello-world",
  },
  {
    input: "hElLo WoRlD",
    expected: "hello-world",
  },
  {
    input: "",
    expected: "",
  },
  {
    input: "   ",
    expected: "",
  },
  {
    input: "hello    world",
    expected: "hello-world",
  },
  { input: "hello-world_test case", expected: "hello-world-test-case" },
  {
    input: "  multiple   separators--here__now ",
    expected: "multiple-separators--here-now",
  },
  {
    input: "single",
    expected: "single",
  },
  {
    input: "number 123 test",
    expected: "number-123-test",
  },
  {
    input: "123number test",
    expected: "123number-test",
  },
  {
    input: "special @char# test!",
    expected: "special-@char#-test!",
  },
  {
    input: "mixed CASE Input_string-Test",
    expected: "mixed-case-input-string-test",
  },
];

describe("kebabCase", () => {
  it("should convert strings to kebabCase", () => {
    cases.forEach(({ input, expected }) => {
      expect(kebabCase(input)).toBe(expected);
    });
  });
});
