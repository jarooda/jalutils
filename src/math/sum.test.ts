import { describe, expect, it } from "vitest";
import { sum } from "./sum";

describe("sum", () => {
  it("should return 0 for empty array", () => {
    expect(sum()).toBe(0);
  });

  it("should return the value itself for a single number", () => {
    expect(sum(5)).toBe(5);
    expect(sum(0)).toBe(0);
    expect(sum(-10)).toBe(-10);
  });

  it("should calculate sum of multiple positive numbers", () => {
    expect(sum(1, 2, 3, 4, 5)).toBe(15);
    expect(sum(10, 20, 30)).toBe(60);
    expect(sum(2, 4, 6, 8)).toBe(20);
  });

  it("should calculate sum of negative numbers", () => {
    expect(sum(-1, -2, -3, -4, -5)).toBe(-15);
    expect(sum(-10, -20, -30)).toBe(-60);
  });

  it("should calculate sum of mixed positive and negative numbers", () => {
    expect(sum(-5, 5)).toBe(0);
    expect(sum(-10, 0, 10)).toBe(0);
    expect(sum(-2, 4, 6)).toBe(8);
    expect(sum(10, -3, 5, -2)).toBe(10);
  });

  it("should handle decimal numbers", () => {
    expect(sum(1.5, 2.5, 3.5)).toBe(7.5);
    expect(sum(0.1, 0.2, 0.3)).toBeCloseTo(0.6, 10);
  });

  it("should handle large numbers", () => {
    expect(sum(1000000, 2000000, 3000000)).toBe(6000000);
  });

  it("should handle very small numbers", () => {
    expect(sum(0.001, 0.002, 0.003)).toBeCloseTo(0.006, 10);
  });

  it("should handle two numbers", () => {
    expect(sum(10, 20)).toBe(30);
    expect(sum(5, 15)).toBe(20);
  });

  it("should handle zeros in the array", () => {
    expect(sum(0, 0, 0)).toBe(0);
    expect(sum(0, 5, 10)).toBe(15);
    expect(sum(10, 0, 5, 0)).toBe(15);
  });

  it("should sum many numbers", () => {
    expect(sum(1, 1, 1, 1, 1, 1, 1, 1, 1, 1)).toBe(10);
  });

  it("should handle mix of integers and decimals", () => {
    expect(sum(1, 2.5, 3, 4.5)).toBe(11);
  });
});
