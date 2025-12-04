# Array Utilities

Functions for working with arrays in JavaScript and TypeScript.

## flatten

Flattens nested arrays into a single-level array.

### Signature

```typescript
function flatten<T>(array: T[]): T[];
```

### Parameters

- `array` - The array to flatten (can contain nested arrays at any depth)

### Returns

A new flattened array containing all elements from the input array and its nested arrays.

### Example

```typescript
import { flatten } from "jalutils/array";

// Basic usage
const nested = [1, [2, [3, [4]]]];
const flat = flatten(nested);
console.log(flat); // [1, 2, 3, 4]

// With mixed types
const mixed = [1, [2, 3], [[4, 5]], [[[6]]]];
console.log(flatten(mixed)); // [1, 2, 3, 4, 5, 6]

// Empty arrays are handled
const withEmpty = [1, [], [2, []], 3];
console.log(flatten(withEmpty)); // [1, 2, 3]
```

### Notes

- Flattens arrays to any depth recursively
- Preserves the order of elements
- Returns a new array (does not mutate the original)

---

## intersection

Returns an array of unique values that are present in all provided arrays.

### Signature

```typescript
function intersection<T>(...arrays: T[][]): T[];
```

### Parameters

- `...arrays` - Two or more arrays to compare

### Returns

A new array containing only the values that appear in all input arrays.

### Example

```typescript
import { intersection } from "jalutils/array";

// Basic usage
const result = intersection([1, 2, 3], [2, 3, 4], [3, 4, 5]);
console.log(result); // [3]

// With strings
const common = intersection(
  ["apple", "banana", "cherry"],
  ["banana", "cherry", "date"],
  ["cherry", "elderberry"],
);
console.log(common); // ['cherry']

// Two arrays
const shared = intersection([1, 2, 3], [2, 3, 4]);
console.log(shared); // [2, 3]

// No common elements
const none = intersection([1, 2], [3, 4]);
console.log(none); // []
```

### Notes

- Returns only unique values (duplicates are removed)
- The order of elements in the result matches the first array
- Uses strict equality (`===`) for comparison
- Returns an empty array if no common elements exist

---

## sample

Returns a random element from an array.

### Signature

```typescript
function sample<T>(array: T[]): T;
```

### Parameters

- `array` - The array to sample from

### Returns

A random element from the input array.

### Example

```typescript
import { sample } from "jalutils/array";

// Basic usage
const numbers = [1, 2, 3, 4, 5];
const random = sample(numbers);
console.log(random); // e.g., 3 (varies each time)

// With strings
const fruits = ["apple", "banana", "cherry"];
const randomFruit = sample(fruits);
console.log(randomFruit); // e.g., 'banana'

// With objects
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
const randomUser = sample(users);
console.log(randomUser); // e.g., { id: 2, name: 'Bob' }
```

### Notes

- Uses `Math.random()` for random selection
- Each element has an equal probability of being selected
- Returns `undefined` if the array is empty
- Does not mutate the original array

---

## union

Combines multiple arrays into a single array of unique values.

### Signature

```typescript
function union<T>(...arrays: T[][]): T[];
```

### Parameters

- `...arrays` - Two or more arrays to combine

### Returns

A new array containing all unique values from all input arrays.

### Example

```typescript
import { union } from "jalutils/array";

// Basic usage
const result = union([1, 2], [2, 3], [3, 4]);
console.log(result); // [1, 2, 3, 4]

// With strings
const combined = union(
  ["apple", "banana"],
  ["banana", "cherry"],
  ["cherry", "date"],
);
console.log(combined); // ['apple', 'banana', 'cherry', 'date']

// Removes duplicates
const unique = union([1, 1, 2], [2, 3, 3]);
console.log(unique); // [1, 2, 3]

// Single array
const single = union([1, 2, 3]);
console.log(single); // [1, 2, 3]
```

### Notes

- Automatically removes duplicate values
- Preserves the order of first appearance
- Uses strict equality (`===`) for comparison
- Returns a new array (does not mutate the originals)

---

## Import

::: code-group

```typescript [Category Import (Recommended)]
import { flatten, intersection, sample, union } from "jalutils/array";
```

```typescript [Named Import]
import { flatten, intersection, sample, union } from "jalutils";
```

:::
