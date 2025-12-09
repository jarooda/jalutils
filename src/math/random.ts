import { clamp } from "./clamp.js";

export function random(min: number = 0, max: number = 999): number {
  const clampedMin = Math.min(min, max);
  const clampedMax = Math.max(min, max);
  const finalMax = clamp(clampedMax, clampedMin, clampedMin + 1_000_000_000);

  return Math.floor(Math.random() * (finalMax - clampedMin + 1)) + clampedMin;
}
