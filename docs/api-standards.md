# REST API Design and Error Handling

## API Response Format

### Success Response

All successful API responses should follow this format:

```typescript
interface ApiResponse<T> {
  success: true
  data: T
  timestamp: string
}
```

### Error Response

All error responses should follow this format:

```typescript
interface ApiErrorResponse {
  success: false
  error: {
    code: string
    message: string
    details?: Record<string, string>
  }
  timestamp: string
}
```

## HTTP Status Codes

Use appropriate status codes:

- **200 OK**: Successful request
- **201 Created**: Resource created successfully
- **204 No Content**: Successful request with no content to return
- **400 Bad Request**: Invalid request parameters
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Request conflicts with current state
- **422 Unprocessable Entity**: Validation error
- **500 Internal Server Error**: Server error
- **503 Service Unavailable**: Service temporarily unavailable

## Error Handling

### Error Classes

Create typed error classes for different error scenarios:

```typescript
class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: Record<string, string>
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

class ValidationError extends ApiError {
  constructor(message: string, details: Record<string, string>) {
    super('VALIDATION_ERROR', message, 422, details)
    this.name = 'ValidationError'
  }
}

class NotFoundError extends ApiError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404)
    this.name = 'NotFoundError'
  }
}
```

### Error Handling in API Calls

```typescript
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`)
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new ApiError(
        errorData.error.code,
        errorData.error.message,
        response.status,
        errorData.error.details
      )
    }
    
    const data = await response.json()
    return data.data
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`API Error [${error.code}]: ${error.message}`)
    } else {
      console.error('Unexpected error:', error)
    }
    throw error
  }
}
```

## Request/Response Types

### Pagination

```typescript
interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  pages: number
}
```

### Filters

```typescript
interface FilterParams {
  [key: string]: string | number | boolean | undefined
}

function buildQueryString(params: FilterParams): string {
  return Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&')
}
```

## API Client Pattern

```typescript
export class ApiClient {
  private baseUrl: string
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }
  
  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`)
    return this.handleResponse<T>(response)
  }
  
  async post<T>(path: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return this.handleResponse<T>(response)
  }
  
  private async handleResponse<T>(response: Response): Promise<T> {
    const json = await response.json()
    
    if (!response.ok) {
      throw new ApiError(
        json.error.code,
        json.error.message,
        response.status,
        json.error.details
      )
    }
    
    return json.data
  }
}
```

## Best Practices

1. **Versioning**: Include API version in URL paths (e.g., `/api/v1/users`)
2. **Consistency**: Use consistent naming conventions (camelCase for JSON)
3. **Documentation**: Document all endpoints with request/response examples
4. **Validation**: Validate all inputs on both client and server
5. **Logging**: Log all errors with sufficient context for debugging
6. **Rate Limiting**: Implement and communicate rate limits
7. **Caching**: Use appropriate cache headers
8. **CORS**: Configure CORS correctly for your use case
