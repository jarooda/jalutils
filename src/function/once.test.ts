import { describe, it, expect, vi } from "vitest";
import { once } from "./once";

describe("once", () => {
  it("should call the function only once", () => {
    const mockFn = vi.fn();
    const onceFn = once(mockFn);

    onceFn();
    onceFn();
    onceFn();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
