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

## Docs

Read the full docs and API reference on [here](https://jalutils.jaluwibowo.id)

## Usage

### Import Everything

```typescript
import { debounce, flatten, isNil, unix } from "jalutils";
```

### Import by Category

```typescript
import { debounce, throttle } from "jalutils/function";
```

### Examples

#### Debouncing Search Input

```typescript
import { debounce } from "jalutils/function";

// Debounce search to avoid excessive API calls
const searchProducts = debounce((query: string) => {
  fetch(`/api/search?q=${query}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
}, 300);

// In your component
searchInput.addEventListener("input", (e) => {
  searchProducts(e.target.value);
});
```

#### Working with Arrays and Type Checking

```typescript
import { flatten, intersection } from "jalutils/array";
import { isNil } from "jalutils/type";

// Flatten nested data structures
const categories = [
  ["electronics", ["phones", "laptops"]],
  ["clothing", ["shirts", "pants"]],
];
const allCategories = flatten(categories);
// ['electronics', 'phones', 'laptops', 'clothing', 'shirts', 'pants']

// Find common elements
const userTags = ["javascript", "typescript", "react"];
const jobTags = ["typescript", "react", "node"];
const matchingSkills = intersection(userTags, jobTags);
// ['typescript', 'react']

// Safe property access
function getUserEmail(user: { email?: string } | null) {
  if (isNil(user) || isNil(user.email)) {
    return "no-email@example.com";
  }
  return user.email;
}
```

## API Reference

### Array

| Function       | Signature                                | Description                                |
| -------------- | ---------------------------------------- | ------------------------------------------ |
| `flatten`      | `flatten<T>(array: T[]): T[]`            | Flattens nested arrays into a single array |
| `intersection` | `intersection<T>(...arrays: T[][]): T[]` | Returns values present in all arrays       |
| `union`        | `union<T>(...arrays: T[][]): T[]`        | Combines arrays into unique values         |
| `sample`       | `sample<T>(array: T[]): T`               | Returns a random element from an array     |

### Function

| Function   | Signature                                                              | Description                                                 |
| ---------- | ---------------------------------------------------------------------- | ----------------------------------------------------------- |
| `debounce` | `debounce<T>(func: T, wait: number): (...args: Parameters<T>) => void` | Delays function execution until after a specified wait time |
| `throttle` | `throttle<T>(func: T, wait: number): (...args: Parameters<T>) => void` | Limits function execution to once per specified interval    |
| `memoize`  | `memoize<T>(func: T): (...args: Parameters<T>) => ReturnType<T>`       | Caches function results based on arguments                  |

### Type

| Function      | Signature                                           | Description                                |
| ------------- | --------------------------------------------------- | ------------------------------------------ |
| `isNil`       | `isNil(value: unknown): value is null \| undefined` | Checks if a value is `null` or `undefined` |
| `isNull`      | `isNull(value: unknown): value is null`             | Checks if a value is `null`                |
| `isUndefined` | `isUndefined(value: unknown): value is undefined`   | Checks if a value is `undefined`           |

### Date

| Function | Signature                                      | Description                                             |
| -------- | ---------------------------------------------- | ------------------------------------------------------- |
| `unix`   | `unix(date: Date \| string \| number): number` | Converts a date to Unix timestamp (seconds since epoch) |

### String

| Function     | Signature                         | Description                              |
| ------------ | --------------------------------- | ---------------------------------------- |
| `capitalize` | `capitalize(str: string): string` | Capitalizes the first letter of a string |

## Development

```bash
pnpm install  # Install dependencies
pnpm test     # Run tests
pnpm build    # Build package
pnpm dev      # Run development server
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
