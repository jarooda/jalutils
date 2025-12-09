import { describe, expect, it } from "vitest";
import { stripTags } from "./stripTags";

const cases = [
  {
    input: "<p>This is a <strong>test</strong>.</p>",
    expected: "This is a test.",
  },
  {
    input: "<div><a href='#'>Link</a> and <em>emphasis</em></div>",
    expected: "Link and emphasis",
  },
  {
    input: "No tags here!",
    expected: "No tags here!",
  },
  {
    input: "<!-- Comment -->Visible text",
    expected: "Visible text",
  },
  {
    input: "<p>Nested <span>tags <em>are</em> tricky</span></p>",
    expected: "Nested tags are tricky",
  },
  {
    input: "<br/><hr/>Line breaks",
    expected: "Line breaks",
  },
  {
    input: "<p>Special characters &amp; entities</p>",
    expected: "Special characters &amp; entities",
  },
  {
    input: "",
    expected: "",
  },
];

describe("stripTags", () => {
  cases.forEach(({ input, expected }, index) => {
    it(`case #${index + 1}`, () => {
      const result = stripTags(input);
      expect(result).toBe(expected);
    });
  });
});
