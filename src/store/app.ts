import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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
 * Main application store for the typing game.
 * Manages all reactive data and business logic for the application.
 */
export const useAppStore = defineStore('app', () => {
  // State
  const errorCount = ref(0)
  const wordsCount = ref(0)
  const showCapitalLetters = ref(false)
  const disableTyping = ref(true)
  const value = ref('')
  const sentences = ref<string[]>([])
  const sentencePos = ref(0)
  const wordsPerSentence = ref(20)
  const finalText = ref('<span class="active">&nbsp;</span>')
  const sourceText = ref('')
  const article = ref('')
  const menuOpen = ref(false)
  const selectedFont = ref(`'Ubuntu Mono', monospace`)
  const fonts = ref<Font[]>([
    { text: 'Ubuntu', value: `'Ubuntu Mono', monospace` },
    { text: 'Roboto', value: `'Roboto Mono', monospace` },
  ])
  const articleTitle = ref('Amelia KralesA global phishing')
  const fontSize = ref(30)
  const darkMode = ref(false)

  // Getters
  const getSentencesCount = computed(() => sentences.value.length)

  // Actions (replaces mutations)
  const setMenuOpen = (payload: boolean) => {
    menuOpen.value = payload
  }

  const toggleMenuOpen = () => {
    menuOpen.value = !menuOpen.value
  }

  const setSentences = (payload: string[]) => {
    sentences.value = payload
  }

  const setErrorCount = (payload: number) => {
    errorCount.value = payload
  }

  const increaseErrorCount = () => {
    errorCount.value += 1
  }

  const setWordsCount = (payload: number) => {
    wordsCount.value = payload
  }

  const setSentencePos = (payload: number) => {
    sentencePos.value = payload
  }

  const setSelectedFont = (payload: string) => {
    selectedFont.value = payload
  }

  const setDisableTyping = (payload: boolean) => {
    disableTyping.value = payload
  }

  const increaseFontSize = () => {
    fontSize.value += 2
  }

  const decreaseFontSize = () => {
    fontSize.value -= 2
  }

  const toggleCapitalLetters = () => {
    showCapitalLetters.value = !showCapitalLetters.value
  }

  const setValue = (payload: string) => {
    value.value = payload
  }

  const setSourceText = (payload: string) => {
    sourceText.value = payload
  }

  const setArticle = (payload: string) => {
    article.value = payload
  }

  const setFinalText = (payload: string) => {
    finalText.value = payload
  }

  const setArticleTitle = (payload: string) => {
    articleTitle.value = payload
  }

  const setFontSize = (payload: number) => {
    fontSize.value = payload
  }

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode.value))
  }

  const setDarkMode = (payload: boolean) => {
    darkMode.value = payload
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode.value))
  }

  const initializeDarkMode = () => {
    // Check localStorage first
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode !== null) {
      darkMode.value = JSON.parse(savedDarkMode)
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Fall back to system preference if no saved preference
      darkMode.value = true
    }
  }

  return {
    // State
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

    // Getters
    getSentencesCount,

    // Actions
    setMenuOpen,
    toggleMenuOpen,
    setSentences,
    setErrorCount,
    increaseErrorCount,
    setWordsCount,
    setSentencePos,
    setSelectedFont,
    setDisableTyping,
    increaseFontSize,
    decreaseFontSize,
    toggleCapitalLetters,
    setValue,
    setSourceText,
    setArticle,
    setFinalText,
    setArticleTitle,
    setFontSize,
    toggleDarkMode,
    setDarkMode,
    initializeDarkMode,
  }
})
