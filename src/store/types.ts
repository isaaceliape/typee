/**
 * Pinia Store Type Definitions
 * 
 * This file contains shared TypeScript interfaces and types
 * used across all Pinia stores in the application.
 * 
 * Organization:
 * - Font Configuration Types
 * - Game State Types
 * - UI State Types
 * - Common Types and Utilities
 */

/**
 * Font configuration type
 * Represents a selectable font option with display name and CSS value
 */
export interface Font {
  /** Display name shown in the UI */
  text: string
  /** CSS font-family value */
  value: string
}

/**
 * Game state interface
 * Represents all game-related state managed by the store
 */
export interface GameState {
  /** Current number of typing errors */
  errorCount: number
  /** Total words typed */
  wordsCount: number
  /** Whether capital letters should be displayed */
  showCapitalLetters: boolean
  /** Whether typing input is disabled */
  disableTyping: boolean
  /** Current user input value */
  value: string
  /** Array of sentences for the game */
  sentences: string[]
  /** Current position in sentences array */
  sentencePos: number
  /** Number of words per sentence */
  wordsPerSentence: number
  /** Final formatted text with HTML markup */
  finalText: string
  /** Source text before processing */
  sourceText: string
  /** Current article content */
  article: string
  /** Title of the current article */
  articleTitle: string
}

/**
 * UI state interface
 * Represents all UI-related state managed by the store
 */
export interface UiState {
  /** Whether the menu is open */
  menuOpen: boolean
  /** Currently selected font value */
  selectedFont: string
  /** Available font options */
  fonts: Font[]
  /** Current font size in pixels */
  fontSize: number
  /** Whether dark mode is enabled */
  darkMode: boolean
}

/**
 * Combined App State interface
 * Represents the complete application state
 */
export interface AppState extends GameState, UiState {}

/**
 * Action payload types
 */
export interface SetNumberPayload {
  value: number
}

export interface SetStringPayload {
  value: string
}

export interface SetStringsPayload {
  values: string[]
}

export interface SetFontPayload {
  font: Font
}

export interface SetFontsPayload {
  fonts: Font[]
}

/**
 * Getter result types
 */
export interface SentencesCountResult {
  count: number
}

export interface WordCountResult {
  count: number
}

export interface ErrorRateResult {
  rate: number
}

/**
 * Store export type
 * Represents the complete store API
 */
export interface AppStoreApi {
  // State
  errorCount: number
  wordsCount: number
  showCapitalLetters: boolean
  disableTyping: boolean
  value: string
  sentences: string[]
  sentencePos: number
  wordsPerSentence: number
  finalText: string
  sourceText: string
  article: string
  menuOpen: boolean
  selectedFont: string
  fonts: Font[]
  articleTitle: string
  fontSize: number
  darkMode: boolean

  // Getters
  getSentencesCount: number

  // Actions
  setMenuOpen: (payload: boolean) => void
  toggleMenuOpen: () => void
  setSentences: (payload: string[]) => void
  setErrorCount: (payload: number) => void
  increaseErrorCount: () => void
  setWordsCount: (payload: number) => void
  setSentencePos: (payload: number) => void
  setSelectedFont: (payload: string) => void
  setDisableTyping: (payload: boolean) => void
  increaseFontSize: () => void
  decreaseFontSize: () => void
  toggleCapitalLetters: () => void
  setValue: (payload: string) => void
  setSourceText: (payload: string) => void
  setArticle: (payload: string) => void
  setFinalText: (payload: string) => void
  setArticleTitle: (payload: string) => void
  setFontSize: (payload: number) => void
  toggleDarkMode: () => void
  setDarkMode: (payload: boolean) => void
  initializeDarkMode: () => void
}

/**
 * Utility type to extract getters from store
 */
export type StoreGetters = {
  getSentencesCount: number
}

/**
 * Utility type to extract actions from store
 */
export type StoreActions = {
  setMenuOpen: (payload: boolean) => void
  toggleMenuOpen: () => void
  setSentences: (payload: string[]) => void
  setErrorCount: (payload: number) => void
  increaseErrorCount: () => void
  setWordsCount: (payload: number) => void
  setSentencePos: (payload: number) => void
  setSelectedFont: (payload: string) => void
  setDisableTyping: (payload: boolean) => void
  increaseFontSize: () => void
  decreaseFontSize: () => void
  toggleCapitalLetters: () => void
  setValue: (payload: string) => void
  setSourceText: (payload: string) => void
  setArticle: (payload: string) => void
  setFinalText: (payload: string) => void
  setArticleTitle: (payload: string) => void
  setFontSize: (payload: number) => void
  toggleDarkMode: () => void
  setDarkMode: (payload: boolean) => void
  initializeDarkMode: () => void
}
