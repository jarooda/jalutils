import { describe, it, expect, vi } from "vitest";
import { throttle } from "./throttle";

describe("throttle", () => {
  it("should call the function immediately and then throttle subsequent calls", () => {
    const mockFunc = vi.fn();
    const throttledFunc = throttle(mockFunc, 100);

    throttledFunc(1);
    expect(mockFunc).toHaveBeenCalledWith(1);
    expect(mockFunc).toHaveBeenCalledTimes(1);

    throttledFunc(2);
    expect(mockFunc).toHaveBeenCalledTimes(1); // Should not be called again

    setTimeout(() => {
      throttledFunc(3);
      expect(mockFunc).toHaveBeenCalledWith(3);
      expect(mockFunc).toHaveBeenCalledTimes(2);
    }, 150);
  });

  it("should handle multiple calls within the wait period", () => {
    const mockFunc = vi.fn();
    const throttledFunc = throttle(mockFunc, 100);

    throttledFunc(1);
    throttledFunc(2);
    throttledFunc(3);

    expect(mockFunc).toHaveBeenCalledWith(1);
    expect(mockFunc).toHaveBeenCalledTimes(1);

    setTimeout(() => {
      expect(mockFunc).toHaveBeenCalledWith(3);
      expect(mockFunc).toHaveBeenCalledTimes(2);
    }, 150);
  });

  it("should not call the function if the wait time has not passed", () => {
    const mockFunc = vi.fn();
    const throttledFunc = throttle(mockFunc, 100);

    throttledFunc(1);
    throttledFunc(2);

    expect(mockFunc).toHaveBeenCalledWith(1);
    expect(mockFunc).toHaveBeenCalledTimes(1);

    setTimeout(() => {
      throttledFunc(3);
      expect(mockFunc).toHaveBeenCalledWith(3);
      expect(mockFunc).toHaveBeenCalledTimes(2);
    }, 50); // Less than wait time
  });
});
