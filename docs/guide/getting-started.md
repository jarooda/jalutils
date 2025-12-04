# Getting Started

Welcome to **Jalutils** - a collection of utility functions designed to make JavaScript and TypeScript development faster and more enjoyable.

## What is Jalutils?

Jalutils is a lightweight utility library that provides commonly needed functions for working with arrays, functions, types, dates, and strings. It's built with modern development in mind:

- **TypeScript First**: Full type safety and IntelliSense support
- **Tree-shakeable**: Only import what you need
- **Zero Dependencies**: No bloat, just pure utilities
- **Well Tested**: Comprehensive test coverage for reliability

## Quick Example

```typescript
import { debounce, flatten, isNil } from "jalutils";

// Debounce a search function
const debouncedSearch = debounce((query: string) => {
  console.log("Searching for:", query);
}, 300);

// Flatten nested arrays
const nested = [1, [2, [3, [4]]]];
const flat = flatten(nested); // [1, 2, 3, 4]

// Type checking
if (!isNil(value)) {
  // value is neither null nor undefined
  console.log(value);
}
```

## Why Jalutils?

### Lightweight

Every function is optimized for size and performance. Tree-shaking ensures you only bundle what you use.

### Type Safe

Full TypeScript support means fewer runtime errors and better developer experience.

### Production Ready

Thoroughly tested and used in production environments.

## Next Steps

- [Install Jalutils](/guide/installation) in your project
- Learn about [basic usage](/guide/usage)
- Explore the [API reference](/api/array)
