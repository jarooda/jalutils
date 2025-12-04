# Installation

## Prerequisites

Jalutils requires Node.js version 14 or higher.

## Package Manager

Install Jalutils using your preferred package manager:

::: code-group

```bash [npm]
npm install jalutils
```

```bash [pnpm]
pnpm add jalutils
```

```bash [yarn]
yarn add jalutils
```

```bash [bun]
bun add jalutils
```

:::

## Verify Installation

After installation, verify that Jalutils is working correctly:

```typescript
import { isNil } from "jalutils";

console.log(isNil(null)); // true
console.log(isNil(undefined)); // true
console.log(isNil(0)); // false
```

## TypeScript Configuration

Jalutils is written in TypeScript and includes type definitions. No additional setup is required for TypeScript projects.

For the best experience, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

## Next Steps

Now that you have Jalutils installed, learn how to use it:

- [Basic Usage](/guide/usage)
- [API Reference](/api/array)
