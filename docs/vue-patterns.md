# Vue 3 Component Architecture and Composition API Patterns

## Component Structure

### Single File Components (SFC)

Organize your Vue components with this structure:

```vue
<template>
  <!-- Template content -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ComponentName',
  // component options
})
</script>

<style scoped lang="scss">
/* Component styles */
</style>
```

## Vue 3 Composition API

### Setup Function

Use the `setup()` function to compose component logic:

```typescript
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)
    
    const doubleCount = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    return {
      count,
      doubleCount,
      increment
    }
  }
})
```

### Reactive State

- Use `ref()` for primitive values and objects
- Use `reactive()` for complex object hierarchies
- Always access `ref` values through `.value` in script, but not in template

```typescript
import { ref, reactive } from 'vue'

// Good: ref for single values
const count = ref(0)

// Good: reactive for complex objects
const user = reactive({
  name: 'John',
  email: 'john@example.com'
})
```

### Computed Properties

Use `computed()` for derived, reactive values:

```typescript
import { computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
```

### Lifecycle Hooks

Use lifecycle hook functions:

```typescript
import { onMounted, onUnmounted } from 'vue'

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log('Component mounted')
    })
    
    onUnmounted(() => {
      console.log('Component unmounted')
    })
  }
})
```

## Component Organization

### Props

Define props with TypeScript types:

```typescript
import { defineComponent, PropType } from 'vue'

interface User {
  id: string
  name: string
}

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
})
```

### Emits

Define emitted events:

```typescript
export default defineComponent({
  emits: {
    update: (value: string) => typeof value === 'string',
    close: () => true
  },
  setup(props, { emit }) {
    const handleClick = () => {
      emit('update', 'new value')
    }
    
    return { handleClick }
  }
})
```

## Styling Best Practices

- Use `scoped` attribute to limit styles to the component
- Use SCSS for variables and nesting
- Follow BEM-like naming conventions for class names

```vue
<style scoped lang="scss">
.component {
  &__header {
    font-size: 18px;
  }
  
  &__content {
    padding: 16px;
    
    &--active {
      background-color: blue;
    }
  }
}
</style>
```

## Reusable Composables

Extract reusable logic into composables:

```typescript
// useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  
  return {
    count,
    increment,
    decrement
  }
}

// Usage in component
setup() {
  const { count, increment, decrement } = useCounter(10)
  return { count, increment, decrement }
}
```

## Options API (Legacy - for existing components)

For existing components using Options API:

- Use `data()` for reactive state
- Use `computed` for derived values
- Use `methods` for functions
- Use `watch` for reactive side effects

```typescript
export default {
  data() {
    return {
      message: 'Hello'
    }
  },
  computed: {
    messageLength() {
      return this.message.length
    }
  },
  methods: {
    updateMessage(newMessage: string) {
      this.message = newMessage
    }
  }
}
```
