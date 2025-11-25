# TypeScript Guidelines

## General Principles

- Write type-safe code to catch errors at compile time
- Avoid using `any` type; use `unknown` if type is truly unknown
- Leverage TypeScript's type inference when types are obvious
- Document complex types with JSDoc comments

## Type Definitions

### Interfaces vs Types

- Use `interface` for object shapes and class contracts
- Use `type` for unions, tuples, and utility types
- Prefer `interface` for public APIs and extensibility

```typescript
// Good: Interface for public API
interface User {
  id: string
  name: string
  email: string
}

// Good: Type for union
type UserRole = 'admin' | 'user' | 'guest'

// Good: Type for utility
type ReadonlyUser = Readonly<User>
```

### Generic Types

- Use generics for reusable, type-safe components
- Constrain generics when necessary

```typescript
function getValue<T>(obj: Record<string, T>, key: string): T | undefined {
  return obj[key]
}
```

## Function Signatures

- Always specify return types explicitly
- Use optional parameters (`?`) sparingly; prefer overloads or union types
- Document parameters with JSDoc

```typescript
/**
 * Formats a user's full name
 * @param user - The user object
 * @returns Formatted full name
 */
function formatUserName(user: User): string {
  return `${user.name} (${user.email})`
}
```

## Error Handling

- Create custom error types for domain-specific errors
- Use type guards for runtime type checking

```typescript
class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError
}
```

## Strict Mode

Keep `strict: true` in `tsconfig.json` to enforce:
- No implicit `any`
- Strict null/undefined checking
- Strict function types
- Strict property initialization

## Module Organization

- One exported interface/type per file when possible
- Group related utilities together
- Use clear, descriptive file names

```
src/
  types/
    user.ts
    api.ts
  utils/
    validation.ts
    formatting.ts
```
