# Function Utilities

Functions for controlling function execution and performance optimization.

## compose

Composes multiple functions from right to left. The output of each function is passed as input to the previous function.

### Signature

```typescript
function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T;
```

### Parameters

- `fns` - Functions to compose (executed right to left)

### Returns

A new function that represents the composition of the input functions.

### Example

```typescript
import { compose } from "jalutils/function";

// Simple transformations
const addTen = (x: number) => x + 10;
const multiplyByTwo = (x: number) => x * 2;
const subtractFive = (x: number) => x - 5;

const calculate = compose(subtractFive, multiplyByTwo, addTen);
console.log(calculate(5)); // 25
// Execution: addTen(5) → 15, multiplyByTwo(15) → 30, subtractFive(30) → 25

// String transformations
const trim = (s: string) => s.trim();
const uppercase = (s: string) => s.toUpperCase();
const addExclamation = (s: string) => s + "!";

const shout = compose(addExclamation, uppercase, trim);
console.log(shout("  hello  ")); // "HELLO!"
```

### Use Cases

- **Data transformation pipelines**: Chain multiple transformations
- **Functional programming**: Build complex operations from simple ones
- **Middleware patterns**: Process data through multiple stages

### Notes

- Functions are executed from right to left
- Each function must accept and return the same type
- For left-to-right execution, use `pipe` instead
- TypeScript ensures type compatibility across the chain

---

## curry

Transforms a function with multiple arguments into a sequence of functions, each taking a single argument.

### Signature

```typescript
function curry<F extends (...args: any[]) => any>(fn: F): CurriedFunction<F>;
```

### Parameters

- `fn` - The function to curry

### Returns

A curried version of the function that can be called with one argument at a time.

### Example

```typescript
import { curry } from "jalutils/function";

// Basic currying
const add = (a: number, b: number, c: number) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6

// String formatting
const format = (template: string, name: string, age: number) =>
  template.replace("{name}", name).replace("{age}", String(age));

const curriedFormat = curry(format);
const greet = curriedFormat("Hello {name}, you are {age} years old");

console.log(greet("Alice")(30)); // "Hello Alice, you are 30 years old"
console.log(greet("Bob", 25)); // "Hello Bob, you are 25 years old"

// Partial application
const multiply = (a: number, b: number, c: number) => a * b * c;
const curriedMultiply = curry(multiply);
const double = curriedMultiply(2);
const quadruple = double(2);

console.log(quadruple(5)); // 20
```

### Use Cases

- **Partial application**: Create specialized functions from general ones
- **Functional composition**: Build complex operations incrementally
- **Configuration**: Pre-configure functions with default values
- **Reusability**: Create function variants without repetition

### Notes

- Allows calling with any number of arguments at each step
- Once all arguments are provided, the original function is executed
- TypeScript preserves full type safety throughout the currying chain
- Works with functions of any arity

---

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

## flow

Provides flexible function composition with configurable direction (left-to-right or right-to-left).

### Signature

```typescript
function flow<T>(
  direction: "left" | "right",
  ...fns: Array<(arg: T) => T>
): (arg: T) => T;
```

### Parameters

- `direction` - Execution direction: `"left"` for left-to-right, `"right"` for right-to-left
- `fns` - Functions to compose

### Returns

A new function that executes the input functions in the specified direction.

### Example

```typescript
import { flow } from "jalutils/function";

// Left-to-right flow
const addOne = (x: number) => x + 1;
const double = (x: number) => x * 2;
const square = (x: number) => x * x;

const leftFlow = flow("left", addOne, double, square);
console.log(leftFlow(2)); // 36
// Execution: addOne(2) → 3, double(3) → 6, square(6) → 36

// Right-to-left flow
const rightFlow = flow("right", addOne, double, square);
console.log(rightFlow(2)); // 5
// Execution: square(2) → 4, double(4) → 8, addOne(8) → 9

// String processing with left flow
const trim = (s: string) => s.trim();
const lowercase = (s: string) => s.toLowerCase();
const removeSpaces = (s: string) => s.replace(/\s+/g, "");

const normalize = flow("left", trim, lowercase, removeSpaces);
console.log(normalize("  Hello World  ")); // "helloworld"
```

### Use Cases

- **Flexible pipelines**: Choose execution direction based on context
- **Dynamic composition**: Switch between left and right composition
- **Adapting to conventions**: Match team or library conventions

### Notes

- `"left"` direction internally uses `pipe` (left-to-right)
- `"right"` direction internally uses `compose` (right-to-left)
- All functions must accept and return the same type
- TypeScript ensures type safety across the composition

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

## once

Ensures a function can only be executed once. Subsequent calls return the cached result from the first execution.

### Signature

```typescript
function once<T extends (...args: unknown[]) => unknown>(fn: T): T;
```

### Parameters

- `fn` - The function to execute only once

### Returns

A wrapped function that executes only on the first call and returns the cached result thereafter.

### Example

```typescript
import { once } from "jalutils/function";

// Expensive initialization
const initialize = once(() => {
  console.log("Initializing...");
  return { status: "ready" };
});

console.log(initialize()); // Logs "Initializing...", returns { status: "ready" }
console.log(initialize()); // Returns { status: "ready" } (no log)
console.log(initialize()); // Returns { status: "ready" } (no log)

// Database connection
const connectDB = once(() => {
  console.log("Connecting to database...");
  return { connection: "active" };
});

const db1 = connectDB(); // Logs "Connecting to database..."
const db2 = connectDB(); // Returns same connection, no log

// Event listener setup
const setupListeners = once(() => {
  console.log("Setting up listeners");
  window.addEventListener("resize", () => console.log("resized"));
});

setupListeners(); // Sets up listeners
setupListeners(); // Does nothing
```

### Use Cases

- **Initialization**: Ensure setup code runs exactly once
- **Singleton pattern**: Create single instances
- **Event listeners**: Prevent duplicate listener registration
- **Expensive operations**: Cache results of one-time computations
- **Configuration loading**: Load config only once

### Notes

- The result of the first call is cached permanently
- Subsequent calls ignore any arguments passed
- Works with synchronous and asynchronous functions
- TypeScript preserves the function signature
- No way to reset or re-execute the function

---

## partial

Creates a new function with some arguments pre-filled, allowing partial application of function arguments.

### Signature

```typescript
function partial<T extends unknown[], U>(
  fn: (...args: T) => U,
  ...presetArgs: Partial<T>
): (...laterArgs: Partial<T>) => U;
```

### Parameters

- `fn` - The function to partially apply
- `presetArgs` - Arguments to pre-fill

### Returns

A new function that accepts the remaining arguments.

### Example

```typescript
import { partial } from "jalutils/function";

// Basic partial application
const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
const sayHello = partial(greet, "Hello");

console.log(sayHello("Alice")); // "Hello, Alice!"
console.log(sayHello("Bob")); // "Hello, Bob!"

// Multiple arguments
const multiply = (a: number, b: number, c: number) => a * b * c;
const multiplyBy2 = partial(multiply, 2);
const multiplyBy2And3 = partial(multiply, 2, 3);

console.log(multiplyBy2(3, 4)); // 24
console.log(multiplyBy2And3(5)); // 30

// API client configuration
const fetchData = (baseUrl: string, endpoint: string, params: string) =>
  `${baseUrl}/${endpoint}?${params}`;

const apiClient = partial(fetchData, "https://api.example.com");
const usersAPI = partial(fetchData, "https://api.example.com", "users");

console.log(apiClient("posts", "page=1")); // "https://api.example.com/posts?page=1"
console.log(usersAPI("id=123")); // "https://api.example.com/users?id=123"
```

### Use Cases

- **Configuration**: Pre-configure functions with common arguments
- **API clients**: Create specialized clients from generic functions
- **Event handlers**: Bind context or data to handlers
- **Reusability**: Create function variants without duplication

### Notes

- Pre-filled arguments are applied in order
- Throws an error if not enough arguments are provided
- TypeScript maintains type safety for preset and later arguments
- Arguments must be defined (not `undefined`) to be considered preset

---

## pipe

Composes multiple functions from left to right. The output of each function is passed as input to the next function.

### Signature

```typescript
function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T;
```

### Parameters

- `fns` - Functions to pipe (executed left to right)

### Returns

A new function that represents the piped composition of the input functions.

### Example

```typescript
import { pipe } from "jalutils/function";

// Simple transformations
const addTen = (x: number) => x + 10;
const multiplyByTwo = (x: number) => x * 2;
const subtractFive = (x: number) => x - 5;

const calculate = pipe(addTen, multiplyByTwo, subtractFive);
console.log(calculate(5)); // 25
// Execution: addTen(5) → 15, multiplyByTwo(15) → 30, subtractFive(30) → 25

// String processing
const trim = (s: string) => s.trim();
const lowercase = (s: string) => s.toLowerCase();
const replaceSpaces = (s: string) => s.replace(/\s+/g, "-");

const slugify = pipe(trim, lowercase, replaceSpaces);
console.log(slugify("  Hello World  ")); // "hello-world"

// Data transformation
const parseJSON = (s: string) => JSON.parse(s);
const extractName = (obj: any) => obj.name;
const uppercase = (s: string) => s.toUpperCase();

const processData = pipe(parseJSON, extractName, uppercase);
console.log(processData('{"name":"alice"}')); // "ALICE"
```

### Use Cases

- **Data pipelines**: Chain transformations in reading order
- **Functional programming**: Build complex operations from simple ones
- **Stream processing**: Process data through sequential stages

### Notes

- Functions are executed from left to right
- Each function must accept and return the same type
- More intuitive than `compose` for most developers
- TypeScript ensures type compatibility across the chain

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

## Import

::: code-group

```typescript [Category Import (Recommended)]
import {
  compose,
  curry,
  debounce,
  flow,
  memoize,
  once,
  partial,
  pipe,
  throttle,
} from "jalutils/function";
```

```typescript [Named Import]
import {
  compose,
  curry,
  debounce,
  flow,
  memoize,
  once,
  partial,
  pipe,
  throttle,
} from "jalutils";
```

:::
