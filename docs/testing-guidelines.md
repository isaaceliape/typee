# Testing Strategies and Coverage Requirements

## Testing Pyramid

Follow the testing pyramid approach:

1. **Unit Tests** (70%): Test individual functions and components in isolation
2. **Integration Tests** (20%): Test multiple components working together
3. **E2E Tests** (10%): Test complete user workflows

## Unit Testing

### Using Vitest

Vitest is configured for this project. Run tests with:

```bash
npm test -- <test-file>
```

### Test Structure

```typescript
import { describe, it, expect, beforeEach } from 'vitest'

describe('Calculator', () => {
  let calculator: Calculator
  
  beforeEach(() => {
    calculator = new Calculator()
  })
  
  it('should add two numbers correctly', () => {
    const result = calculator.add(2, 3)
    expect(result).toBe(5)
  })
  
  it('should handle negative numbers', () => {
    const result = calculator.add(-2, 3)
    expect(result).toBe(1)
  })
})
```

### Mocking

Mock external dependencies:

```typescript
import { vi } from 'vitest'

// Mock a module
vi.mock('./api', () => ({
  fetchUser: vi.fn(() => Promise.resolve({ id: '1', name: 'John' }))
}))

// Mock a function
const mockFetch = vi.fn()
global.fetch = mockFetch
```

## Vue Component Testing

### Testing Composition API Components

```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Counter from '@/components/Counter.vue'

describe('Counter.vue', () => {
  it('renders initial count', () => {
    const wrapper = mount(Counter)
    expect(wrapper.text()).toContain('0')
  })
  
  it('increments count when button is clicked', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('1')
  })
  
  it('emits update event', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update')).toBeTruthy()
  })
})
```

### Testing Props and Emits

```typescript
describe('UserCard.vue', () => {
  it('renders user information from props', () => {
    const user = { id: '1', name: 'John', email: 'john@example.com' }
    const wrapper = mount(UserCard, {
      props: { user }
    })
    
    expect(wrapper.text()).toContain('John')
    expect(wrapper.text()).toContain('john@example.com')
  })
  
  it('emits edit event when edit button is clicked', async () => {
    const user = { id: '1', name: 'John', email: 'john@example.com' }
    const wrapper = mount(UserCard, { props: { user } })
    
    await wrapper.find('.edit-button').trigger('click')
    expect(wrapper.emitted('edit')).toBeTruthy()
  })
})
```

## Coverage Requirements

### Minimum Coverage Targets

- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

### Configure Coverage

In `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['node_modules/', 'dist/'],
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
})
```

## Test Best Practices

1. **Descriptive Names**: Use clear, descriptive test names
   ```typescript
   // Good
   it('should display error message when email is invalid')
   
   // Bad
   it('validates email')
   ```

2. **Arrange-Act-Assert Pattern**: Organize tests clearly
   ```typescript
   it('should calculate total price', () => {
     // Arrange
     const items = [
       { price: 10, quantity: 2 },
       { price: 5, quantity: 3 }
     ]
     
     // Act
     const total = calculateTotal(items)
     
     // Assert
     expect(total).toBe(35)
   })
   ```

3. **One Assertion Per Test**: Focus each test on one behavior
   ```typescript
   // Good
   it('should return user with correct id', () => {
     expect(user.id).toBe('123')
   })
   
   // Avoid
   it('should return user', () => {
     expect(user.id).toBe('123')
     expect(user.name).toBe('John')
     expect(user.email).toBe('john@example.com')
   })
   ```

4. **DRY Principle**: Extract common setup into `beforeEach`
   ```typescript
   beforeEach(() => {
     user = { id: '1', name: 'John', email: 'john@example.com' }
     wrapper = mount(UserCard, { props: { user } })
   })
   ```

5. **Test Edge Cases**: Always test boundary conditions
   ```typescript
   describe('divide', () => {
     it('should divide positive numbers', () => {
       expect(divide(10, 2)).toBe(5)
     })
     
     it('should divide negative numbers', () => {
       expect(divide(-10, 2)).toBe(-5)
     })
     
     it('should throw error when dividing by zero', () => {
       expect(() => divide(10, 0)).toThrow()
     })
   })
   ```

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- src/__tests__/helpers.test.ts

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch
```
