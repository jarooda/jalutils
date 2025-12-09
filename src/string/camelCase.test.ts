import { describe, expect, it } from "vitest";
import { camelCase } from "./camelCase";

const cases = [
  {
    input: "hello world",
    expected: "helloWorld",
  },
  {
    input: "Hello World",
    expected: "helloWorld",
  },
  {
    input: "hello-world",
    expected: "helloWorld",
  },
  {
    input: "hello_world",
    expected: "helloWorld",
  },
  {
    input: "HELLO WORLD",
    expected: "helloWorld",
  },
  {
    input: "hElLo WoRlD",
    expected: "helloWorld",
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
    expected: "helloWorld",
  },
  { input: "hello-world_test case", expected: "helloWorldTestCase" },
  {
    input: "  multiple   separators--here__now ",
    expected: "multipleSeparatorsHereNow",
  },
  {
    input: "single",
    expected: "single",
  },
  {
    input: "number 123 test",
    expected: "number123Test",
  },
  {
    input: "123number test",
    expected: "123numberTest",
  },
  {
    input: "special @char# test!",
    expected: "special@char#Test!",
  },
  {
    input: "mixed CASE Input_string-Test",
    expected: "mixedCaseInputStringTest",
  },
];

describe("camelCase", () => {
  it("should convert strings to camelCase", () => {
    cases.forEach(({ input, expected }) => {
      expect(camelCase(input)).toBe(expected);
    });
  });
});
