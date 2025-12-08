import { describe, expect, it } from "vitest";
import { snakeCase } from "./snakeCase";

const cases = [
  {
    input: "hello world",
    expected: "hello_world",
  },
  {
    input: "Hello World",
    expected: "hello_world",
  },
  {
    input: "hello-world",
    expected: "hello_world",
  },
  {
    input: "hello_world",
    expected: "hello_world",
  },
  {
    input: "HELLO WORLD",
    expected: "hello_world",
  },
  {
    input: "hElLo WoRlD",
    expected: "hello_world",
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
    expected: "hello_world",
  },
  { input: "hello-world_test case", expected: "hello_world_test_case" },
  {
    input: "  multiple   separators--here__now ",
    expected: "multiple_separators_here__now",
  },
  {
    input: "single",
    expected: "single",
  },
  {
    input: "number 123 test",
    expected: "number_123_test",
  },
  {
    input: "123number test",
    expected: "123number_test",
  },
  {
    input: "special @char# test!",
    expected: "special_@char#_test!",
  },
  {
    input: "mixed CASE Input_string-Test",
    expected: "mixed_case_input_string_test",
  },
];

describe("snakeCase", () => {
  it("should convert strings to snakeCase", () => {
    cases.forEach(({ input, expected }) => {
      expect(snakeCase(input)).toBe(expected);
    });
  });
});
