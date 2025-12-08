# Type Utilities

Type checking utilities with TypeScript type guards for safer code.

## isBoolean

Checks if a value is a boolean.

### Signature

```typescript
function isBoolean(value: unknown): value is boolean;
```

### Parameters

- `value` - The value to check

### Returns

`true` if the value is a boolean, `false` otherwise.

### Example

```typescript
import { isBoolean } from "jalutils/type";

console.log(isBoolean(true)); // true
console.log(isBoolean(false)); // true
console.log(isBoolean(0)); // false
console.log(isBoolean("true")); // false

// Type guard
function toggle(value: unknown) {
  if (isBoolean(value)) {
    return !value; // TypeScript knows value is boolean
  }
  return false;
}
```

---

## isFunction

Checks if a value is a function.

### Signature

```typescript
function isFunction(value: unknown): value is (...args: unknown[]) => unknown;
```

### Parameters

- `value` - The value to check

### Returns

`true` if the value is a function, `false` otherwise.

### Example

```typescript
import { isFunction } from "jalutils/type";

console.log(isFunction(() => {})); // true
console.log(isFunction(function () {})); // true
console.log(isFunction(class {})); // true
console.log(isFunction("function")); // false

// Type guard
function execute(callback: unknown) {
  if (isFunction(callback)) {
    callback(); // TypeScript knows callback is a function
  }
}
```

---

## isIterable

Checks if a value is iterable (has a Symbol.iterator method).

### Signature

```typescript
function isIterable(value: unknown): value is Iterable<unknown>;
```

### Parameters

- `value` - The value to check

### Returns

`true` if the value is iterable, `false` otherwise.

### Example

```typescript
import { isIterable } from "jalutils/type";

console.log(isIterable([1, 2, 3])); // true
console.log(isIterable("hello")); // true
console.log(isIterable(new Set())); // true
console.log(isIterable(new Map())); // true
console.log(isIterable(123)); // false
console.log(isIterable({})); // false

// Type guard
function processIterable(value: unknown) {
  if (isIterable(value)) {
    for (const item of value) {
      console.log(item);
    }
  }
}
```

---

## isNil

Checks if a value is `null` or `undefined`. TypeScript type guard that narrows the type.

### Signature

```typescript
function isNil(value: unknown): value is null | undefined;
```

### Parameters

- `value` - The value to check

### Returns

`true` if the value is `null` or `undefined`, `false` otherwise.

### Example

```typescript
import { isNil } from "jalutils/type";

// Basic usage
console.log(isNil(null)); // true
console.log(isNil(undefined)); // true
console.log(isNil(0)); // false
console.log(isNil("")); // false
console.log(isNil(false)); // false
console.log(isNil([])); // false

// Type guard in action
function processValue(value: string | null | undefined) {
  if (isNil(value)) {
    console.log("No value provided");
    return;
  }

  // TypeScript knows value is string here
  console.log(value.toUpperCase());
}

// Safe property access
function getUserName(user: { name?: string } | null | undefined) {
  if (isNil(user)) {
    return "Guest";
  }

  return user.name ?? "Anonymous";
}

// Array filtering
const values = [1, null, 2, undefined, 3];
const defined = values.filter((v) => !isNil(v));
console.log(defined); // [1, 2, 3]

// Form validation
function validateInput(input: string | null | undefined): boolean {
  if (isNil(input)) {
    console.error("Input is required");
    return false;
  }

  return input.length > 0;
}
```

### Use Cases

- **Null safety**: Check for null/undefined before operations
- **Default values**: Provide defaults when value is nil
- **Form validation**: Ensure required fields have values
- **API responses**: Handle missing or null data
- **Optional chaining alternative**: Explicit nil checks

### Notes

- Returns `true` for both `null` and `undefined`
- TypeScript type guard narrows the type correctly
- Strict equality check (`===`)
- Does not consider `0`, `""`, `false`, or `[]` as nil

---

## isNull

Checks if a value is strictly `null`.

### Signature

```typescript
function isNull(value: unknown): value is null;
```

### Parameters

- `value` - The value to check

### Returns

`true` if the value is `null`, `false` otherwise.

### Example

```typescript
import { isNull } from "jalutils/type";

// Basic usage
console.log(isNull(null)); // true
console.log(isNull(undefined)); // false
console.log(isNull(0)); // false
console.log(isNull("")); // false
console.log(isNull(false)); // false

// Type guard
function handleValue(value: string | null) {
  if (isNull(value)) {
    console.log("Value is explicitly null");
    return;
  }

  // TypeScript knows value is string here
  console.log(value.length);
}

// Distinguish null from undefined
function checkStatus(status: string | null | undefined) {
  if (isNull(status)) {
    console.log("Status explicitly set to null");
  } else if (status === undefined) {
    console.log("Status not set");
  } else {
    console.log("Status:", status);
  }
}

// API responses
interface ApiResponse {
  data: any | null;
  error: string | null;
}

function processResponse(response: ApiResponse) {
  if (isNull(response.data)) {
    console.log("No data returned");
  }

  if (!isNull(response.error)) {
    console.error("Error:", response.error);
  }
}
```

### Use Cases

- **Explicit null checks**: When you need to distinguish `null` from `undefined`
- **API responses**: Handle explicit null values in responses
- **Database values**: Check for null database fields
- **Reset states**: Detect when values are explicitly reset to null

### isNull vs isNil

| Check    | `null` | `undefined` |
| -------- | ------ | ----------- |
| `isNull` | ✓ true | ✗ false     |
| `isNil`  | ✓ true | ✓ true      |

### Notes

- Only returns `true` for `null`, not `undefined`
- TypeScript type guard narrows to `null`
- Uses strict equality (`===`)
- More specific than `isNil`

---

## isNumber

Checks if a value is a number (including NaN and Infinity).

### Signature

```typescript
function isNumber(value: unknown): value is number;
```

### Parameters

- `value` - The value to check

### Returns

`true` if the value is a number, `false` otherwise.

### Example

```typescript
import { isNumber } from "jalutils/type";

console.log(isNumber(42)); // true
console.log(isNumber(3.14)); // true
console.log(isNumber(NaN)); // true
console.log(isNumber(Infinity)); // true
console.log(isNumber("123")); // false

// Type guard
function double(value: unknown) {
  if (isNumber(value)) {
    return value * 2; // TypeScript knows value is number
  }
  return 0;
}
```

---

## isPlainObject

Checks if a value is a plain object (created by `{}` or `Object.create(null)`).

### Signature

```typescript
function isPlainObject(value: unknown): value is Record<string, unknown>;
```

### Parameters

- `value` - The value to check

### Returns

`true` if the value is a plain object, `false` otherwise.

### Example

```typescript
import { isPlainObject } from "jalutils/type";

console.log(isPlainObject({})); // true
console.log(isPlainObject({ a: 1 })); // true
console.log(isPlainObject(Object.create(null))); // true
console.log(isPlainObject([])); // false
console.log(isPlainObject(new Date())); // false
console.log(isPlainObject(null)); // false

// Type guard
function merge(target: unknown, source: unknown) {
  if (isPlainObject(target) && isPlainObject(source)) {
    return { ...target, ...source };
  }
  return {};
}
```

---

## isPromise

Checks if a value is a Promise.

### Signature

```typescript
function isPromise(value: unknown): value is Promise<unknown>;
```

### Parameters

- `value` - The value to check

### Returns

`true` if the value is a Promise, `false` otherwise.

### Example

```typescript
import { isPromise } from "jalutils/type";

console.log(isPromise(Promise.resolve())); // true
console.log(isPromise(new Promise(() => {}))); // true
console.log(isPromise({ then: () => {} })); // false

// Type guard
async function handle(value: unknown) {
  if (isPromise(value)) {
    const result = await value; // TypeScript knows value is Promise
    console.log(result);
  }
}
```

---

## isString

Checks if a value is a string.

### Signature

```typescript
function isString(value: unknown): value is string;
```

### Parameters

- `value` - The value to check

### Returns

`true` if the value is a string, `false` otherwise.

### Example

```typescript
import { isString } from "jalutils/type";

console.log(isString("hello")); // true
console.log(isString("")); // true
console.log(isString(`template`)); // true
console.log(isString(123)); // false

// Type guard
function uppercase(value: unknown) {
  if (isString(value)) {
    return value.toUpperCase(); // TypeScript knows value is string
  }
  return "";
}
```

---

## isUndefined

Checks if a value is strictly `undefined`.

### Signature

```typescript
function isUndefined(value: unknown): value is undefined;
```

### Parameters

- `value` - The value to check

### Returns

`true` if the value is `undefined`, `false` otherwise.

### Example

```typescript
import { isUndefined } from "jalutils/type";

// Basic usage
console.log(isUndefined(undefined)); // true
console.log(isUndefined(null)); // false
console.log(isUndefined(0)); // false
console.log(isUndefined("")); // false
console.log(isUndefined(false)); // false

// Type guard
function greet(name: string | undefined) {
  if (isUndefined(name)) {
    console.log("Hello, Guest!");
    return;
  }

  // TypeScript knows name is string here
  console.log(`Hello, ${name}!`);
}

// Optional properties
interface User {
  name: string;
  email?: string;
  phone?: string;
}

function printContact(user: User) {
  if (isUndefined(user.email)) {
    console.log("Email not provided");
  } else {
    console.log("Email:", user.email);
  }
}

// Function arguments
function calculate(a: number, b?: number) {
  if (isUndefined(b)) {
    return a * 2; // Default behavior
  }
  return a + b;
}

console.log(calculate(5)); // 10
console.log(calculate(5, 3)); // 8

// Distinguish from null
function checkValue(value: string | null | undefined) {
  if (isUndefined(value)) {
    console.log("Value was not set");
  } else if (value === null) {
    console.log("Value was explicitly set to null");
  } else {
    console.log("Value:", value);
  }
}
```

### Use Cases

- **Optional parameters**: Check if optional parameters were provided
- **Optional properties**: Detect missing object properties
- **Default values**: Provide defaults for undefined values
- **Initialization checks**: Verify if variables have been initialized

### isUndefined vs isNil

| Check         | `undefined` | `null`  |
| ------------- | ----------- | ------- |
| `isUndefined` | ✓ true      | ✗ false |
| `isNil`       | ✓ true      | ✓ true  |

### Notes

- Only returns `true` for `undefined`, not `null`
- TypeScript type guard narrows to `undefined`
- Uses strict equality (`===`)
- More specific than `isNil`
- Useful for distinguishing uninitialized from intentionally nullified values

---

## Comparison Table

| Value        | `isBoolean` | `isFunction` | `isIterable` | `isNil` | `isNull` | `isNumber` | `isPlainObject` | `isPromise` | `isString` | `isUndefined` |
| ------------ | ----------- | ------------ | ------------ | ------- | -------- | ---------- | --------------- | ----------- | ---------- | ------------- |
| `null`       | ✗           | ✗            | ✗            | ✓       | ✓        | ✗          | ✗               | ✗           | ✗          | ✗             |
| `undefined`  | ✗           | ✗            | ✗            | ✓       | ✗        | ✗          | ✗               | ✗           | ✗          | ✓             |
| `true`       | ✓           | ✗            | ✗            | ✗       | ✗        | ✗          | ✗               | ✗           | ✗          | ✗             |
| `false`      | ✓           | ✗            | ✗            | ✗       | ✗        | ✗          | ✗               | ✗           | ✗          | ✗             |
| `0`          | ✗           | ✗            | ✗            | ✗       | ✗        | ✓          | ✗               | ✗           | ✗          | ✗             |
| `42`         | ✗           | ✗            | ✗            | ✗       | ✗        | ✓          | ✗               | ✗           | ✗          | ✗             |
| `''`         | ✗           | ✗            | ✓            | ✗       | ✗        | ✗          | ✗               | ✗           | ✓          | ✗             |
| `'hello'`    | ✗           | ✗            | ✓            | ✗       | ✗        | ✗          | ✗               | ✗           | ✓          | ✗             |
| `[]`         | ✗           | ✗            | ✓            | ✗       | ✗        | ✗          | ✗               | ✗           | ✗          | ✗             |
| `{}`         | ✗           | ✗            | ✗            | ✗       | ✗        | ✗          | ✓               | ✗           | ✗          | ✗             |
| `() => {}`   | ✗           | ✓            | ✗            | ✗       | ✗        | ✗          | ✗               | ✗           | ✗          | ✗             |
| `Promise`    | ✗           | ✗            | ✗            | ✗       | ✗        | ✗          | ✗               | ✓           | ✗          | ✗             |
| `new Set()`  | ✗           | ✗            | ✓            | ✗       | ✗        | ✗          | ✗               | ✗           | ✗          | ✗             |
| `new Date()` | ✗           | ✗            | ✗            | ✗       | ✗        | ✗          | ✗               | ✗           | ✗          | ✗             |

## Import

::: code-group

```typescript [Category Import (Recommended)]
import {
  isBoolean,
  isFunction,
  isIterable,
  isNil,
  isNull,
  isNumber,
  isPlainObject,
  isPromise,
  isString,
  isUndefined,
} from "jalutils/type";
```

```typescript [Named Import]
import {
  isBoolean,
  isFunction,
  isIterable,
  isNil,
  isNull,
  isNumber,
  isPlainObject,
  isPromise,
  isString,
  isUndefined,
} from "jalutils";
```

:::
