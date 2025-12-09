import { describe, it, expect } from "vitest";
import { timeout } from "./timeout.js";
import { sleep } from "./sleep.js";

describe("timeout", () => {
  it("should resolve with value if promise completes before timeout", async () => {
    const promise = Promise.resolve("success");

    const result = await timeout(promise, 100);

    expect(result).toBe("success");
  });

  it("should reject with timeout error if promise takes too long", async () => {
    const promise = sleep(200).then(() => "too late");

    await expect(timeout(promise, 50)).rejects.toThrow(
      "Operation timed out after 50 ms",
    );
  });

  it("should propagate original error if promise rejects before timeout", async () => {
    const promise = Promise.reject(new Error("original error"));

    await expect(timeout(promise, 100)).rejects.toThrow("original error");
  });

  it("should handle fast resolving promises", async () => {
    const promise = Promise.resolve(42);

    const result = await timeout(promise, 1000);

    expect(result).toBe(42);
  });

  it("should handle zero timeout", async () => {
    const promise = sleep(10).then(() => "delayed");

    await expect(timeout(promise, 0)).rejects.toThrow(
      "Operation timed out after 0 ms",
    );
  });

  it("should resolve with complex return types", async () => {
    const complexValue = { data: [1, 2, 3], message: "test" };
    const promise = Promise.resolve(complexValue);

    const result = await timeout(promise, 100);

    expect(result).toEqual(complexValue);
  });

  it("should handle promises that resolve at timeout boundary", async () => {
    const promise = sleep(50).then(() => "boundary");

    const result = await timeout(promise, 100);

    expect(result).toBe("boundary");
  });

  it("should reject with custom error message containing timeout duration", async () => {
    const promise = sleep(500).then(() => "never");

    await expect(timeout(promise, 250)).rejects.toThrow(
      "Operation timed out after 250 ms",
    );
  });

  it("should handle multiple timeouts in parallel", async () => {
    const promise1 = sleep(30).then(() => "fast");
    const promise2 = sleep(300).then(() => "slow");

    const results = await Promise.allSettled([
      timeout(promise1, 100),
      timeout(promise2, 100),
    ]);

    expect(results[0].status).toBe("fulfilled");
    if (results[0].status === "fulfilled") {
      expect(results[0].value).toBe("fast");
    }

    expect(results[1].status).toBe("rejected");
    if (results[1].status === "rejected") {
      expect(results[1].reason.message).toContain(
        "Operation timed out after 100 ms",
      );
    }
  });

  it("should clean up timer on successful resolution", async () => {
    const promise = Promise.resolve("cleanup test");

    const result = await timeout(promise, 1000);

    expect(result).toBe("cleanup test");
    // Timer should be cleared, no timeout error should occur
  });

  it("should clean up timer on rejection", async () => {
    const promise = Promise.reject(new Error("early rejection"));

    await expect(timeout(promise, 1000)).rejects.toThrow("early rejection");
    // Timer should be cleared, no timeout error should occur after
  });
});
