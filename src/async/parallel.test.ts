import { describe, it, expect } from "vitest";
import { parallel } from "./parallel.js";

describe("parallel", () => {
  it("should execute all tasks and return all results", async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3),
      () => Promise.resolve(4),
    ];

    const results = await parallel(tasks, 2);

    expect(results).toHaveLength(4);
    expect(results).toContain(1);
    expect(results).toContain(2);
    expect(results).toContain(3);
    expect(results).toContain(4);
  });

  it("should return results in order of completion", async () => {
    const tasks = [
      () =>
        new Promise<string>((resolve) =>
          setTimeout(() => resolve("slow"), 100),
        ),
      () =>
        new Promise<string>((resolve) => setTimeout(() => resolve("fast"), 10)),
      () =>
        new Promise<string>((resolve) =>
          setTimeout(() => resolve("medium"), 50),
        ),
    ];

    const results = await parallel(tasks, 3);

    expect(results).toHaveLength(3);
  });

  it("should handle concurrency of 1", async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3),
    ];

    const results = await parallel(tasks, 1);

    expect(results).toEqual([1, 2, 3]);
  });

  it("should handle empty task array", async () => {
    const results = await parallel([], 2);

    expect(results).toEqual([]);
  });

  it("should handle concurrency larger than task count", async () => {
    const tasks = [() => Promise.resolve(1), () => Promise.resolve(2)];

    const results = await parallel(tasks, 10);

    expect(results).toHaveLength(2);
    expect(results).toContain(1);
    expect(results).toContain(2);
  });

  it("should handle rejected promises", async () => {
    const tasks = [() => Promise.reject(new Error("Task failed"))];

    await expect(parallel(tasks, 2)).rejects.toThrow("Task failed");
  });

  it("should execute multiple tasks successfully", async () => {
    const tasks = [
      () => Promise.resolve(10),
      () => Promise.resolve(20),
      () => Promise.resolve(30),
      () => Promise.resolve(40),
      () => Promise.resolve(50),
    ];

    const results = await parallel(tasks, 2);

    expect(results).toHaveLength(5);
    expect(results).toContain(10);
    expect(results).toContain(20);
    expect(results).toContain(30);
    expect(results).toContain(40);
    expect(results).toContain(50);
  });
});
