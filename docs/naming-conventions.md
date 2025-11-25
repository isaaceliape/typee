# Pinia Store Naming Conventions and Guidelines

This document provides detailed naming conventions and guidelines for Pinia store development in the Typee project.

## Quick Reference

| Concept | Convention | Prefix/Suffix | Examples |
|---------|-----------|---------------|----------|
| **State** | camelCase | descriptive domain prefix | `errorCount`, `selectedFont`, `menuOpen` |
| **Boolean State** | camelCase | `is`, `show`, `has`, `can`, `disable` | `showCapitalLetters`, `disableTyping` |
| **Getters** | camelCase | `get` prefix | `getSentencesCount`, `getErrorRate` |
| **Actions** | camelCase | verb-based (set, toggle, increase, etc) | `setErrorCount`, `toggleMenuOpen` |
| **Types** | PascalCase | domain + State/Config suffix | `Font`, `GameState`, `UiConfig` |
| **Interfaces** | PascalCase | descriptive, result suffix for getters | `Font`, `AppStoreApi`, `SentencesCountResult` |

## State Property Naming

### General Rules

1. **Use camelCase** for all state properties
2. **Be descriptive** - the name should indicate purpose and domain
3. **Avoid single letters** - never use `x`, `y`, `val`, `tmp`
4. **Use meaningful prefixes** - group related state logically

### Examples

#### Good State Names

```typescript
// Numeric counters
errorCount           // number of errors
wordsCount           // total words typed
sentencePos          // current sentence position
fontSize             // font size in pixels

// Boolean flags with clear prefixes
showCapitalLetters   // display capital letters
disableTyping        // typing disabled state
menuOpen             // menu visibility
darkMode             // dark mode enabled

// Collections and strings
sentences            // array of sentences
selectedFont         // currently selected font
articleTitle         // title of article
sourceText           // original text before processing
```

#### Bad State Names

```typescript
// Single letters or unclear
x                    // What is x?
count                // Count of what?
val                  // Value of what?
data                 // What data?

// Ambiguous
text                 // Which text? Use sourceText, finalText, articleTitle
state                // Too generic
flag                 // What flag?

// Not descriptive enough
mode                 // Which mode? Use darkMode
open                 // What's open? Use menuOpen
active               // What's active? Use showCapitalLetters
```

## Boolean Property Naming

### Recommended Prefixes

Choose one prefix consistently within the store:

| Prefix | Use Case | Example |
|--------|----------|---------|
| `is` | State/condition | `isLoading`, `isValid`, `isActive` |
| `show` | Visibility | `showCapitalLetters`, `showMenu` |
| `has` | Possession/availability | `hasError`, `hasData` |
| `can` | Capability/permission | `canEdit`, `canDelete` |
| `disable` | Disabled state | `disableTyping`, `disableSubmit` |

### Examples

```typescript
// Good: Clear prefix indicating state
showCapitalLetters   // Should capital letters be shown?
disableTyping        // Is typing disabled?
menuOpen             // Is menu open? (or showMenu)
darkMode             // Is dark mode enabled?

// Avoid: Ambiguous or missing prefix
capitals             // Not clear if showing or hiding
typing               // Not clear if enabled or disabled
menu                 // Not clear if open or closed
dark                 // Not clear if enabled or disabled
```

## Getter Naming

### Rules

1. **Use `get` prefix** for all computed/derived state
2. **Be descriptive** about what is being computed
3. **Plural or singular** based on return type
4. **Include units if relevant** for numeric getters

### Examples

#### Good Getter Names

```typescript
// Count getters - return numbers
getSentencesCount    // Returns: number
getWordCount         // Returns: number
getErrorCount        // Might duplicate state, but ok if computed

// Derived getters - computed from multiple values
getErrorRate         // Computed: (errors / total) * 100
getAccuracyPercentage // Computed: (correct / total) * 100
getProgressPercentage // Computed from current position

// Array/list getters
getActiveFonts       // Returns: Font[] (filtered, active fonts)
getAvailableLanguages // Returns: string[] (available options)

// Boolean/status getters
getIsGameOver        // Returns: boolean (derived game state)
getHasErrors         // Returns: boolean (errorCount > 0)
```

#### Bad Getter Names

```typescript
// No prefix
sentences            // This should be state or getSentences
count                // Ambiguous, use getSentencesCount
words                // Ambiguous, use getWordCount

// Wrong prefix
fetchArticles        // Not a getter, this is an action
computeStats         // Too generic, use getStats
calculateFinal       // Too generic, use getFinalStats

// Misleading
getSentences         // If this returns a computed value, ok. If it's just state, should be state property
```

## Action Naming

### Rules

1. **Use verb-first naming** - action describes what it does
2. **Use consistent verbs** across the store
3. **Be specific** about what property/state is affected
4. **Parameters should be typed** with meaningful names

### Common Action Verbs

| Verb | Use Case | Example |
|------|----------|---------|
| `set` | Direct assignment | `setErrorCount`, `setFontSize` |
| `toggle` | Boolean flip | `toggleMenuOpen`, `toggleDarkMode` |
| `increase` | Numeric increment | `increaseFontSize`, `increaseErrorCount` |
| `decrease` | Numeric decrement | `decreaseFontSize`, `decreaseCounter` |
| `add` | Add to collection | `addSentence`, `addFont` |
| `remove` | Remove from collection | `removeSentence`, `removeFont` |
| `reset` | Clear/reset state | `resetGameState`, `resetForm` |
| `fetch` / `load` | Async data loading | `fetchArticles`, `loadFonts` |
| `initialize` | Setup/init | `initializeDarkMode`, `initializeStore` |
| `update` | Modify existing | `updateArticle`, `updateFont` |

### Examples

#### Good Action Names

```typescript
// Setters
setErrorCount(count: number)       // Set specific value
setFontSize(size: number)          // Set specific value
setSelectedFont(font: string)      // Set specific value
setSentences(sentences: string[])  // Set array

// Toggles
toggleMenuOpen()                   // Boolean flip
toggleDarkMode()                   // Boolean flip
toggleCapitalLetters()             // Boolean flip

// Incrementers/Decrementers
increaseFontSize()                 // Increment by fixed amount
decreaseFontSize()                 // Decrement by fixed amount
increaseErrorCount()               // Increment by 1

// Collection operations
addSentence(sentence: string)      // Add to array
removeSentence(index: number)      // Remove from array
updateFonts(fonts: Font[])         // Replace font list

// Lifecycle/Initialization
initializeDarkMode()               // Initialize from localStorage
resetGameState()                   // Reset all game state
```

#### Bad Action Names

```typescript
// Unclear verbs
doErrorCount()                     // What does "do" mean?
handleErrorCount()                 // This reads like a method, not an action
processMenu()                      // What does process mean?

// Too generic
update()                           // Update what?
change()                           // Change what?
modify()                           // Modify what?

// Action verb missing
errorCount()                       // Unclear if getter or action
font()                             // Unclear if getter or action

// JavaScript naming patterns (not good for actions)
getErrorCount()                    // Looks like getter but modifies state
computeValue()                     // Too generic
```

## TypeScript Type Naming

### Rules

1. **Use PascalCase** for all type names
2. **Include domain context** in the name
3. **Use descriptive suffixes** for specific type purposes
4. **Avoid generic names** like `Data`, `Info`, `Result`

### Suffix Conventions

| Suffix | Use Case | Example |
|--------|----------|---------|
| `State` | Store state interface | `GameState`, `UiState`, `AppState` |
| `Config` | Configuration object | `UiConfig`, `GameConfig` |
| `Payload` | Action parameter type | `SetNumberPayload`, `SetStringPayload` |
| `Result` | Getter return type | `SentencesCountResult`, `ErrorRateResult` |
| `Options` | Optional parameters | `GameOptions`, `RenderOptions` |

### Examples

#### Good Type Names

```typescript
// State interfaces
interface Font {                   // Simple clear type
  text: string
  value: string
}

interface GameState {              // Represents game-related state
  errorCount: number
  wordsCount: number
}

interface UiState {                // Represents UI-related state
  menuOpen: boolean
  darkMode: boolean
}

interface AppState extends GameState, UiState {}  // Combined state

// Configuration
interface UiConfig {               // UI configuration
  fontSize: number
  theme: 'light' | 'dark'
}

// Action payloads
interface SetErrorPayload {        // Payload for setError action
  value: number
  timestamp?: number
}

interface SetSentencesPayload {    // Payload for setSentences action
  sentences: string[]
  index: number
}

// Getter results
interface ErrorStatsResult {       // Returned by getErrorStats getter
  count: number
  rate: number
  percentage: number
}

interface SentencesCountResult {   // Returned by getSentencesCount getter
  count: number
  completed: number
}
```

#### Bad Type Names

```typescript
// Generic/unclear
interface Data {}                  // Data about what?
interface Result {}                // Result of what?
interface Info {}                  // What info?

// Too long/redundant
interface SetErrorCountActionPayload {}  // Action is already context

// Missing context
interface State {}                 // State of what? Use AppState, GameState
interface Config {}                // Config of what? Use UiConfig, GameConfig

// Not descriptive
interface Stuff {}                 // What stuff?
interface Things {}                // What things?
interface X {}                     // Unclear
```

## Store API Organization

### Return Statement Order

In the `return` statement, organize in this order:

```typescript
export const useAppStore = defineStore('app', () => {
  // Define state, getters, actions...

  return {
    // 1. State properties (alphabetical or logical grouping)
    errorCount,
    wordsCount,
    showCapitalLetters,
    disableTyping,
    value,
    sentences,
    sentencePos,
    wordsPerSentence,
    finalText,
    sourceText,
    article,
    menuOpen,
    selectedFont,
    fonts,
    articleTitle,
    fontSize,
    darkMode,

    // 2. Getters (alphabetical)
    getSentencesCount,

    // 3. Actions (grouped by purpose: setters, toggles, operators)
    // Setters
    setMenuOpen,
    setSentences,
    setErrorCount,
    setWordsCount,
    setSentencePos,
    setSelectedFont,
    setDisableTyping,
    setSourceText,
    setArticle,
    setFinalText,
    setArticleTitle,
    setFontSize,
    setDarkMode,

    // Toggles
    toggleMenuOpen,
    toggleCapitalLetters,
    toggleDarkMode,

    // Operators
    increaseFontSize,
    decreaseFontSize,
    increaseErrorCount,

    // Lifecycle
    initializeDarkMode,
  }
})
```

## Component Usage Examples

### Correct Usage

```typescript
import { useAppStore } from '@/store/app'

export default defineComponent({
  setup() {
    const store = useAppStore()

    // Access state
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

### Template Usage

```vue
<template>
  <div>
    <!-- Direct state access -->
    <p>Errors: {{ store.errorCount }}</p>
    
    <!-- Getter access -->
    <p>Sentences: {{ store.getSentencesCount }}</p>
    
    <!-- Action calls -->
    <button @click="store.increaseErrorCount">+1 Error</button>
    <button @click="store.toggleMenuOpen">Toggle Menu</button>
    
    <!-- Data binding -->
    <select :value="store.selectedFont" @change="store.setSelectedFont">
      <option v-for="font in store.fonts" :key="font.value" :value="font.value">
        {{ font.text }}
      </option>
    </select>
  </div>
</template>
```

## Testing Naming

When testing, follow these naming patterns:

```typescript
describe('App Store', () => {
  // Test state
  describe('state', () => {
    it('should initialize errorCount to 0', () => {})
    it('should initialize menuOpen to false', () => {})
  })

  // Test getters
  describe('getters', () => {
    it('should return correct sentence count', () => {})
    it('should compute error rate correctly', () => {})
  })

  // Test actions - group by verb
  describe('setters', () => {
    it('should set error count', () => {})
    it('should set selected font', () => {})
  })

  describe('toggles', () => {
    it('should toggle menu open state', () => {})
    it('should toggle dark mode', () => {})
  })

  describe('operators', () => {
    it('should increase font size by 2', () => {})
    it('should increase error count by 1', () => {})
  })
})
```

## Summary

Follow these naming conventions for consistency and maintainability:

1. **State**: camelCase, descriptive, use boolean prefixes (show, is, has, can, disable)
2. **Getters**: camelCase with `get` prefix, descriptive of computed value
3. **Actions**: camelCase with verb prefix (set, toggle, increase, reset, fetch)
4. **Types**: PascalCase with domain context and meaningful suffixes
5. **Organization**: Group in return statement by category
6. **Consistency**: Apply same patterns across all stores
7. **Clarity**: Prioritize readability over brevity

When in doubt, ask: "Will another developer understand what this is without reading the implementation?"
