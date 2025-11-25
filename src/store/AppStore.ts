import { createStore } from 'vuex'
import mutationFactory from '../helpers'

/**
 * Font option for the typing interface.
 * Represents a selectable font with display name and CSS value.
 */
export interface Font {
  /** Display name shown in the UI */
  text: string
  /** CSS font-family value */
  value: string
}

/**
 * Application state for the typing game.
 * Manages all reactive data for the application.
 */
interface State {
  /** Count of typing errors made by the user */
  errorCount: number
  /** Count of words typed correctly */
  wordsCount: number
  /** Whether to show capital letters in the exercise */
  showCapitalLetters: boolean
  /** Whether typing is currently disabled */
  disableTyping: boolean
  /** Current text typed by the user */
  value: string
  /** Array of sentences for typing exercises */
  sentences: string[]
  /** Current position in the sentences array */
  sentencePos: number
  /** Number of words per sentence in the exercise */
  wordsPerSentence: number
  /** Formatted text for display with styling */
  finalText: string
  /** Source text for the current exercise */
  sourceText: string
  /** Article content from RSS feed */
  article: string
  /** Whether the menu is currently open */
  menuOpen: boolean
  /** Currently selected font family */
  selectedFont: string
  /** Available font options */
  fonts: Font[]
  /** Title of the article being used */
  articleTitle: string
  /** Current font size in pixels */
  fontSize: number
}

/**
 * Central Vuex store for the typing application.
 * Manages all application state, getters, and mutations.
 * 
 * @example
 * // Access state
 * store.state.errorCount
 * 
 * // Get computed value
 * store.getters.getSentencesCount
 * 
 * // Commit mutation
 * store.commit('setErrorCount', 5)
 */
export default createStore<State>({
  state: {
    errorCount: 0,
    wordsCount: 0,
    showCapitalLetters: false,
    disableTyping: true,
    value: '',
    sentences: [],
    sentencePos: 0,
    wordsPerSentence: 20,
    finalText: '<span class="active">&nbsp;</span>',
    sourceText: '',
    article: '',
    menuOpen: false,
    selectedFont: `'Ubuntu Mono', monospace`,
    fonts: [
      { text: 'Ubuntu', value: `'Ubuntu Mono', monospace` },
      { text: 'Roboto', value: `'Roboto Mono', monospace` },
    ],
    articleTitle: 'Amelia KralesA global phishing',
    fontSize: 30,
  },
  /**
   * Store getters for computed state values.
   */
  getters: {
    /**
     * Gets the total count of sentences available.
     * @param state - The application state
     * @returns Number of sentences in the current exercise
     */
    getSentencesCount(state: State) {
      return state.sentences.length
    },
  },
  /**
   * Store mutations for state updates.
   * Includes auto-generated setters from mutationFactory and custom mutations.
   */
  mutations: {
    ...mutationFactory([
      'menuOpen',
      'sentences',
      'errorCount',
      'wordsCount',
      'sentencePos',
      'selectedFont',
      'disableTyping',
    ]),
    /**
     * Toggles the menu open/closed state.
     * @param state - The application state
     */
    toggleMenuOpen(state: State) {
      state.menuOpen = !state.menuOpen
    },
    /**
     * Increments the error count by 1.
     * @param state - The application state
     */
    increaseErrorCount(state: State) {
      state.errorCount += 1
    },
    /**
     * Increases the font size by 1 pixel.
     * @param state - The application state
     */
    increaseFontSize(state: State) {
      state.fontSize += 1
    },
    /**
     * Decreases the font size by 1 pixel.
     * @param state - The application state
     */
    decreaseFontSize(state: State) {
      state.fontSize -= 1
    },
    /**
     * Toggles whether capital letters are shown in exercises.
     * @param state - The application state
     */
    toggleCapitalLetters(state: State) {
      state.showCapitalLetters = !state.showCapitalLetters
    },
  },
})