// Retry failed async function with configurable attempts

import { sleep } from "../async/sleep.js";

export interface RetryOptions {
  attempts?: number; // Number of attempts (default: 3)
  delayMs?: number; // Delay between attempts in milliseconds (default: 0)
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const attempts = options.attempts ?? 3;
  const delayMs = options.delayMs ?? 0;

  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < attempts && delayMs > 0) {
        await sleep(delayMs);
      }
    }
  }

  throw lastError;
}
