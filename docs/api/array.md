# Array Utilities

Functions for working with arrays in JavaScript and TypeScript.

## chunk

Splits an array into smaller arrays of a specified size.

### Signature

```typescript
function chunk<T>(array: T[], size: number): T[][];
```

### Parameters

- `array` - The array to split into chunks
- `size` - The size of each chunk (must be greater than 0)

### Returns

A new array containing the chunked arrays.

### Example

```typescript
import { chunk } from "jalutils/array";

// Basic usage
const numbers = [1, 2, 3, 4, 5, 6];
const chunked = chunk(numbers, 2);
console.log(chunked); // [[1, 2], [3, 4], [5, 6]]

// Uneven chunks
const items = [1, 2, 3, 4, 5];
console.log(chunk(items, 2)); // [[1, 2], [3, 4], [5]]

// Chunk size larger than array
const small = [1, 2, 3];
console.log(chunk(small, 5)); // [[1, 2, 3]]
```

### Notes

- Throws an error if size is 0 or negative
- The last chunk may contain fewer elements if the array doesn't divide evenly
- Returns a new array (does not mutate the original)

---

## difference

Returns elements from the first array that are not present in the other arrays.

### Signature

```typescript
function difference<T>(array: T[], ...others: T[][]): T[];
```

### Parameters

- `array` - The array to inspect
- `...others` - Arrays of values to exclude

### Returns

A new array containing the elements that are only in the first array.

### Example

```typescript
import { difference } from "jalutils/array";

// Basic usage
const result = difference([1, 2, 3, 4], [2, 4]);
console.log(result); // [1, 3]

// Multiple exclusion arrays
const filtered = difference([1, 2, 3, 4, 5], [2, 4], [3]);
console.log(filtered); // [1, 5]

// With strings
const words = difference(["a", "b", "c"], ["b"], ["c"]);
console.log(words); // ['a']
```

### Notes

- Uses strict equality (`===`) for comparison
- Preserves the order of elements from the first array
- Returns a new array (does not mutate the original)

---

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

## groupBy

Groups elements of an array by a specified key.

### Signature

```typescript
function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]>;
```

### Parameters

- `array` - The array to group
- `key` - The property key to group by

### Returns

An object where keys are the stringified values of the specified property and values are arrays of elements.

### Example

```typescript
import { groupBy } from "jalutils/array";

// Group by role
const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "admin" },
];
const grouped = groupBy(users, "role");
console.log(grouped);
// {
//   admin: [{ id: 1, name: 'Alice', role: 'admin' }, { id: 3, name: 'Charlie', role: 'admin' }],
//   user: [{ id: 2, name: 'Bob', role: 'user' }]
// }

// Group by numeric values
const items = [
  { id: 1, category: 1 },
  { id: 2, category: 2 },
  { id: 3, category: 1 },
];
console.log(groupBy(items, "category"));
// { '1': [...], '2': [...] }
```

### Notes

- All keys in the result object are strings (values are converted using `String()`)
- Preserves the order of elements within each group
- Does not mutate the original array

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

## pluck

Extracts values of a specified property from an array of objects.

### Signature

```typescript
function pluck<T, K extends keyof T>(array: T[], key: K): T[K][];
```

### Parameters

- `array` - The array of objects to extract from
- `key` - The property key to extract

### Returns

A new array containing the extracted values.

### Example

```typescript
import { pluck } from "jalutils/array";

// Extract names
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
const names = pluck(users, "name");
console.log(names); // ['Alice', 'Bob', 'Charlie']

// Extract numeric values
const items = [
  { id: 1, price: 100 },
  { id: 2, price: 200 },
];
console.log(pluck(items, "price")); // [100, 200]
```

### Notes

- Preserves the order of elements
- Returns a new array (does not mutate the original)
- Type-safe: ensures the key exists on the objects

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

## shuffle

Randomly shuffles the elements of an array.

### Signature

```typescript
function shuffle<T>(array: T[]): T[];
```

### Parameters

- `array` - The array to shuffle

### Returns

A new shuffled array containing all elements from the input array in random order.

### Example

```typescript
import { shuffle } from "jalutils/array";

// Basic usage
const numbers = [1, 2, 3, 4, 5];
const shuffled = shuffle(numbers);
console.log(shuffled); // e.g., [3, 1, 5, 2, 4] (varies each time)

// With strings
const cards = ["A", "K", "Q", "J"];
console.log(shuffle(cards)); // e.g., ['Q', 'A', 'J', 'K']

// Original array unchanged
const original = [1, 2, 3];
const result = shuffle(original);
console.log(original); // [1, 2, 3]
console.log(result); // e.g., [2, 3, 1]
```

### Notes

- Uses Fisher-Yates algorithm for unbiased shuffling
- Each permutation has equal probability
- Returns a new array (does not mutate the original)

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
import {
  chunk,
  difference,
  flatten,
  groupBy,
  intersection,
  pluck,
  sample,
  shuffle,
  union,
} from "jalutils/array";
```

```typescript [Named Import]
import {
  chunk,
  difference,
  flatten,
  groupBy,
  intersection,
  pluck,
  sample,
  shuffle,
  union,
} from "jalutils";
```

:::
