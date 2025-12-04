# String Utilities

Functions for manipulating and transforming strings.

## capitalize

Capitalizes the first letter of a string and converts the rest to lowercase.

### Signature

```typescript
function capitalize(str: string): string;
```

### Parameters

- `str` - The string to capitalize

### Returns

A new string with the first letter capitalized and the rest in lowercase.

### Example

```typescript
import { capitalize } from "jalutils/string";

// Basic usage
console.log(capitalize("hello")); // "Hello"
console.log(capitalize("WORLD")); // "World"
console.log(capitalize("javaScript")); // "Javascript"

// With sentences
console.log(capitalize("hello world")); // "Hello world"
console.log(capitalize("THE QUICK FOX")); // "The quick fox"

// Edge cases
console.log(capitalize("")); // ""
console.log(capitalize("a")); // "A"
console.log(capitalize("123abc")); // "123abc"

// Practical examples

// Format names
function formatName(name: string): string {
  return name
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

console.log(formatName("john doe")); // "John Doe"
console.log(formatName("JANE SMITH")); // "Jane Smith"

// Form input normalization
function normalizeInput(input: string): string {
  return capitalize(input.trim());
}

const userInput = "  hello world  ";
console.log(normalizeInput(userInput)); // "Hello world"

// Title formatting
const titles = [
  "introduction to typescript",
  "ADVANCED PATTERNS",
  "Best Practices",
];

const formatted = titles.map((title) => capitalize(title));
console.log(formatted);
// ["Introduction to typescript", "Advanced patterns", "Best practices"]

// User greeting
function greetUser(username: string): string {
  return `Welcome, ${capitalize(username)}!`;
}

console.log(greetUser("alice")); // "Welcome, Alice!"
console.log(greetUser("BOB")); // "Welcome, Bob!"

// Status formatting
type Status = "active" | "inactive" | "pending";

function formatStatus(status: Status): string {
  return capitalize(status);
}

console.log(formatStatus("active")); // "Active"
console.log(formatStatus("pending")); // "Pending"

// Enum display
enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

function displayPriority(priority: Priority): string {
  return capitalize(priority);
}

console.log(displayPriority(Priority.LOW)); // "Low"
console.log(displayPriority(Priority.HIGH)); // "High"
```

### Use Cases

- **Name formatting**: Capitalize first and last names
- **Title formatting**: Format article or page titles
- **User interface**: Display status, categories, or labels
- **Form processing**: Normalize user input
- **Data display**: Format database strings for presentation
- **Enum values**: Convert enum strings to readable format

### Behavior Details

```typescript
import { capitalize } from "jalutils/string";

// First letter capitalized, rest lowercase
capitalize("HELLO"); // "Hello"
capitalize("hELLO"); // "Hello"
capitalize("HeLLo"); // "Hello"

// Preserves spaces and punctuation
capitalize("hello world"); // "Hello world"
capitalize("hello, world!"); // "Hello, world!"
capitalize("123 main street"); // "123 main street"

// Special characters
capitalize("über"); // "Über"
capitalize("élève"); // "Élève"
capitalize("москва"); // "Москва"

// Empty or whitespace
capitalize(""); // ""
capitalize(" "); // " "
capitalize("  hello"); // "  hello"
```

### Title Case Alternative

For full title case (capitalizing each word), combine with split/map:

```typescript
import { capitalize } from "jalutils/string";

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

console.log(toTitleCase("hello world")); // "Hello World"
console.log(toTitleCase("THE QUICK BROWN FOX")); // "The Quick Brown Fox"
```

### Notes

- Returns a new string (does not mutate the original)
- Converts all characters after the first to lowercase
- Handles empty strings gracefully
- Works with Unicode characters
- Preserves whitespace and punctuation
- Only capitalizes the first character of the entire string, not each word

### Common Patterns

```typescript
import { capitalize } from "jalutils/string";

// Capitalize multiple words
function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

// Capitalize first word only
function capitalizeSentence(str: string): string {
  if (!str) return str;
  return capitalize(str.charAt(0)) + str.slice(1).toLowerCase();
}

// Conditional capitalization
function smartCapitalize(str: string, shouldCapitalize: boolean): string {
  return shouldCapitalize ? capitalize(str) : str.toLowerCase();
}
```

## Import

::: code-group

```typescript [Category Import (Recommended)]
import { capitalize } from "jalutils/string";
```

```typescript [Named Import]
import { capitalize } from "jalutils";
```

:::
