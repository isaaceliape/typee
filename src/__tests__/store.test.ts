import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createTestingPinia } from './setup'
import { useAppStore } from '../store/app'

describe('App Store', () => {
  beforeEach(() => {
    createTestingPinia()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('State Properties', () => {
    it('should have all state properties initialized', () => {
      const store = useAppStore()
      
      expect(store.errorCount).toBe(0)
      expect(store.wordsCount).toBe(0)
      expect(store.showCapitalLetters).toBe(false)
      expect(store.disableTyping).toBe(true)
      expect(store.value).toBe('')
      expect(store.sentences).toEqual([])
      expect(store.sentencePos).toBe(0)
      expect(store.wordsPerSentence).toBe(20)
      expect(store.finalText).toBe('<span class="active">&nbsp;</span>')
      expect(store.sourceText).toBe('')
      expect(store.article).toBe('')
      expect(store.menuOpen).toBe(false)
      expect(store.selectedFont).toBe(`'Ubuntu Mono', monospace`)
      expect(store.articleTitle).toBe('Amelia KralesA global phishing')
      expect(store.fontSize).toBe(30)
      expect(store.darkMode).toBe(false)
    })

    it('should have fonts initialized correctly', () => {
      const store = useAppStore()
      
      expect(store.fonts).toHaveLength(2)
      expect(store.fonts[0]).toEqual({ text: 'Ubuntu', value: `'Ubuntu Mono', monospace` })
      expect(store.fonts[1]).toEqual({ text: 'Roboto', value: `'Roboto Mono', monospace` })
    })
  })

  describe('Getters', () => {
    it('should compute getSentencesCount correctly', () => {
      const store = useAppStore()
      
      expect(store.getSentencesCount).toBe(0)
      
      store.setSentences(['sentence 1', 'sentence 2', 'sentence 3'])
      expect(store.getSentencesCount).toBe(3)
    })
  })

  describe('Error Count Actions', () => {
    it('should set error count', () => {
      const store = useAppStore()
      
      store.setErrorCount(5)
      expect(store.errorCount).toBe(5)
    })

    it('should increase error count', () => {
      const store = useAppStore()
      
      store.increaseErrorCount()
      expect(store.errorCount).toBe(1)
      
      store.increaseErrorCount()
      expect(store.errorCount).toBe(2)
    })
  })

  describe('Words Count Actions', () => {
    it('should set words count', () => {
      const store = useAppStore()
      
      store.setWordsCount(10)
      expect(store.wordsCount).toBe(10)
    })
  })

  describe('Menu Actions', () => {
    it('should set menu open', () => {
      const store = useAppStore()
      
      store.setMenuOpen(true)
      expect(store.menuOpen).toBe(true)
      
      store.setMenuOpen(false)
      expect(store.menuOpen).toBe(false)
    })

    it('should toggle menu open', () => {
      const store = useAppStore()
      
      expect(store.menuOpen).toBe(false)
      
      store.toggleMenuOpen()
      expect(store.menuOpen).toBe(true)
      
      store.toggleMenuOpen()
      expect(store.menuOpen).toBe(false)
    })
  })

  describe('Sentences Actions', () => {
    it('should set sentences', () => {
      const store = useAppStore()
      const testSentences = ['hello world', 'test sentence', 'foo bar']
      
      store.setSentences(testSentences)
      expect(store.sentences).toEqual(testSentences)
      expect(store.getSentencesCount).toBe(3)
    })
  })

  describe('Sentence Position Actions', () => {
    it('should set sentence position', () => {
      const store = useAppStore()
      
      store.setSentencePos(2)
      expect(store.sentencePos).toBe(2)
      
      store.setSentencePos(0)
      expect(store.sentencePos).toBe(0)
    })
  })

  describe('Font Actions', () => {
    it('should set selected font', () => {
      const store = useAppStore()
      const newFont = `'Roboto Mono', monospace`
      
      store.setSelectedFont(newFont)
      expect(store.selectedFont).toBe(newFont)
    })
  })

  describe('Font Size Actions', () => {
    it('should increase font size', () => {
      const store = useAppStore()
      const initialSize = store.fontSize
      
      store.increaseFontSize()
      expect(store.fontSize).toBe(initialSize + 2)
      
      store.increaseFontSize()
      expect(store.fontSize).toBe(initialSize + 4)
    })

    it('should decrease font size', () => {
      const store = useAppStore()
      const initialSize = store.fontSize
      
      store.decreaseFontSize()
      expect(store.fontSize).toBe(initialSize - 2)
      
      store.decreaseFontSize()
      expect(store.fontSize).toBe(initialSize - 4)
    })

    it('should set font size directly', () => {
      const store = useAppStore()
      
      store.setFontSize(48)
      expect(store.fontSize).toBe(48)
      
      store.setFontSize(14)
      expect(store.fontSize).toBe(14)
    })
  })

  describe('Capital Letters Actions', () => {
    it('should toggle capital letters', () => {
      const store = useAppStore()
      
      expect(store.showCapitalLetters).toBe(false)
      
      store.toggleCapitalLetters()
      expect(store.showCapitalLetters).toBe(true)
      
      store.toggleCapitalLetters()
      expect(store.showCapitalLetters).toBe(false)
    })
  })

  describe('Typing Disable Actions', () => {
    it('should set disable typing', () => {
      const store = useAppStore()
      
      store.setDisableTyping(false)
      expect(store.disableTyping).toBe(false)
      
      store.setDisableTyping(true)
      expect(store.disableTyping).toBe(true)
    })
  })

  describe('Input Value Actions', () => {
    it('should set value', () => {
      const store = useAppStore()
      const testValue = 'hello world'
      
      store.setValue(testValue)
      expect(store.value).toBe(testValue)
    })
  })

  describe('Text Actions', () => {
    it('should set source text', () => {
      const store = useAppStore()
      const text = 'The quick brown fox'
      
      store.setSourceText(text)
      expect(store.sourceText).toBe(text)
    })

    it('should set article', () => {
      const store = useAppStore()
      const article = 'This is an article content'
      
      store.setArticle(article)
      expect(store.article).toBe(article)
    })

    it('should set final text', () => {
      const store = useAppStore()
      const finalText = '<span class="active">A</span><span>B</span>'
      
      store.setFinalText(finalText)
      expect(store.finalText).toBe(finalText)
    })

    it('should set article title', () => {
      const store = useAppStore()
      const title = 'New Article Title'
      
      store.setArticleTitle(title)
      expect(store.articleTitle).toBe(title)
    })
  })

  describe('Dark Mode Actions', () => {
    it('should toggle dark mode value', () => {
      const store = useAppStore()
      const initialValue = store.darkMode
      
      // Mock localStorage to avoid errors in test environment
      const originalLocalStorage = global.localStorage
      global.localStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
        key: vi.fn(),
        length: 0,
      } as unknown as Storage
      
      store.toggleDarkMode()
      expect(store.darkMode).toBe(!initialValue)
      
      // Restore original localStorage
      global.localStorage = originalLocalStorage
    })

    it('should set dark mode value', () => {
      const store = useAppStore()
      
      // Mock localStorage to avoid errors in test environment
      const originalLocalStorage = global.localStorage
      global.localStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
        key: vi.fn(),
        length: 0,
      } as unknown as Storage
      
      store.setDarkMode(true)
      expect(store.darkMode).toBe(true)
      
      store.setDarkMode(false)
      expect(store.darkMode).toBe(false)
      
      // Restore original localStorage
      global.localStorage = originalLocalStorage
    })
  })

  describe('Multiple State Changes', () => {
    it('should handle multiple state changes independently', () => {
      const store = useAppStore()
      
      store.setErrorCount(5)
      store.setWordsCount(10)
      store.toggleCapitalLetters()
      store.setDisableTyping(false)
      
      expect(store.errorCount).toBe(5)
      expect(store.wordsCount).toBe(10)
      expect(store.showCapitalLetters).toBe(true)
      expect(store.disableTyping).toBe(false)
    })
  })

  describe('Store Instance Isolation', () => {
    it('should create isolated store instances for different components', () => {
      const store1 = useAppStore()
      const store2 = useAppStore()
      
      // Both should reference the same store instance (singleton pattern)
      expect(store1).toBe(store2)
      
      store1.setErrorCount(5)
      expect(store2.errorCount).toBe(5)
    })
  })
})
