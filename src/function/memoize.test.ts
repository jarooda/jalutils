import { describe, it, expect, vi } from "vitest";
import { memoize } from "./memoize";

describe("memoize", () => {
  it("should memoize the function", () => {
    const mockFn = vi.fn();
    const memoizedFn = memoize(mockFn);

    memoizedFn("first");
    memoizedFn("first");
    expect(mockFn).toHaveBeenCalledTimes(1);

    memoizedFn("second");
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
