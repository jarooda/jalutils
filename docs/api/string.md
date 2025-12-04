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

## truncate

Truncates a string to a specified length and adds an ending (default: '...').

### Signature

```typescript
function truncate(str: string, length: number, ending?: string): string;
```

### Parameters

- `str` - The string to truncate
- `length` - The maximum length of the resulting string (including the ending)
- `ending` - Optional ending to append (default: '...')

### Returns

A truncated string with the ending appended if the original string exceeds the specified length.

### Example

```typescript
import { truncate } from "jalutils/string";

// Basic usage
console.log(truncate("Hello World", 8)); // "Hello..."
console.log(truncate("JavaScript", 6)); // "Jav..."

// String shorter than length (no truncation)
console.log(truncate("Hello", 10)); // "Hello"
console.log(truncate("Hi", 5)); // "Hi"

// Custom ending
console.log(truncate("Hello World", 8, "…")); // "Hello W…"
console.log(truncate("Long text here", 10, " [more]")); // "Lo [more]"
console.log(truncate("Description", 8, "...")); // "Descr..."

// Empty ending
console.log(truncate("Hello World", 5, "")); // "Hello"

// Edge cases
console.log(truncate("", 5)); // ""
console.log(truncate("Hello", 0)); // ""
console.log(truncate("Hello", -1)); // ""

// Practical examples

// Truncate article preview
function createPreview(article: string, maxLength: number): string {
  return truncate(article, maxLength);
}

const article =
  "This is a very long article about JavaScript and TypeScript...";
console.log(createPreview(article, 30)); // "This is a very long artic..."

// Truncate user comments
function formatComment(comment: string): string {
  return truncate(comment, 50, "... (read more)");
}

console.log(
  formatComment("This is an incredibly long comment that goes on and on"),
);
// "This is an incredibly long ... (read more)"

// Table cell truncation
interface Product {
  name: string;
  description: string;
}

function formatProductForTable(product: Product) {
  return {
    name: truncate(product.name, 20),
    description: truncate(product.description, 50),
  };
}

const product = {
  name: "Super Awesome Product Name",
  description:
    "This product is amazing and has tons of features that everyone will love",
};

console.log(formatProductForTable(product));
// { name: "Super Awesome Pr...", description: "This product is amazing and has tons of featu..." }

// Notification messages
function createNotification(message: string, maxLength = 40): string {
  return truncate(message, maxLength);
}

console.log(createNotification("You have a new message from John Doe"));
// "You have a new message from John..."

// File name truncation
function truncateFileName(fileName: string, maxLength = 30): string {
  const parts = fileName.split(".");
  const ext = parts.length > 1 ? `.${parts[parts.length - 1]}` : "";
  const nameWithoutExt = parts.slice(0, -1).join(".");

  if (fileName.length <= maxLength) {
    return fileName;
  }

  const truncatedName = truncate(
    nameWithoutExt,
    maxLength - ext.length - 3,
    "...",
  );
  return truncatedName + ext;
}

console.log(truncateFileName("very-long-document-name-with-details.pdf", 25));
// "very-long-doc...pdf"

// Breadcrumb truncation
function formatBreadcrumb(path: string, maxLength = 50): string {
  return truncate(path, maxLength, "...");
}

const longPath = "/home/user/documents/projects/javascript/my-awesome-project";
console.log(formatBreadcrumb(longPath, 40));
// "/home/user/documents/projects/ja..."

// Tweet-like character limit
function enforceTweetLimit(text: string): string {
  return truncate(text, 280);
}

// Meta description
function createMetaDescription(description: string): string {
  return truncate(description, 160);
}

// Tooltip text
function createTooltip(text: string): string {
  return truncate(text, 100, "…");
}
```

### Use Cases

- **Content previews**: Show excerpts of articles or posts
- **Table formatting**: Keep table cells from overflowing
- **UI components**: Truncate long text in buttons, labels, or cards
- **Notifications**: Limit message length in toasts or alerts
- **File names**: Display shortened file names
- **Breadcrumbs**: Truncate long navigation paths
- **Meta descriptions**: Enforce SEO character limits
- **Comments**: Show preview of long comments

### Behavior Details

```typescript
import { truncate } from "jalutils/string";

// Length includes the ending
truncate("Hello World", 8); // "Hello..." (5 chars + 3 for '...')
truncate("Hello World", 8, "…"); // "Hello W…" (7 chars + 1 for '…')

// Returns empty string for invalid lengths
truncate("Hello", 0); // ""
truncate("Hello", -5); // ""

// No truncation if string fits
truncate("Hi", 10); // "Hi"
truncate("Hello", 5); // "Hello"

// Works with any ending
truncate("Text", 10, " [...]"); // "Text" (no truncation needed)
truncate("Long text here", 10, " [...]"); // "Lo [...]"

// Empty or null handling
truncate("", 5); // ""
truncate("Hello", 3, "..."); // "..." (ending only)
```

### Notes

- Returns empty string if input is empty or length is ≤ 0
- The `length` parameter includes the ending in the total count
- If string length ≤ specified length, returns the original string
- The ending is optional and defaults to `'...'`
- Works with Unicode characters
- Returns empty string if length is less than ending length

### Common Patterns

```typescript
import { truncate } from "jalutils/string";

// Create a reusable truncator
function createTruncator(maxLength: number, ending = "...") {
  return (text: string) => truncate(text, maxLength, ending);
}

const truncatePreview = createTruncator(50);
console.log(truncatePreview("Long article text...")); // Truncated to 50 chars

// Truncate with word boundary (custom implementation)
function truncateWords(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const truncated = truncate(text, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > maxLength / 2) {
    return truncated.substring(0, lastSpace) + "...";
  }

  return truncated;
}

// Conditional truncation
function smartTruncate(
  text: string,
  maxLength: number,
  shouldTruncate: boolean,
): string {
  return shouldTruncate ? truncate(text, maxLength) : text;
}

// Truncate middle (keep start and end)
function truncateMiddle(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const charsToShow = maxLength - 3; // Account for '...'
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return (
    text.substring(0, frontChars) +
    "..." +
    text.substring(text.length - backChars)
  );
}

console.log(truncateMiddle("very-long-file-name.txt", 15)); // "very-l...ame.txt"
```

## Import

::: code-group

```typescript [Category Import (Recommended)]
import { capitalize, truncate } from "jalutils/string";
```

```typescript [Named Import]
import { capitalize, truncate } from "jalutils";
```

:::
