import { describe, it, expect } from "vitest";
import { sleep } from "./sleep.js";

describe("sleep", () => {
  it("should resolve after specified milliseconds", async () => {
    const startTime = Date.now();
    await sleep(100);
    const endTime = Date.now();

    expect(endTime - startTime).toBeGreaterThanOrEqual(95);
  });

  it("should resolve immediately for zero milliseconds", async () => {
    const startTime = Date.now();
    await sleep(0);
    const endTime = Date.now();

    expect(endTime - startTime).toBeLessThan(50);
  });

  it("should return void", async () => {
    const result = await sleep(10);

    expect(result).toBeUndefined();
  });

  it("should handle multiple concurrent sleeps", async () => {
    const startTime = Date.now();

    await Promise.all([sleep(50), sleep(50), sleep(50)]);

    const endTime = Date.now();

    // All should complete around the same time (parallel execution)
    expect(endTime - startTime).toBeGreaterThanOrEqual(50);
    expect(endTime - startTime).toBeLessThan(200);
  });

  it("should work with short durations", async () => {
    const startTime = Date.now();
    await sleep(1);
    const endTime = Date.now();

    expect(endTime - startTime).toBeGreaterThanOrEqual(0);
  });

  it("should work with longer durations", async () => {
    const startTime = Date.now();
    await sleep(200);
    const endTime = Date.now();

    expect(endTime - startTime).toBeGreaterThanOrEqual(195);
    expect(endTime - startTime).toBeLessThan(300);
  });
});
