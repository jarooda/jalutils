# Usage

Learn how to import and use Jalutils functions in your project.

## Import Methods

Jalutils supports multiple import patterns to fit your needs.

### Import Everything

Import all utilities from the main entry point:

```typescript
import { debounce, flatten, isNil, unix, capitalize } from "jalutils";
```

This is convenient but may include more code than needed if you're only using a few functions.

### Import by Category

For better tree-shaking, import from specific categories:

```typescript
// Function utilities
import { debounce, throttle, memoize } from "jalutils/function";

// Array utilities
import { flatten, intersection, union, sample } from "jalutils/array";

// Type utilities
import { isNil, isNull, isUndefined } from "jalutils/type";

// Date utilities
import { unix } from "jalutils/date";

// String utilities
import { capitalize } from "jalutils/string";
```

**Recommended**: This approach ensures optimal bundle size.

## Common Use Cases

### Debouncing User Input

```typescript
import { debounce } from 'jalutils/function';

const handleSearch = debounce((query: string) => {
  // API call or search logic
  fetchResults(query);
}, 300);

// In your component
<input onChange={(e) => handleSearch(e.target.value)} />
```

### Working with Arrays

```typescript
import { flatten, intersection, union } from "jalutils/array";

// Flatten nested arrays
const nested = [1, [2, [3, [4]]]];
const flat = flatten(nested); // [1, 2, 3, 4]

// Find common elements
const common = intersection([1, 2, 3], [2, 3, 4], [3, 4, 5]); // [3]

// Combine arrays uniquely
const combined = union([1, 2], [2, 3], [3, 4]); // [1, 2, 3, 4]
```

### Type Checking

```typescript
import { isNil, isNull, isUndefined } from "jalutils/type";

function processValue(value: unknown) {
  if (isNil(value)) {
    console.log("Value is null or undefined");
    return;
  }

  // TypeScript knows value is not null/undefined here
  console.log(value.toString());
}
```

### Date Handling

```typescript
import { unix } from "jalutils/date";

const timestamp = unix(new Date()); // Unix timestamp in seconds
const fromString = unix("2025-12-04"); // Convert from string
const fromTimestamp = unix(1733270400000); // Convert from milliseconds
```

### String Manipulation

```typescript
import { capitalize } from "jalutils/string";

const title = capitalize("hello world"); // "Hello world"
```

## TypeScript Support

All functions come with full type definitions:

```typescript
import { debounce } from "jalutils/function";

// TypeScript infers the correct types
const debouncedFn = debounce((name: string, age: number) => {
  console.log(`${name} is ${age} years old`);
}, 1000);

// Type checking works
debouncedFn("John", 30); // ✓ OK
debouncedFn("John", "30"); // ✗ Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

## Best Practices

### 1. Import Only What You Need

```typescript
// ✓ Good - specific imports
import { debounce } from "jalutils/function";

// ✗ Avoid - importing everything when you only need one function
import * as jalutils from "jalutils";
```

### 2. Use Category Imports

```typescript
// ✓ Better tree-shaking
import { flatten, intersection } from "jalutils/array";

// ✓ Also acceptable
import { flatten, intersection } from "jalutils";
```

### 3. Leverage TypeScript

```typescript
import { isNil } from "jalutils/type";

function example(value: string | null | undefined) {
  if (isNil(value)) {
    return;
  }

  // TypeScript narrows the type to 'string' here
  return value.toUpperCase();
}
```

## Next Steps

Explore the [API Reference](/api/) for detailed documentation on all available utilities.
