import { describe, it, expect, vi } from "vitest";
import { retry } from "./retry.js";

describe("retry", () => {
  it("should return result on first successful attempt", async () => {
    const fn = vi.fn().mockResolvedValue("success");

    const result = await retry(fn);

    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should retry specified number of times on failure", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("fail 1"))
      .mockRejectedValueOnce(new Error("fail 2"))
      .mockResolvedValue("success");

    const result = await retry(fn, { attempts: 3 });

    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("should throw last error after all attempts fail", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("fail 1"))
      .mockRejectedValueOnce(new Error("fail 2"))
      .mockRejectedValueOnce(new Error("fail 3"));

    await expect(retry(fn, { attempts: 3 })).rejects.toThrow("fail 3");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("should use default attempts of 3", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("always fails"));

    await expect(retry(fn)).rejects.toThrow("always fails");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("should delay between retries when delayMs is specified", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("fail 1"))
      .mockResolvedValue("success");

    const startTime = Date.now();
    const result = await retry(fn, { attempts: 3, delayMs: 50 });
    const endTime = Date.now();

    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(2);
    expect(endTime - startTime).toBeGreaterThanOrEqual(45);
  });

  it("should not delay on last attempt", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("fail 1"))
      .mockRejectedValueOnce(new Error("fail 2"))
      .mockRejectedValue(new Error("fail 3"));

    const startTime = Date.now();
    await expect(retry(fn, { attempts: 3, delayMs: 50 })).rejects.toThrow(
      "fail 3",
    );
    const endTime = Date.now();

    expect(fn).toHaveBeenCalledTimes(3);
    // Should have 2 delays (after first and second attempt)
    expect(endTime - startTime).toBeGreaterThanOrEqual(100);
  });

  it("should handle zero delay", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue("success");

    const result = await retry(fn, { attempts: 2, delayMs: 0 });

    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("should succeed on second attempt", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue(42);

    const result = await retry(fn, { attempts: 3 });

    expect(result).toBe(42);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("should handle single attempt", async () => {
    const fn = vi.fn().mockResolvedValue("immediate success");

    const result = await retry(fn, { attempts: 1 });

    expect(result).toBe("immediate success");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should throw immediately on single failed attempt", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("immediate fail"));

    await expect(retry(fn, { attempts: 1 })).rejects.toThrow("immediate fail");
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
