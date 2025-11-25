# Pinia Store Architecture Guide

This document establishes the comprehensive Pinia store architecture and best practices for the Typee project.

## Overview

Pinia is the official state management library for Vue 3, replacing Vuex. It provides a simpler, more type-safe API with full TypeScript support and better developer experience.

### Key Benefits
- **Simple API**: Intuitive store definition without mutations
- **Type Safety**: Full TypeScript support with automatic type inference
- **Developer Experience**: Better DevTools integration and debugging
- **Performance**: Smaller bundle size compared to Vuex
- **Composition API**: Native support for Vue 3's Composition API

## Store Structure

### Directory Organization

```
src/
  store/
    modules/           # Feature-specific stores (when project grows)
      ui/
        index.ts       # UI store
      game/
        index.ts       # Game logic store
    types/             # Shared store types and interfaces
      index.ts         # Centralized type definitions
    app.ts             # Root app store (currently main store)
    index.ts           # Store initialization and export
```

### Current Structure

For the current project phase, the main store is located in `src/store/app.ts`. As the project grows, create feature-specific stores in the `modules/` directory.

## Naming Conventions

### State Properties
- Use **camelCase** for all state properties
- Prefix with meaningful domain (e.g., `fontSize`, `selectedFont`, `menuOpen`)
- Use descriptive names that indicate purpose
- Boolean properties: prefix with `is`, `show`, `has`, `can`, `disable` (e.g., `showCapitalLetters`, `disableTyping`)

```typescript
// Good state names
const errorCount = ref(0)
const menuOpen = ref(false)
const selectedFont = ref('Ubuntu')
const disableTyping = ref(true)
const darkMode = ref(false)

// Avoid single letters or unclear names
// const x = ref(0)           // Bad: unclear purpose
// const isX = ref(false)     // Bad: unclear purpose
```

### Getters
- Use **camelCase** with descriptive names
- Prefix with `get` for computed state (e.g., `getSentencesCount`, `getErrorPercentage`)
- Represent derived state, not raw state
- Should be read-only (use `computed()`)

```typescript
// Good getter names
const getSentencesCount = computed(() => sentences.value.length)
const getWordCount = computed(() => value.value.split(' ').length)
const getErrorRate = computed(() => (errorCount.value / totalAttempts.value) * 100)

// Avoid
// const sentences = computed(...)  // This is state, not derived
// const count = computed(...)      // Unclear what is being counted
```

### Actions
- Use **camelCase** verb-based names
- Start with action type: `set`, `toggle`, `increase`, `decrease`, `reset`, etc.
- Action names should clearly indicate what they do
- Keep actions focused and single-purpose

```typescript
// Good action names
const setMenuOpen = (payload: boolean) => { ... }
const toggleMenuOpen = () => { ... }
const increaseFontSize = () => { ... }
const decreaseFontSize = () => { ... }
const resetGameState = () => { ... }
const setSentences = (payload: string[]) => { ... }

// Avoid
// const open = () => { ... }              // Unclear what is being opened
// const handleClick = () => { ... }       // This is a method, not a store action
// const x = (p) => { ... }                // Unclear purpose and poor naming
```

### Type Names
- Use **PascalCase** for interfaces and types
- Prefix with domain context (e.g., `Font`, `GameState`, `UiSettings`)
- Suffix with `State` for state interfaces, `Config` for configuration

```typescript
// Good type names
interface Font { text: string; value: string }
interface GameState { errorCount: number; sentences: string[] }
interface UiConfig { darkMode: boolean; fontSize: number }

// Avoid
// interface font { }          // Should be PascalCase
// interface S { }             // Too short, unclear
```

## Store Definition Pattern

### Using Composition API (Recommended)

The project uses Pinia's **Composition API** pattern, which is the modern approach:

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Font {
  text: string
  value: string
}

export const useAppStore = defineStore('app', () => {
  // State (use ref for reactive values)
  const errorCount = ref(0)
  const selectedFont = ref('')
  const fonts = ref<Font[]>([])

  // Getters (use computed for derived state)
  const getSentencesCount = computed(() => sentences.value.length)

  // Actions (regular functions)
  const setErrorCount = (payload: number) => {
    errorCount.value = payload
  }

  const increaseErrorCount = () => {
    errorCount.value += 1
  }

  // Return public API
  return {
    // State
    errorCount,
    selectedFont,
    fonts,

    // Getters
    getSentencesCount,

    // Actions
    setErrorCount,
    increaseErrorCount,
  }
})
```

### Key Points

1. **State Definition**: Use `ref()` for all reactive state
2. **Getters**: Use `computed()` for derived state
3. **Actions**: Regular functions that modify state
4. **Return Statement**: Explicitly return the public API (prevents accidental exposure)
5. **Type Safety**: Always type state and action parameters

## Component Usage

### Using Stores in Components

```typescript
import { useAppStore } from '@/store/app'

export default defineComponent({
  setup() {
    const store = useAppStore()

    // Access state (automatically reactive in template)
    const errorCount = store.errorCount
    const selectedFont = store.selectedFont

    // Access getters
    const sentenceCount = store.getSentencesCount

    // Call actions
    const handleIncreaseError = () => {
      store.increaseErrorCount()
    }

    const handleFontChange = (font: string) => {
      store.setSelectedFont(font)
    }

    return {
      errorCount,
      selectedFont,
      sentenceCount,
      handleIncreaseError,
      handleFontChange,
    }
  }
})
```

### In Templates

```vue
<template>
  <div>
    <!-- Direct access to state and getters -->
    <p>Errors: {{ store.errorCount }}</p>
    <p>Total Sentences: {{ store.getSentencesCount }}</p>
    <p>Font: {{ store.selectedFont }}</p>

    <!-- Call actions -->
    <button @click="store.increaseErrorCount">+1 Error</button>
    <button @click="store.toggleMenuOpen">Toggle Menu</button>
  </div>
</template>
```

## Best Practices

### 1. Single Responsibility Principle
Keep stores focused on a specific domain:
- `app.ts` - Game/application state
- `ui/index.ts` - UI preferences and layout state
- `game/index.ts` - Game logic and statistics

```typescript
// Good: Focused store
export const useGameStore = defineStore('game', () => {
  const errorCount = ref(0)
  const wordsCount = ref(0)
  
  // Only game-related actions
  const increaseErrorCount = () => { ... }
  const updateWordCount = (count: number) => { ... }
})

// Avoid: Mixed concerns
export const useMegaStore = defineStore('mega', () => {
  // Game state
  const errorCount = ref(0)
  // UI state
  const isDarkMode = ref(false)
  // API state
  const articles = ref([])
  // All mixed together - hard to maintain
})
```

### 2. Immutability Patterns

While Pinia allows direct mutation, treat state as immutable when possible:

```typescript
// Good: Replace entire object (immutable pattern)
const setFonts = (payload: Font[]) => {
  fonts.value = [...payload]
}

// Good: Simple assignment for primitives
const setErrorCount = (payload: number) => {
  errorCount.value = payload
}

// Acceptable: Direct mutation for simple values
const increaseErrorCount = () => {
  errorCount.value += 1
}
```

### 3. Async Operations

Use async actions for API calls:

```typescript
export const useArticleStore = defineStore('article', () => {
  const articles = ref<Article[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Async action
  const fetchArticles = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('/api/articles')
      articles.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  return {
    articles,
    loading,
    error,
    fetchArticles,
  }
})
```

### 4. Store Initialization

Initialize stores in `main.ts`:

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

### 5. Persistence

For persisted state, use Pinia plugins:

```typescript
// store/index.ts
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(createPersistedState())

export default pinia
```

### 6. Testing Stores

```typescript
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '@/store/app'

describe('App Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should increase error count', () => {
    const store = useAppStore()
    expect(store.errorCount).toBe(0)
    
    store.increaseErrorCount()
    expect(store.errorCount).toBe(1)
  })

  it('should toggle menu', () => {
    const store = useAppStore()
    expect(store.menuOpen).toBe(false)
    
    store.toggleMenuOpen()
    expect(store.menuOpen).toBe(true)
  })
})
```

## Module Structure (For Future Growth)

When the application grows, organize stores by feature:

### Step 1: Create module directory structure

```
src/store/
  modules/
    ui/
      index.ts        # UI-specific store
      types.ts        # UI types
    game/
      index.ts        # Game-specific store
      types.ts        # Game types
  types/
    index.ts          # Shared types
  app.ts              # Root/composition store
  index.ts            # Central export
```

### Step 2: Define module stores

```typescript
// src/store/modules/ui/index.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const darkMode = ref(false)
  const fontSize = ref(30)
  const menuOpen = ref(false)

  const toggleDarkMode = () => { ... }
  const setFontSize = (size: number) => { ... }

  return { darkMode, fontSize, menuOpen, toggleDarkMode, setFontSize }
})

// src/store/modules/game/index.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  const errorCount = ref(0)
  const wordsCount = ref(0)

  const increaseErrorCount = () => { ... }
  const setWordsCount = (count: number) => { ... }

  return { errorCount, wordsCount, increaseErrorCount, setWordsCount }
})
```

### Step 3: Export from central location

```typescript
// src/store/index.ts
export { useAppStore } from './app'
export { useUiStore } from './modules/ui'
export { useGameStore } from './modules/game'
```

## Migration Guide (Vuex to Pinia)

### Before (Vuex)
```typescript
// Vuex store
const state = {
  errorCount: 0
}

const mutations = {
  SET_ERROR_COUNT(state, payload) {
    state.errorCount = payload
  }
}

const actions = {
  increaseErrorCount({ commit }) {
    commit('SET_ERROR_COUNT', this.state.errorCount + 1)
  }
}
```

### After (Pinia)
```typescript
// Pinia store
export const useAppStore = defineStore('app', () => {
  const errorCount = ref(0)

  const setErrorCount = (payload: number) => {
    errorCount.value = payload
  }

  const increaseErrorCount = () => {
    errorCount.value += 1
  }

  return { errorCount, setErrorCount, increaseErrorCount }
})
```

### Key Differences
1. No mutations - actions modify state directly
2. No explicit module structure required (can use multiple stores)
3. Better TypeScript inference - types flow automatically
4. Simpler testing - no need for mocking commit/dispatch

## TypeScript Integration

Always provide type safety:

```typescript
// Good: Types defined
interface Font {
  text: string
  value: string
}

const fonts = ref<Font[]>([])

// Good: Action parameters typed
const setErrorCount = (payload: number) => {
  errorCount.value = payload
}

// Avoid: Any types
const fonts = ref<any[]>([])

// Avoid: Untyped parameters
const setErrorCount = (payload) => {
  errorCount.value = payload
}
```

## Common Patterns

### Toggle Pattern
```typescript
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
}

const toggleMenuOpen = () => {
  menuOpen.value = !menuOpen.value
}
```

### Increment/Decrement Pattern
```typescript
const increaseFontSize = () => {
  fontSize.value += 2
}

const decreaseFontSize = () => {
  fontSize.value -= 2
}

const increaseErrorCount = () => {
  errorCount.value += 1
}
```

### Set with Validation Pattern
```typescript
const setFontSize = (payload: number) => {
  // Validate before setting
  if (payload < 12 || payload > 72) {
    console.warn('Font size must be between 12 and 72')
    return
  }
  fontSize.value = payload
}
```

### Reset Pattern
```typescript
const resetGameState = () => {
  errorCount.value = 0
  wordsCount.value = 0
  sentencePos.value = 0
  value.value = ''
}
```

## Performance Considerations

1. **Avoid Large Monolithic Stores**: Split into multiple feature-specific stores
2. **Use Computed for Derived State**: Don't duplicate calculations
3. **Lazy Load Stores**: Initialize only when needed
4. **Monitor Bundle Size**: Keep store definitions concise

## Debugging

### Pinia DevTools
Install Vue DevTools and use the Pinia tab to:
- Inspect store state
- Track mutations/actions
- Time-travel through state changes
- Diff state between timeline points

### Console Logging
```typescript
const store = useAppStore()
console.log('Store state:', store.$state)
console.log('Getters:', {
  sentencesCount: store.getSentencesCount
})
```

## Summary

Pinia provides a modern, type-safe state management solution. Follow these principles:

1. **Clear Naming**: Use descriptive camelCase names with prefixes
2. **Single Responsibility**: Keep stores focused
3. **Type Safety**: Always type state and parameters
4. **Composition API**: Use ref/computed pattern
5. **Actions First**: Organize actions logically
6. **Documentation**: Comment complex logic
7. **Testing**: Test store logic independently
8. **Performance**: Monitor and optimize

For questions or clarifications, refer to the [Pinia Documentation](https://pinia.vuejs.org).
