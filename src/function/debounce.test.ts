import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { debounce } from "./debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should delay the function execution", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should call the function only once if called multiple times within wait period", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn("first");
    debouncedFn("second");
    debouncedFn("third");

    vi.advanceTimersByTime(500);
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("third");
  });

  it('should maintain the correct "this" context', () => {
    interface Context {
      value: number;
      receivedThis?: Context;
    }

    const mockFn = function (this: Context) {
      this.receivedThis = this;
      return this.value;
    };

    const context: Context = { value: 42 };
    const debouncedMethod = debounce(mockFn, 1000);

    debouncedMethod.call(context);
    vi.advanceTimersByTime(1000);

    expect(context.receivedThis).toBe(context);
    expect(context.value).toBe(42);
  });

  it("should pass through arguments correctly", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn(1, "a", true);
    vi.advanceTimersByTime(1000);

    expect(mockFn).toHaveBeenCalledWith(1, "a", true);
  });

  it("should cancel previous calls when called again within wait period", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn("first");
    vi.advanceTimersByTime(500);
    debouncedFn("second");

    vi.advanceTimersByTime(500);
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("second");
  });
});
