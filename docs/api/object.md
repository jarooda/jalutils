# Object Utilities

Functions for working with objects in JavaScript and TypeScript.

## clone

Creates a deep copy of any value, including complex nested structures.

### Signature

```typescript
function clone<T>(value: T): T;
```

### Parameters

- `value` - The value to clone (can be any type)

### Returns

A deep copy of the input value.

### Example

```typescript
import { clone } from "jalutils/object";

// Clone an object
const obj = { a: 1, b: { c: 2 } };
const cloned = clone(obj);
console.log(cloned); // { a: 1, b: { c: 2 } }
console.log(cloned === obj); // false

// Clone an array
const arr = [1, [2, 3]];
const clonedArr = clone(arr);
console.log(clonedArr); // [1, [2, 3]]

// Clone a Date
const date = new Date("2023-01-01");
const clonedDate = clone(date);
console.log(clonedDate.getTime() === date.getTime()); // true
```

### Notes

- Handles primitives, objects, arrays, Date, RegExp, Map, Set, and TypedArrays
- Creates deep copies of nested structures
- Preserves prototype chains for plain objects
- Returns the same value for primitives

---

## compare

Performs deep equality comparison between two values.

### Signature

```typescript
function compare(a: unknown, b: unknown): boolean;
```

### Parameters

- `a` - The first value to compare
- `b` - The second value to compare

### Returns

`true` if the values are deeply equal, `false` otherwise.

### Example

```typescript
import { compare } from "jalutils/object";

// Compare objects
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
console.log(compare(obj1, obj2)); // true

// Compare arrays
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
console.log(compare(arr1, arr2)); // true

// Different values
console.log(compare({ a: 1 }, { a: 2 })); // false
```

### Notes

- Performs deep comparison for nested structures
- Compares object keys and values recursively
- Handles arrays and objects differently
- Returns `true` for identical references

---

## defaults

Fills in undefined properties in an object with default values.

### Signature

```typescript
function defaults<T>(obj: Partial<T>, defaultValues: Partial<T>): T;
```

### Parameters

- `obj` - The object to apply defaults to
- `defaultValues` - The object containing default values

### Returns

A new object with default values applied to undefined properties.

### Example

```typescript
import { defaults } from "jalutils/object";

// Basic usage
const config = { port: 3000 };
const withDefaults = defaults(config, { port: 8080, host: "localhost" });
console.log(withDefaults); // { port: 3000, host: 'localhost' }

// Only undefined properties are filled
const user = { name: "John", age: undefined };
const result = defaults(user, { name: "Default", age: 30, city: "NYC" });
console.log(result); // { name: 'John', age: 30, city: 'NYC' }
```

### Notes

- Only fills in `undefined` properties, not `null` or falsy values
- Creates a new object (does not mutate the original)
- Uses deep cloning for nested values
- Existing properties are never overridden

---

## entries

Returns an array of key-value pairs from an object.

### Signature

```typescript
function entries<T extends object>(obj: T): [string, unknown][];
```

### Parameters

- `obj` - The object to extract entries from

### Returns

An array of `[key, value]` tuples.

### Example

```typescript
import { entries } from "jalutils/object";

// Basic usage
const obj = { a: 1, b: 2, c: 3 };
console.log(entries(obj)); // [['a', 1], ['b', 2], ['c', 3]]

// With various value types
const mixed = { name: "John", age: 30, active: true };
console.log(entries(mixed)); // [['name', 'John'], ['age', 30], ['active', true]]
```

### Notes

- Values are deep cloned to prevent mutations
- Similar to `Object.entries()` but with cloning
- Returns a new array

---

## keys

Returns an array of an object's own enumerable property names.

### Signature

```typescript
function keys<T extends object>(obj: T): string[];
```

### Parameters

- `obj` - The object to extract keys from

### Returns

An array of the object's property names.

### Example

```typescript
import { keys } from "jalutils/object";

// Basic usage
const obj = { a: 1, b: 2, c: 3 };
console.log(keys(obj)); // ['a', 'b', 'c']

// With nested object
const user = { name: "John", address: { city: "NYC" } };
console.log(keys(user)); // ['name', 'address']
```

### Notes

- Keys are cloned to prevent mutations
- Similar to `Object.keys()` but with cloning
- Only returns own enumerable properties

---

## merge

Deeply merges multiple objects into a single object.

### Signature

```typescript
function merge<T>(...objects: Partial<T>[]): T;
```

### Parameters

- `...objects` - Multiple objects to merge

### Returns

A new object containing all properties from the input objects, with later objects overriding earlier ones.

### Example

```typescript
import { merge } from "jalutils/object";

// Basic merge
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
console.log(merge(obj1, obj2)); // { a: 1, b: 2, c: 3, d: 4 }

// Deep merge
const config1 = { server: { port: 3000, host: "localhost" } };
const config2 = { server: { port: 8080, ssl: true } };
console.log(merge(config1, config2));
// { server: { port: 8080, host: 'localhost', ssl: true } }

// Multiple objects
const result = merge({ a: 1 }, { b: 2 }, { c: 3 });
console.log(result); // { a: 1, b: 2, c: 3 }
```

### Notes

- Performs deep merge for nested objects
- Later objects override properties from earlier ones
- Arrays are replaced, not merged
- Creates a new object (does not mutate inputs)

---

## omit

Creates a new object without specified keys.

### Signature

```typescript
function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K>;
```

### Parameters

- `obj` - The source object
- `keys` - Array of keys to exclude

### Returns

A new object without the specified keys.

### Example

```typescript
import { omit } from "jalutils/object";

// Basic usage
const user = { name: "John", age: 30, password: "secret" };
const publicUser = omit(user, ["password"]);
console.log(publicUser); // { name: 'John', age: 30 }

// Multiple keys
const data = { a: 1, b: 2, c: 3, d: 4 };
console.log(omit(data, ["b", "d"])); // { a: 1, c: 3 }
```

### Notes

- Creates a new object (does not mutate the original)
- Uses deep cloning
- Type-safe with TypeScript's `Omit` utility type

---

## pick

Creates a new object with only specified keys.

### Signature

```typescript
function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K>;
```

### Parameters

- `obj` - The source object
- `keys` - Array of keys to include

### Returns

A new object containing only the specified keys.

### Example

```typescript
import { pick } from "jalutils/object";

// Basic usage
const user = {
  name: "John",
  age: 30,
  email: "john@example.com",
  password: "secret",
};
const credentials = pick(user, ["email", "password"]);
console.log(credentials); // { email: 'john@example.com', password: 'secret' }

// Single key
const data = { a: 1, b: 2, c: 3 };
console.log(pick(data, ["a"])); // { a: 1 }
```

### Notes

- Creates a new object (does not mutate the original)
- Uses deep cloning for values
- Type-safe with TypeScript's `Pick` utility type
- Ignores keys that don't exist in the source object

---

## transformKeys

Transforms all keys in an object using a provided function.

### Signature

```typescript
function transformKeys<T extends object>(
  obj: T,
  transformFn: (key: string) => string,
): { [key: string]: unknown };
```

### Parameters

- `obj` - The object whose keys will be transformed
- `transformFn` - A function that transforms each key

### Returns

A new object with transformed keys.

### Example

```typescript
import { transformKeys } from "jalutils/object";

// Convert to uppercase
const obj = { name: "John", age: 30 };
const result = transformKeys(obj, (key) => key.toUpperCase());
console.log(result); // { NAME: 'John', AGE: 30 }

// Convert to camelCase
const snakeCase = { first_name: "John", last_name: "Doe" };
const camelCase = transformKeys(snakeCase, (key) =>
  key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
);
console.log(camelCase); // { firstName: 'John', lastName: 'Doe' }

// Nested objects
const nested = { user_info: { first_name: "John" } };
const transformed = transformKeys(nested, (key) => key.toUpperCase());
console.log(transformed); // { USER_INFO: { FIRST_NAME: 'John' } }
```

### Notes

- Recursively transforms keys in nested objects
- Does not transform keys in special objects (Date, RegExp, Map, Set, TypedArrays)
- Creates a new object (does not mutate the original)
- Values are deep cloned

---

## values

Returns an array of an object's own enumerable property values.

### Signature

```typescript
function values<T extends object>(obj: T): unknown[];
```

### Parameters

- `obj` - The object to extract values from

### Returns

An array of the object's property values.

### Example

```typescript
import { values } from "jalutils/object";

// Basic usage
const obj = { a: 1, b: 2, c: 3 };
console.log(values(obj)); // [1, 2, 3]

// With various value types
const user = { name: "John", age: 30, active: true };
console.log(values(user)); // ['John', 30, true]
```

### Notes

- Values are deep cloned to prevent mutations
- Similar to `Object.values()` but with cloning
- Only returns values of own enumerable properties

---

## Import

::: code-group

```typescript [Category Import (Recommended)]
import {
  clone,
  compare,
  defaults,
  entries,
  keys,
  merge,
  omit,
  pick,
  transformKeys,
  values,
} from "jalutils/object";
```

```typescript [Named Import]
import {
  clone,
  compare,
  defaults,
  entries,
  keys,
  merge,
  omit,
  pick,
  transformKeys,
  values,
} from "jalutils";
```

:::
