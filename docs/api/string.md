# String Utilities

Functions for manipulating and transforming strings.

## camelCase

Converts a string to camelCase format.

### Signature

```typescript
function camelCase(str: string): string;
```

### Parameters

- `str` - The string to convert to camelCase

### Returns

A new string in camelCase format.

### Example

```typescript
import { camelCase } from "jalutils/string";

// Basic usage
console.log(camelCase("hello world")); // "helloWorld"
console.log(camelCase("Hello World")); // "helloWorld"
console.log(camelCase("HELLO WORLD")); // "helloWorld"

// From different formats
console.log(camelCase("hello-world")); // "helloWorld"
console.log(camelCase("hello_world")); // "helloWorld"
console.log(camelCase("hello-world_example")); // "helloWorldExample"

// Multiple words
console.log(camelCase("the quick brown fox")); // "theQuickBrownFox"
console.log(camelCase("user-first-name")); // "userFirstName"
console.log(camelCase("database_connection_string")); // "databaseConnectionString"

// Edge cases
console.log(camelCase("")); // ""
console.log(camelCase("hello")); // "hello"
console.log(camelCase("HELLO")); // "hello"
console.log(camelCase("   hello   world   ")); // "helloWorld"

// Practical examples

// Convert API response keys
interface ApiResponse {
  "user-name": string;
  "user-email": string;
  "is-active": boolean;
}

function normalizeKeys(obj: ApiResponse) {
  return {
    userName: obj["user-name"],
    userEmail: obj["user-email"],
    isActive: obj["is-active"],
  };
}

// Convert CSS properties to JavaScript
function cssToJs(cssProperty: string): string {
  return camelCase(cssProperty);
}

console.log(cssToJs("background-color")); // "backgroundColor"
console.log(cssToJs("font-size")); // "fontSize"
console.log(cssToJs("border-top-width")); // "borderTopWidth"

// Generate variable names
function createVariableName(description: string): string {
  return camelCase(description);
}

console.log(createVariableName("user first name")); // "userFirstName"
console.log(createVariableName("total price amount")); // "totalPriceAmount"

// Form field normalization
function normalizeFieldName(fieldName: string): string {
  return camelCase(fieldName);
}

console.log(normalizeFieldName("First Name")); // "firstName"
console.log(normalizeFieldName("phone_number")); // "phoneNumber"
console.log(normalizeFieldName("email-address")); // "emailAddress"

// Convert database column names
function dbColumnToProperty(columnName: string): string {
  return camelCase(columnName);
}

console.log(dbColumnToProperty("user_id")); // "userId"
console.log(dbColumnToProperty("created_at")); // "createdAt"
console.log(dbColumnToProperty("is_deleted")); // "isDeleted"

// URL parameter to object property
function urlParamToProperty(param: string): string {
  return camelCase(param);
}

console.log(urlParamToProperty("sort-by")); // "sortBy"
console.log(urlParamToProperty("page_number")); // "pageNumber"
console.log(urlParamToProperty("max-results")); // "maxResults"
```

### Use Cases

- **API integration**: Convert kebab-case or snake_case API keys to camelCase
- **Code generation**: Generate JavaScript/TypeScript variable names
- **CSS-in-JS**: Convert CSS property names to JavaScript format
- **Database mapping**: Convert snake_case database columns to camelCase properties
- **Form handling**: Normalize form field names
- **Configuration**: Convert config keys to JavaScript conventions
- **Data transformation**: Standardize property names across systems

### Behavior Details

```typescript
import { camelCase } from "jalutils/string";

// Handles spaces, hyphens, and underscores
camelCase("hello world"); // "helloWorld"
camelCase("hello-world"); // "helloWorld"
camelCase("hello_world"); // "helloWorld"
camelCase("hello-world_example"); // "helloWorldExample"

// First word is lowercase
camelCase("Hello World"); // "helloWorld"
camelCase("HELLO WORLD"); // "helloWorld"

// Subsequent words are capitalized
camelCase("one two three"); // "oneTwoThree"

// Multiple separators
camelCase("hello---world"); // "helloWorld"
camelCase("hello   world"); // "helloWorld"
camelCase("hello___world"); // "helloWorld"

// Filters empty segments
camelCase(" hello world "); // "helloWorld"
camelCase("-hello-world-"); // "helloWorld"
```

### Notes

- Returns a new string (does not mutate the original)
- First word is always lowercase
- Subsequent words have their first letter capitalized
- Removes spaces, hyphens, and underscores
- Handles multiple consecutive separators
- Empty strings return empty strings
- Single words are converted to lowercase

### Common Patterns

```typescript
import { camelCase } from "jalutils/string";

// Convert object keys
function toCamelCaseKeys<T extends Record<string, any>>(
  obj: T,
): Record<string, any> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[camelCase(key)] = obj[key];
      return acc;
    },
    {} as Record<string, any>,
  );
}

const input = { "first-name": "John", last_name: "Doe" };
console.log(toCamelCaseKeys(input)); // { firstName: "John", lastName: "Doe" }

// Array of strings
function toCamelCaseArray(strings: string[]): string[] {
  return strings.map(camelCase);
}

// Conditional conversion
function smartCase(str: string, useCamelCase: boolean): string {
  return useCamelCase ? camelCase(str) : str;
}
```

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

## kebabCase

Converts a string to kebab-case format.

### Signature

```typescript
function kebabCase(str: string): string;
```

### Parameters

- `str` - The string to convert to kebab-case

### Returns

A new string in kebab-case format.

### Example

```typescript
import { kebabCase } from "jalutils/string";

// Basic usage
console.log(kebabCase("hello world")); // "hello-world"
console.log(kebabCase("Hello World")); // "hello-world"
console.log(kebabCase("HELLO WORLD")); // "hello-world"

// From different formats
console.log(kebabCase("helloWorld")); // "helloworld"
console.log(kebabCase("hello_world")); // "hello-world"
console.log(kebabCase("hello world example")); // "hello-world-example"

// Multiple words
console.log(kebabCase("the quick brown fox")); // "the-quick-brown-fox"
console.log(kebabCase("user first name")); // "user-first-name"
console.log(kebabCase("database connection string")); // "database-connection-string"

// Edge cases
console.log(kebabCase("")); // ""
console.log(kebabCase("hello")); // "hello"
console.log(kebabCase("HELLO")); // "hello"
console.log(kebabCase("   hello   world   ")); // "hello-world"

// Practical examples

// Convert to URL slugs
function createSlug(title: string): string {
  return kebabCase(title);
}

console.log(createSlug("My Blog Post Title")); // "my-blog-post-title"
console.log(createSlug("10 Tips for JavaScript")); // "10-tips-for-javascript"
console.log(createSlug("Hello World!")); // "hello-world!"

// CSS class names
function createClassName(name: string): string {
  return kebabCase(name);
}

console.log(createClassName("primary button")); // "primary-button"
console.log(createClassName("user profile card")); // "user-profile-card"
console.log(createClassName("alert success message")); // "alert-success-message"

// HTML attribute names
function toAttribute(name: string): string {
  return `data-${kebabCase(name)}`;
}

console.log(toAttribute("user id")); // "data-user-id"
console.log(toAttribute("created at")); // "data-created-at"
console.log(toAttribute("is active")); // "data-is-active"

// File naming
function createFileName(description: string, extension: string): string {
  return `${kebabCase(description)}.${extension}`;
}

console.log(createFileName("My Document", "pdf")); // "my-document.pdf"
console.log(createFileName("User Profile Image", "jpg")); // "user-profile-image.jpg"

// Convert component names
function componentToFileName(componentName: string): string {
  return `${kebabCase(componentName)}.component.ts`;
}

console.log(componentToFileName("UserProfile")); // "userprofile.component.ts"
console.log(componentToFileName("navigation bar")); // "navigation-bar.component.ts"

// Route paths
function createRoutePath(name: string): string {
  return `/${kebabCase(name)}`;
}

console.log(createRoutePath("user profile")); // "/user-profile"
console.log(createRoutePath("admin dashboard")); // "/admin-dashboard"
console.log(createRoutePath("settings page")); // "/settings-page"

// ID generation
function createElementId(description: string): string {
  return kebabCase(description);
}

console.log(createElementId("submit button")); // "submit-button"
console.log(createElementId("email input field")); // "email-input-field"
```

### Use Cases

- **URL slugs**: Convert titles to URL-friendly formats
- **CSS classes**: Generate kebab-case class names
- **HTML attributes**: Create custom data attributes
- **File names**: Convert descriptions to file names
- **Route paths**: Generate URL paths for routing
- **IDs**: Create element IDs following HTML conventions
- **Configuration keys**: Use in config files that prefer kebab-case
- **API endpoints**: Generate RESTful endpoint names

### Behavior Details

```typescript
import { kebabCase } from "jalutils/string";

// Converts spaces to hyphens
kebabCase("hello world"); // "hello-world"
kebabCase("one two three"); // "one-two-three"

// Converts underscores to hyphens
kebabCase("hello_world"); // "hello-world"
kebabCase("user_first_name"); // "user-first-name"

// Converts to lowercase
kebabCase("Hello World"); // "hello-world"
kebabCase("HELLO WORLD"); // "hello-world"
kebabCase("CamelCase"); // "camelcase"

// Multiple separators
kebabCase("hello   world"); // "hello-world"
kebabCase("hello___world"); // "hello-world"

// Filters empty segments
kebabCase(" hello world "); // "hello-world"
kebabCase("  multiple  spaces  "); // "multiple-spaces"
```

### Notes

- Returns a new string (does not mutate the original)
- All characters are converted to lowercase
- Spaces and underscores are converted to hyphens
- Multiple consecutive separators are treated as one
- Empty strings return empty strings
- Filters out empty segments

### Common Patterns

```typescript
import { kebabCase } from "jalutils/string";

// Convert object keys
function toKebabCaseKeys<T extends Record<string, any>>(
  obj: T,
): Record<string, any> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[kebabCase(key)] = obj[key];
      return acc;
    },
    {} as Record<string, any>,
  );
}

const input = { firstName: "John", lastName: "Doe" };
console.log(toKebabCaseKeys(input)); // { "first-name": "John", "last-name": "Doe" }

// Create CSS module class
function createCssClass(prefix: string, name: string): string {
  return `${kebabCase(prefix)}-${kebabCase(name)}`;
}

console.log(createCssClass("button", "primary large")); // "button-primary-large"

// Generate BEM class names
function bemClass(block: string, element?: string, modifier?: string): string {
  let className = kebabCase(block);
  if (element) className += `__${kebabCase(element)}`;
  if (modifier) className += `--${kebabCase(modifier)}`;
  return className;
}

console.log(bemClass("card", "title", "large")); // "card__title--large"
```

## randomString

Generates a random string of specified length.

### Signature

```typescript
function randomString(length: number, options?: { chars?: string }): string;
```

### Parameters

- `length` - The length of the random string to generate
- `options` - Optional configuration object
  - `chars` - Custom character set to use (defaults to alphanumeric)

### Returns

A randomly generated string of the specified length.

### Example

```typescript
import { randomString } from "jalutils/string";

// Basic usage
console.log(randomString(8)); // "aB3xK9mP" (example)
console.log(randomString(16)); // "7jKmN2pQrS9tVwXy" (example)

// Custom character set
console.log(randomString(6, { chars: "0123456789" })); // "742938" (numeric only)
console.log(randomString(8, { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" })); // "KMNPQRST" (uppercase only)
console.log(randomString(10, { chars: "abc" })); // "cabacbcaab" (limited chars)

// Practical examples

// Generate session ID
function generateSessionId(): string {
  return randomString(32);
}

console.log(generateSessionId()); // "aB3xK9mP7jKmN2pQ..."

// Generate short codes
function generateShortCode(): string {
  return randomString(6, { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" });
}

console.log(generateShortCode()); // "A7K9M2"

// Generate password
function generatePassword(length: number = 12): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  return randomString(length, { chars });
}

console.log(generatePassword()); // "aB3@K9m$P7jK"

// Generate verification code
function generateVerificationCode(): string {
  return randomString(6, { chars: "0123456789" });
}

console.log(generateVerificationCode()); // "742938"

// Generate username suggestion
function generateUsername(base: string): string {
  return `${base}_${randomString(4, { chars: "0123456789" })}`;
}

console.log(generateUsername("user")); // "user_7429"

// Generate API key
function generateApiKey(): string {
  const prefix = "sk";
  const key = randomString(48);
  return `${prefix}_${key}`;
}

console.log(generateApiKey()); // "sk_aB3xK9mP7jKmN2pQ..."

// Generate temporary filename
function generateTempFilename(extension: string = "tmp"): string {
  return `temp_${randomString(8)}.${extension}`;
}

console.log(generateTempFilename("txt")); // "temp_aB3xK9mP.txt"

// Generate token
function generateToken(length: number = 24): string {
  return randomString(length);
}

console.log(generateToken()); // "aB3xK9mP7jKmN2pQrS9tVwXy"

// Generate ID with prefix
function generateId(prefix: string, length: number = 8): string {
  return `${prefix}_${randomString(length)}`;
}

console.log(generateId("order")); // "order_aB3xK9mP"
console.log(generateId("user", 12)); // "user_aB3xK9mP7jKm"
```

### Use Cases

- **Session management**: Generate unique session identifiers
- **Authentication**: Create temporary tokens or API keys
- **Testing**: Generate random test data
- **Short codes**: Create shareable codes or invite links
- **Passwords**: Generate random passwords
- **Verification**: Create one-time codes for email/SMS verification
- **Unique IDs**: Generate unique identifiers for entities
- **Temporary files**: Create random filenames

### Behavior Details

```typescript
import { randomString } from "jalutils/string";

// Default character set (alphanumeric)
randomString(8); // Uses A-Z, a-z, 0-9

// Custom characters
randomString(8, { chars: "abc123" }); // Only uses a, b, c, 1, 2, 3

// Each call produces different results
randomString(8); // "aB3xK9mP"
randomString(8); // "mN7pQ2rS" (different)

// Length determines output length exactly
randomString(5).length; // 5
randomString(100).length; // 100

// Empty length returns empty string
randomString(0); // ""
```

### Notes

- Returns a new random string on each call
- Default character set includes A-Z, a-z, and 0-9 (62 characters)
- Custom character sets can be any string
- Uses `Math.random()` for randomness (not cryptographically secure)
- For cryptographically secure random strings, use `crypto.randomBytes()` instead
- Length of 0 returns an empty string
- Characters from the set can repeat in the output

### Common Patterns

```typescript
import { randomString } from "jalutils/string";

// Generate multiple unique IDs
function generateIds(count: number, length: number = 8): string[] {
  return Array.from({ length: count }, () => randomString(length));
}

console.log(generateIds(3, 6)); // ["aB3xK9", "mN7pQ2", "rS9tVw"]

// Generate with timestamp for uniqueness
function generateUniqueId(): string {
  return `${Date.now()}_${randomString(8)}`;
}

console.log(generateUniqueId()); // "1702123456789_aB3xK9mP"

// Generate hex strings
function generateHex(length: number): string {
  return randomString(length, { chars: "0123456789ABCDEF" });
}

console.log(generateHex(8)); // "A7F3B2E9"

// Generate alphanumeric code (no ambiguous chars)
function generateCode(length: number = 8): string {
  // Exclude O, 0, I, 1, l to avoid confusion
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return randomString(length, { chars });
}

console.log(generateCode()); // "A7K9M2P3"

// Retry on collision
async function generateUniqueCode(
  checkExists: (code: string) => Promise<boolean>,
): Promise<string> {
  let code: string;
  do {
    code = randomString(8);
  } while (await checkExists(code));
  return code;
}
```

## reverse

Reverses the characters in a string.

### Signature

```typescript
function reverse(str: string): string;
```

### Parameters

- `str` - The string to reverse

### Returns

A new string with characters in reverse order.

### Example

```typescript
import { reverse } from "jalutils/string";

// Basic usage
console.log(reverse("hello")); // "olleh"
console.log(reverse("world")); // "dlrow"
console.log(reverse("JavaScript")); // "tpircSavaJ"

// With numbers
console.log(reverse("123")); // "321"
console.log(reverse("abc123")); // "321cba"

// With spaces
console.log(reverse("hello world")); // "dlrow olleh"
console.log(reverse(" spaces ")); // " secaps "

// With special characters
console.log(reverse("hello!")); // "!olleh"
console.log(reverse("@#$%")); // "%$#@"

// Edge cases
console.log(reverse("")); // ""
console.log(reverse("a")); // "a"
console.log(reverse("ab")); // "ba"

// Practical examples

// Check for palindromes
function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === reverse(cleaned);
}

console.log(isPalindrome("A man a plan a canal Panama")); // true
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false

// Reverse words in a sentence
function reverseWords(sentence: string): string {
  return sentence
    .split(" ")
    .map((word) => reverse(word))
    .join(" ");
}

console.log(reverseWords("hello world")); // "olleh dlrow"
console.log(reverseWords("The quick fox")); // "ehT kciuq xof"

// Obfuscate/encode text (simple)
function simpleEncode(text: string): string {
  return reverse(text);
}

function simpleDecode(encoded: string): string {
  return reverse(encoded);
}

const original = "secret message";
const encoded = simpleEncode(original); // "egassem terces"
const decoded = simpleDecode(encoded); // "secret message"
console.log({ original, encoded, decoded });

// Animation or display effects
function createReverseEffect(text: string): string[] {
  const frames: string[] = [];
  for (let i = 0; i <= text.length; i++) {
    frames.push(reverse(text.slice(0, i)) + text.slice(i));
  }
  return frames;
}

console.log(createReverseEffect("hello"));
// ["hello", "ehllo", "ehllo", "ellho", "olleh", "olleh"]

// Suffix extraction (reverse operations)
function extractExtension(filename: string): string {
  const reversed = reverse(filename);
  const dotIndex = reversed.indexOf(".");
  if (dotIndex === -1) return "";
  return reverse(reversed.slice(0, dotIndex));
}

console.log(extractExtension("document.pdf")); // "pdf"
console.log(extractExtension("archive.tar.gz")); // "gz"

// Mirror text display
function mirrorDisplay(text: string): string {
  return `${text} | ${reverse(text)}`;
}

console.log(mirrorDisplay("CODE")); // "CODE | EDOC"
console.log(mirrorDisplay("12345")); // "12345 | 54321"

// Reverse for comparison
function compareReversed(str1: string, str2: string): boolean {
  return reverse(str1) === str2;
}

console.log(compareReversed("abc", "cba")); // true
console.log(compareReversed("hello", "world")); // false

// Queue/Stack simulation with strings
function reverseOrder(items: string): string {
  // Reverse the order of characters
  return reverse(items);
}

console.log(reverseOrder("ABCD")); // "DCBA"

// Text transformation games
function createCipher(text: string, reverse: boolean): string {
  return reverse ? reverse(text) : text;
}

console.log(createCipher("message", true)); // "egassem"
console.log(createCipher("message", false)); // "message"
```

### Use Cases

- **Palindrome checking**: Verify if text reads the same forwards and backwards
- **String manipulation**: Reverse words or sentences for display
- **Simple encoding**: Basic text obfuscation
- **Algorithm challenges**: Common interview question implementation
- **Text effects**: Create visual effects or animations
- **Data processing**: Reverse sequences for specific use cases
- **Comparison operations**: Check if strings are reverses of each other
- **Fun text transformations**: Mirror or flip text displays

### Behavior Details

```typescript
import { reverse } from "jalutils/string";

// Character order is reversed
reverse("abc"); // "cba"
reverse("123"); // "321"

// Preserves spaces and special characters
reverse("hello world"); // "dlrow olleh"
reverse("hello!"); // "!olleh"
reverse("a b c"); // "c b a"

// Works with Unicode
reverse("café"); // "éfac"
reverse("🎉🎊"); // "🎊🎉"
reverse("привет"); // "тевирп"

// Empty or single character
reverse(""); // ""
reverse("a"); // "a"

// Whitespace preserved
reverse(" "); // " "
reverse("  hello  "); // "  olleh  "
```

### Notes

- Returns a new string (does not mutate the original)
- Preserves all characters including spaces and special characters
- Handles empty strings gracefully
- Works with Unicode characters
- Single character strings return themselves
- Reverses at character level, not byte level

### Common Patterns

```typescript
import { reverse } from "jalutils/string";

// Palindrome checker
function isPalindrome(str: string): boolean {
  const normalized = str.toLowerCase().replace(/\s+/g, "");
  return normalized === reverse(normalized);
}

// Reverse each word but keep word order
function reverseWords(sentence: string): string {
  return sentence
    .split(" ")
    .map((word) => reverse(word))
    .join(" ");
}

// Reverse word order but keep each word
function reverseWordOrder(sentence: string): string {
  return sentence.split(" ").reverse().join(" ");
}

console.log(reverseWordOrder("hello world")); // "world hello"

// Double reverse (returns original)
function doubleReverse(str: string): string {
  return reverse(reverse(str));
}

console.log(doubleReverse("hello")); // "hello"

// Conditional reverse
function conditionalReverse(str: string, shouldReverse: boolean): string {
  return shouldReverse ? reverse(str) : str;
}
```

## snakeCase

Converts a string to snake_case format.

### Signature

```typescript
function snakeCase(str: string): string;
```

### Parameters

- `str` - The string to convert to snake_case

### Returns

A new string in snake_case format.

### Example

```typescript
import { snakeCase } from "jalutils/string";

// Basic usage
console.log(snakeCase("hello world")); // "hello_world"
console.log(snakeCase("Hello World")); // "hello_world"
console.log(snakeCase("HELLO WORLD")); // "hello_world"

// From different formats
console.log(snakeCase("helloWorld")); // "helloworld"
console.log(snakeCase("hello-world")); // "hello_world"
console.log(snakeCase("hello world example")); // "hello_world_example"

// Multiple words
console.log(snakeCase("the quick brown fox")); // "the_quick_brown_fox"
console.log(snakeCase("user first name")); // "user_first_name"
console.log(snakeCase("database connection string")); // "database_connection_string"

// Edge cases
console.log(snakeCase("")); // ""
console.log(snakeCase("hello")); // "hello"
console.log(snakeCase("HELLO")); // "hello"
console.log(snakeCase("   hello   world   ")); // "hello_world"

// Practical examples

// Convert to database column names
function toColumnName(fieldName: string): string {
  return snakeCase(fieldName);
}

console.log(toColumnName("firstName")); // "first_name"
console.log(toColumnName("userEmail")); // "useremail"
console.log(toColumnName("created at")); // "created_at"

// Convert API request keys
function toApiKey(jsKey: string): string {
  return snakeCase(jsKey);
}

console.log(toApiKey("userId")); // "userid"
console.log(toApiKey("access token")); // "access_token"
console.log(toApiKey("refresh-token")); // "refresh_token"

// Environment variable names (commonly uppercase)
function toEnvVar(name: string): string {
  return snakeCase(name).toUpperCase();
}

console.log(toEnvVar("api key")); // "API_KEY"
console.log(toEnvVar("database url")); // "DATABASE_URL"
console.log(toEnvVar("max retry count")); // "MAX_RETRY_COUNT"

// Python function names
function toPythonFunction(name: string): string {
  return snakeCase(name);
}

console.log(toPythonFunction("getUserData")); // "getuserdata"
console.log(toPythonFunction("calculate total price")); // "calculate_total_price"
console.log(toPythonFunction("validateEmail")); // "validateemail"

// File naming (Python/Ruby convention)
function toPythonFileName(name: string): string {
  return `${snakeCase(name)}.py`;
}

console.log(toPythonFileName("user model")); // "user_model.py"
console.log(toPythonFileName("data processor")); // "data_processor.py"

// Convert object for Python/Ruby API
function convertToSnakeCase<T extends Record<string, any>>(
  obj: T,
): Record<string, any> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[snakeCase(key)] = obj[key];
      return acc;
    },
    {} as Record<string, any>,
  );
}

const jsObject = { firstName: "John", lastName: "Doe", isActive: true };
console.log(convertToSnakeCase(jsObject));
// { first_name: "John", last_name: "Doe", is_active: true }

// SQL query generation
function toSqlColumn(fieldName: string): string {
  return snakeCase(fieldName);
}

console.log(toSqlColumn("user id")); // "user_id"
console.log(toSqlColumn("created at")); // "created_at"
console.log(toSqlColumn("order total")); // "order_total"
```

### Use Cases

- **Database columns**: Convert field names to database column names
- **Python/Ruby APIs**: Convert JavaScript camelCase to Python/Ruby snake_case
- **Environment variables**: Generate env var names (often with .toUpperCase())
- **Configuration files**: Use in YAML, JSON configs that prefer snake_case
- **SQL queries**: Generate column names for queries
- **File naming**: Follow Python/Ruby file naming conventions
- **Cross-language data exchange**: Convert between naming conventions
- **Legacy system integration**: Match snake_case naming requirements

### Behavior Details

```typescript
import { snakeCase } from "jalutils/string";

// Converts spaces to underscores
snakeCase("hello world"); // "hello_world"
snakeCase("one two three"); // "one_two_three"

// Converts hyphens to underscores
snakeCase("hello-world"); // "hello_world"
snakeCase("user-first-name"); // "user_first_name"

// Converts to lowercase
snakeCase("Hello World"); // "hello_world"
snakeCase("HELLO WORLD"); // "hello_world"
snakeCase("CamelCase"); // "camelcase"

// Multiple separators
snakeCase("hello   world"); // "hello_world"
snakeCase("hello---world"); // "hello_world"

// Filters empty segments
snakeCase(" hello world "); // "hello_world"
snakeCase("  multiple  spaces  "); // "multiple_spaces"
```

### Notes

- Returns a new string (does not mutate the original)
- All characters are converted to lowercase
- Spaces and hyphens are converted to underscores
- Multiple consecutive separators are treated as one
- Empty strings return empty strings
- Filters out empty segments
- Does not convert camelCase (treats as single word)

### Common Patterns

```typescript
import { snakeCase } from "jalutils/string";

// Convert object keys
function toSnakeCaseKeys<T extends Record<string, any>>(
  obj: T,
): Record<string, any> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[snakeCase(key)] = obj[key];
      return acc;
    },
    {} as Record<string, any>,
  );
}

// Uppercase for constants
function toConstantCase(str: string): string {
  return snakeCase(str).toUpperCase();
}

console.log(toConstantCase("max retry count")); // "MAX_RETRY_COUNT"
console.log(toConstantCase("api-base-url")); // "API_BASE_URL"

// SQL-safe column names
function toSqlColumn(str: string): string {
  return snakeCase(str.replace(/[^a-zA-Z0-9\s-]/g, ""));
}

// Convert nested object
function deepSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(deepSnakeCase);
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce(
      (acc, key) => {
        acc[snakeCase(key)] = deepSnakeCase(obj[key]);
        return acc;
      },
      {} as Record<string, any>,
    );
  }
  return obj;
}
```

## stripTags

Removes all HTML tags from a string.

### Signature

```typescript
function stripTags(input: string): string;
```

### Parameters

- `input` - The string containing HTML tags to remove

### Returns

A string with all HTML tags removed.

### Example

```typescript
import { stripTags } from "jalutils/string";

// Basic usage
console.log(stripTags("<p>Hello</p>")); // "Hello"
console.log(stripTags("<div>World</div>")); // "World"
console.log(stripTags("<h1>Title</h1>")); // "Title"

// Multiple tags
console.log(stripTags("<p>Hello <strong>World</strong></p>")); // "Hello World"
console.log(stripTags("<div><span>Text</span></div>")); // "Text"

// Self-closing tags
console.log(stripTags("Line 1<br/>Line 2")); // "Line 1Line 2"
console.log(stripTags("Image: <img src='pic.jpg'/>")); // "Image: "

// Tags with attributes
console.log(stripTags('<a href="url">Link</a>')); // "Link"
console.log(stripTags('<div class="container">Content</div>')); // "Content"

// No tags
console.log(stripTags("Plain text")); // "Plain text"
console.log(stripTags("No HTML here")); // "No HTML here"

// Edge cases
console.log(stripTags("")); // ""
console.log(stripTags("<>")); // ""
console.log(stripTags("<tag")); // ""

// Practical examples

// Clean user input
function cleanInput(input: string): string {
  return stripTags(input).trim();
}

console.log(cleanInput("<script>alert('xss')</script>Hello")); // "alert('xss')Hello"

// Extract text from HTML
function extractText(html: string): string {
  return stripTags(html);
}

console.log(extractText("<p>Paragraph 1</p><p>Paragraph 2</p>")); // "Paragraph 1Paragraph 2"

// Preview generation
function generatePreview(html: string, maxLength: number = 100): string {
  const text = stripTags(html);
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

console.log(generatePreview("<p>Long HTML content...</p>", 20)); // "Long HTML content..."
```

### Use Cases

- **Sanitization**: Remove HTML from user input
- **Text extraction**: Get plain text from HTML content
- **Preview generation**: Create text previews from HTML
- **Search indexing**: Extract searchable text
- **Data cleaning**: Remove formatting from stored content

### Behavior Details

```typescript
import { stripTags } from "jalutils/string";

// Removes all tags
stripTags("<p>text</p>"); // "text"

// Preserves text content
stripTags("<b>bold</b> and <i>italic</i>"); // "bold and italic"

// Handles nested tags
stripTags("<div><p><span>nested</span></p></div>"); // "nested"

// Removes incomplete tags
stripTags("<tag"); // ""
stripTags("text <tag"); // "text "
```

### Notes

- Returns a new string (does not mutate the original)
- Removes all HTML/XML tags including self-closing tags
- Does not decode HTML entities (e.g., `&amp;` remains as is)
- Does not add spaces between tag boundaries
- Not suitable for XSS prevention alone (script content remains)
- For security, use proper HTML sanitization libraries

### Common Patterns

```typescript
import { stripTags } from "jalutils/string";

// Clean and trim
function cleanText(html: string): string {
  return stripTags(html).trim();
}

// Extract with normalization
function normalizeText(html: string): string {
  return stripTags(html).replace(/\s+/g, " ").trim();
}

console.log(normalizeText("<p>Text   with   spaces</p>")); // "Text with spaces"

// Safe preview
function safePreview(html: string, length: number = 100): string {
  const text = stripTags(html).trim();
  return text.length > length ? text.substring(0, length) + "..." : text;
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
import {
  camelCase,
  capitalize,
  kebabCase,
  reverse,
  snakeCase,
  truncate,
} from "jalutils/string";
```

```typescript [Named Import]
import {
  camelCase,
  capitalize,
  kebabCase,
  reverse,
  snakeCase,
  truncate,
} from "jalutils";
```

:::
