# Pinia Store Examples and Migration Guide

This document provides practical examples for using Pinia stores in the Typee project and a step-by-step migration guide from Vuex to Pinia.

## Table of Contents

1. [Basic Store Examples](#basic-store-examples)
2. [Component Integration Examples](#component-integration-examples)
3. [Advanced Patterns](#advanced-patterns)
4. [Migration Guide: Vuex to Pinia](#migration-guide-vuex-to-pinia)
5. [Common Pitfalls](#common-pitfalls)

## Basic Store Examples

### Example 1: Simple State Management

```typescript
// src/store/modules/ui/index.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // State
  const menuOpen = ref(false)
  const sidebarVisible = ref(true)
  const notificationCount = ref(0)

  // Actions
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
  }

  const toggleSidebar = () => {
    sidebarVisible.value = !sidebarVisible.value
  }

  const setNotificationCount = (count: number) => {
    notificationCount.value = count
  }

  return {
    menuOpen,
    sidebarVisible,
    notificationCount,
    toggleMenu,
    toggleSidebar,
    setNotificationCount,
  }
})
```

**Usage in Component:**

```typescript
import { useUiStore } from '@/store/modules/ui'

export default defineComponent({
  setup() {
    const uiStore = useUiStore()

    const handleMenuClick = () => {
      uiStore.toggleMenu()
    }

    return {
      uiStore,
      handleMenuClick,
    }
  }
})
```

### Example 2: State with Computed Getters

```typescript
// src/store/modules/game/index.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGameStore = defineStore('game', () => {
  // State
  const totalAttempts = ref(0)
  const correctAttempts = ref(0)
  const errorCount = ref(0)

  // Getters (computed properties)
  const getAccuracyPercentage = computed(() => {
    if (totalAttempts.value === 0) return 0
    return (correctAttempts.value / totalAttempts.value) * 100
  })

  const getErrorRate = computed(() => {
    if (totalAttempts.value === 0) return 0
    return (errorCount.value / totalAttempts.value) * 100
  })

  const getWPM = computed(() => {
    // Simplified WPM calculation
    return correctAttempts.value * 12 // 12 = average characters per word
  })

  // Actions
  const recordAttempt = (correct: boolean) => {
    totalAttempts.value += 1
    if (correct) {
      correctAttempts.value += 1
    } else {
      errorCount.value += 1
    }
  }

  const resetStats = () => {
    totalAttempts.value = 0
    correctAttempts.value = 0
    errorCount.value = 0
  }

  return {
    // State
    totalAttempts,
    correctAttempts,
    errorCount,

    // Getters
    getAccuracyPercentage,
    getErrorRate,
    getWPM,

    // Actions
    recordAttempt,
    resetStats,
  }
})
```

**Usage in Component:**

```typescript
import { useGameStore } from '@/store/modules/game'

export default defineComponent({
  template: `
    <div>
      <p>Accuracy: {{ gameStore.getAccuracyPercentage.toFixed(1) }}%</p>
      <p>Error Rate: {{ gameStore.getErrorRate.toFixed(1) }}%</p>
      <p>WPM: {{ gameStore.getWPM }}</p>
      <button @click="gameStore.recordAttempt(true)">Record Success</button>
      <button @click="gameStore.resetStats">Reset</button>
    </div>
  `,
  setup() {
    const gameStore = useGameStore()
    return { gameStore }
  }
})
```

### Example 3: Array State Management

```typescript
// src/store/modules/articles/index.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Article {
  id: string
  title: string
  content: string
  date: Date
}

export const useArticleStore = defineStore('articles', () => {
  // State
  const articles = ref<Article[]>([])
  const selectedArticleId = ref<string | null>(null)

  // Getters
  const getSelectedArticle = computed(() => {
    if (!selectedArticleId.value) return null
    return articles.value.find(a => a.id === selectedArticleId.value)
  })

  const getArticleCount = computed(() => articles.value.length)

  const getRecentArticles = computed(() => {
    return [...articles.value].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5)
  })

  // Actions
  const addArticle = (article: Article) => {
    articles.value.push(article)
  }

  const removeArticle = (id: string) => {
    const index = articles.value.findIndex(a => a.id === id)
    if (index !== -1) {
      articles.value.splice(index, 1)
    }
  }

  const updateArticle = (id: string, updates: Partial<Article>) => {
    const article = articles.value.find(a => a.id === id)
    if (article) {
      Object.assign(article, updates)
    }
  }

  const selectArticle = (id: string) => {
    selectedArticleId.value = id
  }

  const clearArticles = () => {
    articles.value = []
    selectedArticleId.value = null
  }

  return {
    // State
    articles,
    selectedArticleId,

    // Getters
    getSelectedArticle,
    getArticleCount,
    getRecentArticles,

    // Actions
    addArticle,
    removeArticle,
    updateArticle,
    selectArticle,
    clearArticles,
  }
})
```

## Component Integration Examples

### Example 1: Using Store in Script Setup

```vue
<template>
  <div class="game-container">
    <p>Errors: {{ gameStore.errorCount }}</p>
    <p>Total Words: {{ gameStore.wordsCount }}</p>
    <p>Accuracy: {{ gameStore.getAccuracyPercentage }}%</p>

    <button @click="gameStore.increaseErrorCount">+1 Error</button>
    <button @click="gameStore.setWordsCount(10)">Set 10 Words</button>
    <button @click="handleReset">Reset Game</button>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'

const store = useAppStore()

const handleReset = () => {
  store.setErrorCount(0)
  store.setWordsCount(0)
}
</script>

<style scoped lang="scss">
.game-container {
  padding: 20px;
  border: 1px solid #ccc;
}
</style>
```

### Example 2: Reactive State Binding

```vue
<template>
  <div class="settings">
    <div>
      <label>Font Size: {{ uiStore.fontSize }}px</label>
      <input v-model.number="uiStore.fontSize" type="range" min="12" max="72" />
      <button @click="uiStore.increaseFontSize">Increase</button>
      <button @click="uiStore.decreaseFontSize">Decrease</button>
    </div>

    <div>
      <label>
        <input v-model="uiStore.darkMode" type="checkbox" />
        Dark Mode
      </label>
    </div>

    <div>
      <label>Font:</label>
      <select v-model="uiStore.selectedFont">
        <option v-for="font in uiStore.fonts" :key="font.value" :value="font.value">
          {{ font.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '@/store/modules/ui'

const uiStore = useUiStore()
</script>
```

### Example 3: Accessing Multiple Stores

```vue
<template>
  <div class="game-stats">
    <h2>{{ gameStore.getSelectedArticle?.title }}</h2>

    <div class="stats">
      <p>Errors: {{ appStore.errorCount }}</p>
      <p>WPM: {{ gameStore.getWPM }}</p>
      <p>Accuracy: {{ gameStore.getAccuracyPercentage.toFixed(1) }}%</p>
    </div>

    <div class="controls">
      <button @click="handleStartGame">Start Game</button>
      <button @click="handleEndGame">End Game</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { useGameStore } from '@/store/modules/game'

const appStore = useAppStore()
const gameStore = useGameStore()

const handleStartGame = () => {
  gameStore.resetStats()
  appStore.setDisableTyping(false)
}

const handleEndGame = () => {
  appStore.setDisableTyping(true)
}
</script>
```

## Advanced Patterns

### Pattern 1: Store Composition

```typescript
// Composing multiple stores in a single action

export const useGameOrchestrator = defineStore('gameOrchestrator', () => {
  const appStore = useAppStore()
  const gameStore = useGameStore()
  const uiStore = useUiStore()

  const startNewGame = (articleId: string) => {
    // Reset all relevant state
    gameStore.resetStats()
    appStore.setErrorCount(0)
    appStore.setWordsCount(0)
    
    // Load article
    // const article = await fetchArticle(articleId)
    // appStore.setArticle(article.content)

    // Show game UI
    uiStore.setMenuOpen(false)
  }

  const endGame = () => {
    appStore.setDisableTyping(true)
    // Save stats
    // await saveGameStats(gameStore.$state)
  }

  return {
    startNewGame,
    endGame,
  }
})
```

### Pattern 2: Async Actions

```typescript
// src/store/modules/api/index.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Article {
  id: string
  title: string
  content: string
}

export const useArticleApiStore = defineStore('articleApi', () => {
  // State
  const articles = ref<Article[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  const fetchArticles = async () => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      articles.value = [
        { id: '1', title: 'Article 1', content: 'Content 1' },
        { id: '2', title: 'Article 2', content: 'Content 2' },
      ]
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const fetchArticle = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      const article = articles.value.find(a => a.id === id)
      if (!article) {
        throw new Error('Article not found')
      }

      return article
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    articles,
    loading,
    error,
    fetchArticles,
    fetchArticle,
  }
})
```

**Usage:**

```vue
<template>
  <div v-if="apiStore.loading">Loading...</div>
  <div v-else-if="apiStore.error">{{ apiStore.error }}</div>
  <div v-else>
    <p v-for="article in apiStore.articles" :key="article.id">
      {{ article.title }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useArticleApiStore } from '@/store/modules/api'

const apiStore = useArticleApiStore()

onMounted(() => {
  apiStore.fetchArticles()
})
</script>
```

### Pattern 3: Persisted State

```typescript
// src/store/modules/preferences/index.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const usePreferencesStore = defineStore('preferences', () => {
  // Initialize from localStorage
  const loadPreferences = () => {
    const saved = localStorage.getItem('appPreferences')
    return saved ? JSON.parse(saved) : {}
  }

  const saved = loadPreferences()

  // State
  const darkMode = ref(saved.darkMode ?? false)
  const fontSize = ref(saved.fontSize ?? 16)
  const selectedFont = ref(saved.selectedFont ?? 'Ubuntu')

  // Watch for changes and persist
  watch([darkMode, fontSize, selectedFont], () => {
    localStorage.setItem(
      'appPreferences',
      JSON.stringify({
        darkMode: darkMode.value,
        fontSize: fontSize.value,
        selectedFont: selectedFont.value,
      })
    )
  })

  // Actions
  const resetPreferences = () => {
    darkMode.value = false
    fontSize.value = 16
    selectedFont.value = 'Ubuntu'
  }

  return {
    darkMode,
    fontSize,
    selectedFont,
    resetPreferences,
  }
})
```

## Migration Guide: Vuex to Pinia

### Step 1: Understand Current Vuex Structure

**Before (Vuex):**

```typescript
// vuex store structure
const state = {
  errorCount: 0,
  wordsCount: 0,
  showCapitalLetters: false,
}

const mutations = {
  SET_ERROR_COUNT(state, payload) {
    state.errorCount = payload
  },
  INCREASE_ERROR_COUNT(state) {
    state.errorCount += 1
  },
}

const actions = {
  setErrorCount({ commit }, payload) {
    commit('SET_ERROR_COUNT', payload)
  },
  increaseErrorCount({ commit }) {
    commit('INCREASE_ERROR_COUNT')
  },
}

const getters = {
  sentencesCount: (state) => state.sentences.length,
}
```

### Step 2: Convert to Pinia

**After (Pinia):**

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State (no need for mutations)
  const errorCount = ref(0)
  const wordsCount = ref(0)
  const showCapitalLetters = ref(false)

  // Getters (using computed)
  const getSentencesCount = computed(() => sentences.value.length)

  // Actions (direct state modification)
  const setErrorCount = (payload: number) => {
    errorCount.value = payload
  }

  const increaseErrorCount = () => {
    errorCount.value += 1
  }

  // Return public API
  return {
    errorCount,
    wordsCount,
    showCapitalLetters,
    getSentencesCount,
    setErrorCount,
    increaseErrorCount,
  }
})
```

### Step 3: Update Component Imports

**Before (Vuex):**

```typescript
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const errorCount = computed(() => store.state.errorCount)
    const sentencesCount = computed(() => store.getters.sentencesCount)

    const handleIncreaseError = () => {
      store.dispatch('increaseErrorCount')
    }

    return {
      errorCount,
      sentencesCount,
      handleIncreaseError,
    }
  }
}
```

**After (Pinia):**

```typescript
import { useAppStore } from '@/store/app'

export default {
  setup() {
    const store = useAppStore()

    // Direct access (automatically reactive)
    const errorCount = store.errorCount
    const sentencesCount = store.getSentencesCount

    const handleIncreaseError = () => {
      store.increaseErrorCount()
    }

    return {
      errorCount,
      sentencesCount,
      handleIncreaseError,
    }
  }
}
```

### Step 4: Template Updates

**Before (Vuex):**

```vue
<template>
  <div>
    <p>Errors: {{ $store.state.errorCount }}</p>
    <p>Sentences: {{ $store.getters.sentencesCount }}</p>
    <button @click="$store.dispatch('increaseErrorCount')">+1</button>
  </div>
</template>
```

**After (Pinia):**

```vue
<template>
  <div>
    <p>Errors: {{ store.errorCount }}</p>
    <p>Sentences: {{ store.getSentencesCount }}</p>
    <button @click="store.increaseErrorCount">+1</button>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
const store = useAppStore()
</script>
```

### Step 5: Migration Checklist

- [ ] Understand current Vuex store structure
- [ ] Convert state to ref() properties
- [ ] Convert getters to computed() properties
- [ ] Convert mutations and actions to simple functions
- [ ] Create Pinia store with composition API pattern
- [ ] Update all component imports (Vuex → Pinia)
- [ ] Update template references ($store → direct store reference)
- [ ] Remove computed() wrappers from script (direct access)
- [ ] Test all store interactions
- [ ] Remove old Vuex store files

## Common Pitfalls

### Pitfall 1: Forgetting `.value` in Script

```typescript
// ❌ Wrong - accessing ref without .value in script
const store = useAppStore()
const count = store.errorCount + 1  // errorCount is a ref!

// ✅ Correct - unnecessary because store properties are already reactive
const store = useAppStore()
const count = computed(() => store.errorCount + 1)

// ✅ Or in component template (no .value needed)
<p>{{ store.errorCount }}</p>
```

### Pitfall 2: Modifying State Outside of Store

```typescript
// ❌ Wrong - modifying state in component
const store = useAppStore()
store.errorCount.value = 10  // Direct mutation outside actions

// ✅ Correct - use store actions
const store = useAppStore()
store.setErrorCount(10)
```

### Pitfall 3: Not Returning from Store

```typescript
// ❌ Wrong - forgetting return statement
export const useAppStore = defineStore('app', () => {
  const errorCount = ref(0)
  const setErrorCount = (val: number) => {
    errorCount.value = val
  }
  // Missing return statement!
})

// ✅ Correct - explicit return
export const useAppStore = defineStore('app', () => {
  const errorCount = ref(0)
  const setErrorCount = (val: number) => {
    errorCount.value = val
  }
  return {
    errorCount,
    setErrorCount,
  }
})
```

### Pitfall 4: Not Type-Checking Parameters

```typescript
// ❌ Wrong - no type checking
const setErrorCount = (payload) => {
  errorCount.value = payload
}

// ✅ Correct - typed parameters
const setErrorCount = (payload: number) => {
  errorCount.value = payload
}
```

## Summary

Key takeaways for using Pinia in Typee:

1. **Simpler than Vuex**: No mutations needed, actions modify state directly
2. **Better TypeScript**: Types flow automatically with no extra work
3. **Composition API**: Use ref() and computed() patterns
4. **Template Bindings**: Direct access to store properties, no special syntax
5. **Testing**: Much easier to test, no need for commit/dispatch mocking
6. **Performance**: Smaller bundle size, better tree-shaking

For more information, visit the [Pinia Documentation](https://pinia.vuejs.org).
