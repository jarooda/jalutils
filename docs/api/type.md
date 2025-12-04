# Type Utilities

Type checking utilities with TypeScript type guards for safer code.

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

| Value       | `isNil` | `isNull` | `isUndefined` |
| ----------- | ------- | -------- | ------------- |
| `null`      | ✓ true  | ✓ true   | ✗ false       |
| `undefined` | ✓ true  | ✗ false  | ✓ true        |
| `0`         | ✗ false | ✗ false  | ✗ false       |
| `''`        | ✗ false | ✗ false  | ✗ false       |
| `false`     | ✗ false | ✗ false  | ✗ false       |
| `[]`        | ✗ false | ✗ false  | ✗ false       |
| `{}`        | ✗ false | ✗ false  | ✗ false       |

## Import

::: code-group

```typescript [Category Import (Recommended)]
import { isNil, isNull, isUndefined } from "jalutils/type";
```

```typescript [Named Import]
import { isNil, isNull, isUndefined } from "jalutils";
```

:::
