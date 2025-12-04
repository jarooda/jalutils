# Date Utilities

Utilities for working with dates and timestamps.

## unix

Converts a date to Unix timestamp (seconds since January 1, 1970 UTC). Works with Date objects, strings, and millisecond timestamps.

### Signature

```typescript
function unix(date: Date | string | number): number;
```

### Parameters

- `date` - The date to convert. Can be:
  - `Date` object
  - ISO date string
  - Millisecond timestamp (will be converted to seconds)

### Returns

Unix timestamp in seconds (integer).

### Example

```typescript
import { unix } from "jalutils/date";

// From Date object
const now = new Date();
const timestamp = unix(now);
console.log(timestamp); // e.g., 1733270400

// From ISO string
const dateString = "2025-12-04T00:00:00.000Z";
const fromString = unix(dateString);
console.log(fromString); // 1733270400

// From millisecond timestamp
const milliseconds = 1733270400000;
const fromMs = unix(milliseconds);
console.log(fromMs); // 1733270400

// Practical examples

// Get current timestamp
const currentTimestamp = unix(new Date());

// Convert user input date
const userDate = "2025-01-01";
const userTimestamp = unix(userDate);

// Convert specific date
const specificDate = new Date("2025-12-25");
const christmasTimestamp = unix(specificDate);
console.log(christmasTimestamp); // Unix timestamp for Christmas 2025

// Compare dates
const date1 = unix("2025-01-01");
const date2 = unix("2025-12-31");
const daysDiff = (date2 - date1) / (60 * 60 * 24);
console.log(`${daysDiff} days`); // 364 days

// API usage
interface Event {
  id: number;
  name: string;
  timestamp: number;
}

function createEvent(name: string, date: Date): Event {
  return {
    id: Math.random(),
    name,
    timestamp: unix(date),
  };
}

// Database storage
const event = {
  title: "Conference",
  startTime: unix(new Date("2025-03-15T09:00:00")),
  endTime: unix(new Date("2025-03-15T17:00:00")),
};
```

### Use Cases

- **API interactions**: Many APIs use Unix timestamps
- **Database storage**: Store dates as integers for efficient querying
- **Date comparison**: Easier to compare as numbers
- **Time calculations**: Perform arithmetic on timestamps
- **Caching**: Use timestamps as cache keys
- **Logging**: Timestamp events with Unix time

### Unix Timestamp Format

Unix timestamps represent seconds since the Unix epoch (January 1, 1970 00:00:00 UTC):

```typescript
// Example timestamps
unix("1970-01-01T00:00:00Z"); // 0 (epoch start)
unix("2000-01-01T00:00:00Z"); // 946684800
unix("2025-12-04T00:00:00Z"); // 1733270400
```

### Working with Timestamps

```typescript
import { unix } from "jalutils/date";

// Convert back to Date
const timestamp = unix(new Date());
const date = new Date(timestamp * 1000); // Multiply by 1000 for milliseconds

// Add days to timestamp
const today = unix(new Date());
const tomorrow = today + 24 * 60 * 60; // Add 86400 seconds
const nextWeek = today + 7 * 24 * 60 * 60;

// Time ago calculation
function timeAgo(timestamp: number): string {
  const now = unix(new Date());
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);

  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
}

// Expiration check
function isExpired(expirationTimestamp: number): boolean {
  return unix(new Date()) > expirationTimestamp;
}

// Session management
interface Session {
  token: string;
  createdAt: number;
  expiresAt: number;
}

function createSession(token: string, durationHours: number): Session {
  const now = unix(new Date());
  return {
    token,
    createdAt: now,
    expiresAt: now + durationHours * 3600,
  };
}

function isSessionValid(session: Session): boolean {
  return unix(new Date()) < session.expiresAt;
}
```

### Notes

- Returns an **integer** (seconds), not milliseconds
- Handles Date objects, strings, and numbers
- Input numbers are treated as milliseconds and converted to seconds
- Output is always in seconds (Unix standard)
- Timezone-independent (always UTC)
- Works with any valid date string format supported by JavaScript's `Date` constructor

### Common Conversions

```typescript
// Seconds to milliseconds
const seconds = unix(new Date());
const milliseconds = seconds * 1000;

// Milliseconds to seconds
const ms = Date.now();
const sec = unix(ms);

// Seconds to Date object
const timestamp = 1733270400;
const dateObj = new Date(timestamp * 1000);
```

## Import

::: code-group

```typescript [Category Import (Recommended)]
import { unix } from "jalutils/date";
```

```typescript [Named Import]
import { unix } from "jalutils";
```

:::
