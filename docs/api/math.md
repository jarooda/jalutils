# Math Utilities

Functions for mathematical operations and calculations.

## average

Calculates the arithmetic mean (average) of the provided numbers.

### Signature

```typescript
function average(...values: number[]): number;
```

### Parameters

- `values` - Numbers to calculate the average of

### Returns

The average of all provided numbers, or 0 if no numbers are provided.

### Example

```typescript
import { average } from "jalutils/math";

// Basic usage
console.log(average(1, 2, 3, 4, 5)); // 3

// Two numbers
console.log(average(10, 20)); // 15

// Empty array
console.log(average()); // 0
```

---

## ceil

Rounds a number up to the nearest integer.

### Signature

```typescript
function ceil(value: number): number;
```

### Parameters

- `value` - The number to round up

### Returns

The smallest integer greater than or equal to the value.

### Example

```typescript
import { ceil } from "jalutils/math";

console.log(ceil(5.1)); // 6
console.log(ceil(5.9)); // 6
console.log(ceil(5)); // 5
console.log(ceil(-5.1)); // -5
```

---

## clamp

Restricts a number within a specified range.

### Signature

```typescript
function clamp(value: number, min: number, max: number): number;
```

### Parameters

- `value` - The number to clamp
- `min` - The minimum value
- `max` - The maximum value

### Returns

The clamped value within the range [min, max].

### Example

```typescript
import { clamp } from "jalutils/math";

console.log(clamp(5, 0, 10)); // 5
console.log(clamp(-5, 0, 10)); // 0
console.log(clamp(15, 0, 10)); // 10
```

---

## floor

Rounds a number down to the nearest integer.

### Signature

```typescript
function floor(value: number): number;
```

### Parameters

- `value` - The number to round down

### Returns

The largest integer less than or equal to the value.

### Example

```typescript
import { floor } from "jalutils/math";

console.log(floor(5.1)); // 5
console.log(floor(5.9)); // 5
console.log(floor(5)); // 5
console.log(floor(-5.1)); // -6
```

---

## median

Calculates the median (middle value) of the provided numbers.

### Signature

```typescript
function median(...values: number[]): number;
```

### Parameters

- `values` - Numbers to calculate the median of

### Returns

The median of all provided numbers, or 0 if no numbers are provided.

### Example

```typescript
import { median } from "jalutils/math";

// Odd number of values
console.log(median(1, 2, 3)); // 2

// Even number of values
console.log(median(1, 2, 3, 4)); // 2.5

// Unsorted values
console.log(median(3, 1, 2)); // 2
```

---

## percentile

Calculates the value at a given percentile in a dataset.

### Signature

```typescript
function percentile(values: number[], percentile: number): number;
```

### Parameters

- `values` - Array of numbers to calculate the percentile from
- `percentile` - The percentile to calculate (0-100)

### Returns

The value at the specified percentile, or 0 if the array is empty.

### Example

```typescript
import { percentile } from "jalutils/math";

const data = [1, 2, 3, 4, 5];

console.log(percentile(data, 50)); // 3 (median)
console.log(percentile(data, 25)); // 2
console.log(percentile(data, 75)); // 4
```

### Notes

- Throws an error if percentile is not between 0 and 100
- Uses linear interpolation for values between data points

---

## random

Generates a random integer within a specified range.

### Signature

```typescript
function random(min?: number, max?: number): number;
```

### Parameters

- `min` - The minimum value (default: 0)
- `max` - The maximum value (default: 999)

### Returns

A random integer between min and max (inclusive).

### Example

```typescript
import { random } from "jalutils/math";

// Default range [0, 999]
console.log(random()); // e.g., 456

// Custom range
console.log(random(1, 10)); // e.g., 7

// Swaps if max < min
console.log(random(100, 50)); // e.g., 73
```

### Notes

- Automatically swaps min and max if max < min
- Caps the range to 1 billion if it exceeds that

---

## round

Rounds a number to the nearest integer.

### Signature

```typescript
function round(value: number): number;
```

### Parameters

- `value` - The number to round

### Returns

The nearest integer to the value.

### Example

```typescript
import { round } from "jalutils/math";

console.log(round(5.4)); // 5
console.log(round(5.5)); // 6
console.log(round(5)); // 5
console.log(round(-5.5)); // -6
```

### Notes

- Negative numbers round away from zero (e.g., -5.5 rounds to -6)

---

## sum

Calculates the sum of the provided numbers.

### Signature

```typescript
function sum(...values: number[]): number;
```

### Parameters

- `values` - Numbers to sum

### Returns

The sum of all provided numbers, or 0 if no numbers are provided.

### Example

```typescript
import { sum } from "jalutils/math";

console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(10, 20, 30)); // 60
console.log(sum()); // 0
```
