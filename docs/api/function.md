# Function Utilities

Functions for controlling function execution and performance optimization.

## debounce

Delays function execution until after a specified wait time has elapsed since the last time it was invoked. Perfect for handling rapid events like typing, scrolling, or resizing.

### Signature

```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void;
```

### Parameters

- `func` - The function to debounce
- `wait` - The number of milliseconds to delay

### Returns

A debounced version of the function that delays execution.

### Example

```typescript
import { debounce } from "jalutils/function";

// Search input handler
const handleSearch = debounce((query: string) => {
  console.log("Searching for:", query);
  // API call here
}, 300);

// User types: "hello"
handleSearch("h"); // Cancelled
handleSearch("he"); // Cancelled
handleSearch("hel"); // Cancelled
handleSearch("hell"); // Cancelled
handleSearch("hello"); // Executes after 300ms

// Window resize handler
const handleResize = debounce(() => {
  console.log("Window resized");
  // Expensive recalculation here
}, 500);

window.addEventListener("resize", handleResize);

// Form validation
const validateEmail = debounce((email: string) => {
  if (email.includes("@")) {
    console.log("Valid email");
  }
}, 250);
```

### Use Cases

- **Search inputs**: Wait until user stops typing before making API calls
- **Form validation**: Validate after user finishes input
- **Window resize**: Perform expensive calculations only after resizing stops
- **Auto-save**: Save draft only after user stops editing

### Notes

- Resets the timer on each call
- Only executes the function after the specified wait time with no new calls
- The debounced function does not return a value
- TypeScript preserves the parameter types of the original function

---

## throttle

Limits function execution to once per specified time interval. Unlike debounce, throttle ensures the function is called at regular intervals during continuous events.

### Signature

```typescript
function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void;
```

### Parameters

- `func` - The function to throttle
- `wait` - The number of milliseconds between allowed executions

### Returns

A throttled version of the function.

### Example

```typescript
import { throttle } from "jalutils/function";

// Scroll event handler
const handleScroll = throttle(() => {
  console.log("Scroll position:", window.scrollY);
  // Update scroll indicator
}, 100);

window.addEventListener("scroll", handleScroll);

// Mouse move tracker
const trackMouse = throttle((e: MouseEvent) => {
  console.log(`Position: ${e.clientX}, ${e.clientY}`);
}, 50);

document.addEventListener("mousemove", trackMouse);

// Button click protection
const submitForm = throttle(() => {
  console.log("Form submitted");
  // API call
}, 1000);

// API polling
const checkStatus = throttle(() => {
  fetch("/api/status")
    .then((res) => res.json())
    .then((data) => console.log(data));
}, 5000);
```

### Use Cases

- **Scroll events**: Update UI during scrolling without overwhelming performance
- **Mouse tracking**: Track mouse position at regular intervals
- **Button clicks**: Prevent multiple rapid submissions
- **API polling**: Regular status checks without overwhelming the server
- **Game loops**: Limit frame rate or update frequency

### Debounce vs Throttle

| Aspect        | Debounce                      | Throttle                       |
| ------------- | ----------------------------- | ------------------------------ |
| **Execution** | After inactivity period       | At regular intervals           |
| **Frequency** | Once after events stop        | Multiple times during events   |
| **Use case**  | Search input, form validation | Scroll, mouse move, animations |

### Notes

- Executes immediately on first call, then enforces the wait period
- Subsequent calls within the wait period are ignored
- Does not queue or batch function calls
- TypeScript preserves the parameter types of the original function

---

## memoize

Caches function results based on arguments, improving performance for expensive computations with repeated inputs.

### Signature

```typescript
function memoize<T extends (...args: any[]) => any>(
  func: T,
): (...args: Parameters<T>) => ReturnType<T>;
```

### Parameters

- `func` - The function to memoize

### Returns

A memoized version of the function that caches results.

### Example

```typescript
import { memoize } from "jalutils/function";

// Expensive calculation
const fibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // Slow first time
console.log(fibonacci(40)); // Instant (cached)

// API data fetching
const fetchUser = memoize(async (userId: number) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

await fetchUser(1); // Makes API call
await fetchUser(1); // Returns cached result

// Complex object transformation
const processData = memoize((data: string) => {
  console.log("Processing...");
  return data.split(",").map((item) => item.trim().toUpperCase());
});

processData("apple,banana,cherry"); // Logs "Processing..."
processData("apple,banana,cherry"); // Instant (cached, no log)

// With multiple arguments
const multiply = memoize((a: number, b: number) => {
  console.log(`Computing ${a} * ${b}`);
  return a * b;
});

multiply(5, 3); // Logs "Computing 5 * 3", returns 15
multiply(5, 3); // Returns 15 (cached, no log)
multiply(5, 4); // Logs "Computing 5 * 4", returns 20
```

### Use Cases

- **Recursive algorithms**: Fibonacci, factorial, dynamic programming
- **API calls**: Cache responses for repeated requests
- **Data transformations**: Avoid reprocessing the same data
- **Heavy computations**: Mathematical operations, parsing, formatting

### Cache Key

The cache key is created by JSON stringifying the arguments:

- `func(1, 2)` → cache key: `"[1,2]"`
- `func("test")` → cache key: `"["test"]"`

### Notes

- Cache persists for the lifetime of the memoized function
- Works with any number and type of arguments
- Cache size is unlimited (consider memory for long-running applications)
- Arguments are compared using JSON serialization
- Not suitable for functions with non-serializable arguments (functions, symbols, etc.)
- TypeScript preserves both parameter and return types

---

## Import

::: code-group

```typescript [Category Import (Recommended)]
import { debounce, throttle, memoize } from "jalutils/function";
```

```typescript [Named Import]
import { debounce, throttle, memoize } from "jalutils";
```

:::
