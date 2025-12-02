# jalutils

[![npm version](https://img.shields.io/npm/v/jalutils.svg)](https://www.npmjs.com/package/jalutils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A collection of utility functions for JavaScript and TypeScript. Lightweight, tree-shakeable, and fully typed.

## Installation

```bash
npm install jalutils
```

```bash
pnpm add jalutils
```

```bash
yarn add jalutils
```

## Features

- 🎯 **TypeScript First**: Written in TypeScript with full type definitions
- 🌳 **Tree-shakeable**: Import only what you need
- 📦 **Zero Dependencies**: No external dependencies
- ⚡ **Lightweight**: Minimal bundle size impact
- 🧪 **Well Tested**: Comprehensive test coverage
- 📚 **Modular**: Import specific categories or individual functions

## Usage

### Import Everything

```typescript
import { debounce, flatten, isNil, unix } from "jalutils";
```

### Import by Category

```typescript
import { debounce, throttle, memoize } from "jalutils/function";
import { flatten, intersection, union } from "jalutils/array";
import { isNil, isNull, isUndefined } from "jalutils/type";
import { unix } from "jalutils/date";
import { capitalize } from "jalutils/string";
```

## API Reference

### Array

#### `flatten<T>(array: T[]): T[]`

Recursively flattens a nested array.

```typescript
import { flatten } from "jalutils/array";

flatten([1, [2, [3, 4], 5]]); // [1, 2, 3, 4, 5]
```

#### `intersection<T>(...arrays: T[][]): T[]`

Returns an array of unique values that are present in all given arrays.

```typescript
import { intersection } from "jalutils/array";

intersection([1, 2, 3], [2, 3, 4], [2, 3, 5]); // [2, 3]
```

#### `union<T>(...arrays: T[][]): T[]`

Returns an array of unique values from all given arrays.

```typescript
import { union } from "jalutils/array";

union([1, 2], [2, 3], [3, 4]); // [1, 2, 3, 4]
```

#### `randomFromArray<T>(array: T[]): T`

Returns a random element from an array.

```typescript
import { randomFromArray } from "jalutils/array";

randomFromArray([1, 2, 3, 4, 5]); // Random element from the array
```

### Function

#### `debounce<T>(func: T, wait: number): (...args: Parameters<T>) => void`

Creates a debounced function that delays invoking `func` until after `wait` milliseconds have elapsed since the last time it was invoked.

```typescript
import { debounce } from "jalutils/function";

const debouncedSearch = debounce((query: string) => {
  console.log("Searching for:", query);
}, 300);

debouncedSearch("hello"); // Will only execute after 300ms of no calls
```

#### `throttle<T>(func: T, wait: number): (...args: Parameters<T>) => void`

Creates a throttled function that only invokes `func` at most once per every `wait` milliseconds.

```typescript
import { throttle } from "jalutils/function";

const throttledScroll = throttle(() => {
  console.log("Scroll event handled");
}, 100);

window.addEventListener("scroll", throttledScroll);
```

#### `memoize<T>(func: T): (...args: Parameters<T>) => ReturnType<T>`

Creates a memoized function that caches the result of `func` based on its arguments.

```typescript
import { memoize } from "jalutils/function";

const expensiveCalculation = memoize((n: number) => {
  return n * n;
});

expensiveCalculation(5); // Calculates and caches
expensiveCalculation(5); // Returns cached result
```

### Type

#### `isNil(value: unknown): value is null | undefined`

Checks if a value is `null` or `undefined`.

```typescript
import { isNil } from "jalutils/type";

isNil(null); // true
isNil(undefined); // true
isNil(0); // false
isNil(""); // false
```

#### `isNull(value: unknown): value is null`

Checks if a value is `null`.

```typescript
import { isNull } from "jalutils/type";

isNull(null); // true
isNull(undefined); // false
```

#### `isUndefined(value: unknown): value is undefined`

Checks if a value is `undefined`.

```typescript
import { isUndefined } from "jalutils/type";

isUndefined(undefined); // true
isUndefined(null); // false
```

### Date

#### `unix(date: Date | string | number): number`

Converts a date to Unix timestamp (seconds since epoch).

```typescript
import { unix } from "jalutils/date";

unix(new Date("2024-01-01")); // 1704067200
unix("2024-01-01"); // 1704067200
unix(1704067200000); // 1704067200 (converts milliseconds to seconds)
```

### String

#### `capitalize(str: string): string`

Capitalizes the first alphabetic character of a string. Handles leading spaces intelligently.

```typescript
import { capitalize } from "jalutils/string";

capitalize("hello"); // 'Hello'
capitalize("hello world"); // 'Hello world'
capitalize("  hello"); // '  Hello'
capitalize("123abc"); // '123abc' (no change, first char not alphabetic)
```

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build
pnpm build

# Run demo/dev server
pnpm dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Jalu Wibowo Aji](https://jaluwibowo.id)

## Author

**Jalu Wibowo Aji**

- Website: [jaluwibowo.id](https://jaluwibowo.id)
- Email: jaluwibowoaji@gmail.com
- GitHub: [@jarooda](https://github.com/jarooda)

## Repository

[https://github.com/jarooda/jalutils](https://github.com/jarooda/jalutils)
