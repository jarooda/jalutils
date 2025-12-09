# Async Utilities

Utilities for working with asynchronous operations, promises, and concurrency control.

## parallel

Executes multiple async tasks with a specified concurrency limit, controlling how many tasks run simultaneously.

### Signature

```typescript
function parallel<T>(
  tasks: Array<() => Promise<T>>,
  concurrency: number,
): Promise<T[]>;
```

### Parameters

- `tasks` - Array of functions that return promises
- `concurrency` - Maximum number of tasks to run concurrently

### Returns

Promise that resolves to an array of results from all tasks.

### Example

```typescript
import { parallel } from "jalutils/async";

const tasks = [
  () => fetch("/api/user/1").then((r) => r.json()),
  () => fetch("/api/user/2").then((r) => r.json()),
  () => fetch("/api/user/3").then((r) => r.json()),
  () => fetch("/api/user/4").then((r) => r.json()),
];

// Only 2 requests will run at the same time
const results = await parallel(tasks, 2);
```

## retry

Retries a failed async function with configurable attempts and delay between retries.

### Signature

```typescript
interface RetryOptions {
  attempts?: number; // Default: 3
  delayMs?: number; // Default: 0
}

function retry<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T>;
```

### Parameters

- `fn` - Async function to retry on failure
- `options` - Configuration object:
  - `attempts` - Number of retry attempts (default: 3)
  - `delayMs` - Delay between retries in milliseconds (default: 0)

### Returns

Promise that resolves with the function result or rejects after all attempts fail.

### Example

```typescript
import { retry } from "jalutils/async";

// Retry up to 3 times with no delay
const data = await retry(() => fetch("/api/data").then((r) => r.json()));

// Retry 5 times with 1 second delay between attempts
const result = await retry(() => unstableApiCall(), {
  attempts: 5,
  delayMs: 1000,
});
```

## sleep

Creates a promise that resolves after a specified number of milliseconds, useful for adding delays in async code.

### Signature

```typescript
function sleep(ms: number): Promise<void>;
```

### Parameters

- `ms` - Number of milliseconds to sleep

### Returns

Promise that resolves after the specified time.

### Example

```typescript
import { sleep } from "jalutils/async";

async function processWithDelay() {
  console.log("Starting...");
  await sleep(1000);
  console.log("After 1 second");
  await sleep(2000);
  console.log("After 3 seconds total");
}

// Add delay between retries
for (let i = 0; i < 3; i++) {
  await tryOperation();
  await sleep(500); // Wait 500ms before next attempt
}
```

## timeout

Wraps a promise with a timeout, rejecting if the promise doesn't resolve within the specified time limit.

### Signature

```typescript
function timeout<T>(promise: Promise<T>, ms: number): Promise<T>;
```

### Parameters

- `promise` - Promise to wrap with timeout
- `ms` - Timeout duration in milliseconds

### Returns

Promise that resolves with the original value or rejects with a timeout error.

### Example

```typescript
import { timeout } from "jalutils/async";

// Fail if request takes longer than 5 seconds
try {
  const data = await timeout(
    fetch("/api/slow-endpoint").then((r) => r.json()),
    5000,
  );
} catch (error) {
  console.error("Request timed out");
}

// Combine with other utilities
const result = await timeout(
  retry(() => fetch("/api/data").then((r) => r.json())),
  10000,
);
```

## Import

::: code-group

```typescript [Category Import (Recommended)]
import { parallel, retry, sleep, timeout } from "jalutils/async";
```

```typescript [Named Import]
import { parallel, retry, sleep, timeout } from "jalutils";
```

:::

```

```
