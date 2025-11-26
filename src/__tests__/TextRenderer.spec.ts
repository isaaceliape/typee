import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createTestingPinia } from './setup'
import { useAppStore } from '@/store/app'

describe('TextRenderer.vue', () => {
  let store: ReturnType<typeof useAppStore>

  beforeEach(() => {
    createTestingPinia()
    store = useAppStore()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  describe('Store Initialization', () => {
    it('initializes store with correct default values', () => {
      expect(store.disableTyping).toBe(true)
      expect(store.errorCount).toBe(0)
      expect(store.wordsCount).toBe(0)
      expect(store.showCapitalLetters).toBe(false)
      expect(store.sentencePos).toBe(0)
    })

    it('store has all required methods', () => {
      expect(typeof store.setMenuOpen).toBe('function')
      expect(typeof store.setErrorCount).toBe('function')
      expect(typeof store.setWordsCount).toBe('function')
      expect(typeof store.setSentencePos).toBe('function')
      expect(typeof store.setDisableTyping).toBe('function')
      expect(typeof store.setSentences).toBe('function')
      expect(typeof store.increaseErrorCount).toBe('function')
      expect(typeof store.setSelectedFont).toBe('function')
      expect(typeof store.setFontSize).toBe('function')
      expect(typeof store.toggleCapitalLetters).toBe('function')
    })
  })

  describe('Error Count Management', () => {
    it('increments error count', () => {
      store.setErrorCount(0)
      store.increaseErrorCount()
      expect(store.errorCount).toBe(1)
      
      store.increaseErrorCount()
      expect(store.errorCount).toBe(2)
    })

    it('sets error count to specific value', () => {
      store.setErrorCount(5)
      expect(store.errorCount).toBe(5)
      
      store.setErrorCount(0)
      expect(store.errorCount).toBe(0)
    })

    it('handles large error counts', () => {
      store.setErrorCount(1000)
      expect(store.errorCount).toBe(1000)
    })
  })

  describe('Words Count Management', () => {
    it('sets words count correctly', () => {
      store.setWordsCount(10)
      expect(store.wordsCount).toBe(10)
    })

    it('updates words count multiple times', () => {
      store.setWordsCount(5)
      expect(store.wordsCount).toBe(5)
      
      store.setWordsCount(10)
      expect(store.wordsCount).toBe(10)
      
      store.setWordsCount(0)
      expect(store.wordsCount).toBe(0)
    })

    it('handles large word counts', () => {
      store.setWordsCount(10000)
      expect(store.wordsCount).toBe(10000)
    })
  })

  describe('Typing State Management', () => {
    it('toggles typing state', () => {
      store.setDisableTyping(true)
      expect(store.disableTyping).toBe(true)
      
      store.setDisableTyping(false)
      expect(store.disableTyping).toBe(false)
    })

    it('maintains typing state after multiple toggles', () => {
      store.setDisableTyping(true)
      store.setDisableTyping(false)
      store.setDisableTyping(true)
      expect(store.disableTyping).toBe(true)
    })
  })

  describe('Sentence Management', () => {
    it('sets sentence position', () => {
      store.setSentencePos(0)
      expect(store.sentencePos).toBe(0)
      
      store.setSentencePos(5)
      expect(store.sentencePos).toBe(5)
    })

    it('sets sentences array', () => {
      const sentences = ['hello world', 'test sentence', 'another one']
      store.setSentences(sentences)
      expect(store.sentences).toEqual(sentences)
    })

    it('computes sentence count correctly', () => {
      const sentences = ['s1', 's2', 's3', 's4', 's5']
      store.setSentences(sentences)
      expect(store.getSentencesCount).toBe(5)
    })

    it('handles empty sentences array', () => {
      store.setSentences([])
      expect(store.getSentencesCount).toBe(0)
    })
  })

  describe('Font Management', () => {
    it('sets selected font', () => {
      store.setSelectedFont('Courier New')
      expect(store.selectedFont).toBe('Courier New')
    })

    it('sets font size', () => {
      store.setFontSize(24)
      expect(store.fontSize).toBe(24)
    })

    it('increases font size', () => {
      store.setFontSize(20)
      store.increaseFontSize()
      expect(store.fontSize).toBe(22)
      
      store.increaseFontSize()
      expect(store.fontSize).toBe(24)
    })

    it('decreases font size', () => {
      store.setFontSize(30)
      store.decreaseFontSize()
      expect(store.fontSize).toBe(28)
      
      store.decreaseFontSize()
      expect(store.fontSize).toBe(26)
    })

    it('handles minimum font size', () => {
      store.setFontSize(4)
      store.decreaseFontSize()
      store.decreaseFontSize()
      expect(store.fontSize).toBe(0)
    })

    it('handles large font sizes', () => {
      store.setFontSize(200)
      expect(store.fontSize).toBe(200)
    })
  })

  describe('Capital Letters Toggle', () => {
    it('toggles capital letters setting', () => {
      store.toggleCapitalLetters()
      expect(store.showCapitalLetters).toBe(true)
      
      store.toggleCapitalLetters()
      expect(store.showCapitalLetters).toBe(false)
    })

    it('maintains state after multiple toggles', () => {
      store.toggleCapitalLetters()
      store.toggleCapitalLetters()
      store.toggleCapitalLetters()
      expect(store.showCapitalLetters).toBe(true)
    })
  })

  describe('Menu Management', () => {
    it('sets menu open state', () => {
      store.setMenuOpen(true)
      expect(store.menuOpen).toBe(true)
      
      store.setMenuOpen(false)
      expect(store.menuOpen).toBe(false)
    })

    it('toggles menu state', () => {
      store.setMenuOpen(false)
      store.toggleMenuOpen()
      expect(store.menuOpen).toBe(true)
      
      store.toggleMenuOpen()
      expect(store.menuOpen).toBe(false)
    })
  })

  describe('Article Title Management', () => {
    it('sets article title', () => {
      const title = 'Test Article Title'
      store.setArticleTitle(title)
      expect(store.articleTitle).toBe(title)
    })

    it('handles empty article title', () => {
      store.setArticleTitle('')
      expect(store.articleTitle).toBe('')
    })

    it('handles long article titles', () => {
      const longTitle = 'A'.repeat(500)
      store.setArticleTitle(longTitle)
      expect(store.articleTitle).toBe(longTitle)
    })
  })

  describe('Source Text Management', () => {
    it('sets source text', () => {
      const text = 'This is source text'
      store.setSourceText(text)
      expect(store.sourceText).toBe(text)
    })

    it('handles very long source text', () => {
      const longText = 'word '.repeat(1000)
      store.setSourceText(longText)
      expect(store.sourceText).toBe(longText)
    })
  })

  describe('Article Management', () => {
    it('sets article content', () => {
      const article = 'Article content here'
      store.setArticle(article)
      expect(store.article).toBe(article)
    })

    it('handles empty articles', () => {
      store.setArticle('')
      expect(store.article).toBe('')
    })
  })

  describe('Complex State Scenarios', () => {
    it('manages complete typing session setup', () => {
      store.setDisableTyping(false)
      store.setErrorCount(0)
      store.setWordsCount(0)
      store.setSentencePos(0)
      store.setFontSize(30)
      store.setSelectedFont('Courier New')
      store.toggleCapitalLetters()
      
      expect(store.disableTyping).toBe(false)
      expect(store.errorCount).toBe(0)
      expect(store.wordsCount).toBe(0)
      expect(store.sentencePos).toBe(0)
      expect(store.fontSize).toBe(30)
      expect(store.selectedFont).toBe('Courier New')
      expect(store.showCapitalLetters).toBe(true)
    })

    it('tracks multiple sentences with error tracking', () => {
      const sentences = ['first', 'second', 'third']
      store.setSentences(sentences)
      store.setSentencePos(0)
      store.setErrorCount(0)
      
      store.setWordsCount(1)
      store.setSentencePos(1)
      store.increaseErrorCount()
      
      expect(store.sentencePos).toBe(1)
      expect(store.errorCount).toBe(1)
      expect(store.wordsCount).toBe(1)
    })

    it('handles state reset', () => {
      store.setErrorCount(10)
      store.setWordsCount(50)
      store.setSentencePos(5)
      store.setDisableTyping(false)
      
      // Reset
      store.setErrorCount(0)
      store.setWordsCount(0)
      store.setSentencePos(0)
      store.setDisableTyping(true)
      
      expect(store.errorCount).toBe(0)
      expect(store.wordsCount).toBe(0)
      expect(store.sentencePos).toBe(0)
      expect(store.disableTyping).toBe(true)
    })
  })

  describe('State Persistence', () => {
    it('maintains state changes across operations', () => {
      store.setErrorCount(5)
      store.setWordsCount(10)
      store.setSentencePos(2)
      
      expect(store.errorCount).toBe(5)
      store.increaseErrorCount()
      expect(store.errorCount).toBe(6)
      expect(store.wordsCount).toBe(10)
      expect(store.sentencePos).toBe(2)
    })

    it('handles rapid state updates', () => {
      for (let i = 0; i < 100; i++) {
        store.increaseErrorCount()
      }
      expect(store.errorCount).toBe(100)
      
      for (let i = 0; i < 50; i++) {
        store.setWordsCount(i)
      }
      expect(store.wordsCount).toBe(49)
    })
  })

  describe('Edge Cases', () => {
    it('handles negative values appropriately', () => {
      store.setErrorCount(-5)
      expect(store.errorCount).toBe(-5)
    })

    it('handles zero values', () => {
      store.setFontSize(0)
      expect(store.fontSize).toBe(0)
    })

    it('handles special characters in text fields', () => {
      store.setArticleTitle('Title!@#$%^&*()')
      expect(store.articleTitle).toBe('Title!@#$%^&*()')
      
      store.setSourceText('Source with special chars: <>&"\'')
      expect(store.sourceText).toBe('Source with special chars: <>&"\'')
    })

    it('handles unicode characters', () => {
      store.setArticleTitle('Café ☕')
      expect(store.articleTitle).toBe('Café ☕')
    })

    it('handles very large numbers', () => {
      store.setErrorCount(Number.MAX_SAFE_INTEGER)
      expect(store.errorCount).toBe(Number.MAX_SAFE_INTEGER)
    })
  })

  describe('Default Values', () => {
    it('has default fonts available', () => {
      expect(store.fonts.length).toBeGreaterThan(0)
      expect(store.fonts[0]).toHaveProperty('text')
      expect(store.fonts[0]).toHaveProperty('value')
    })

    it('has default selected font', () => {
      expect(store.selectedFont).toBeTruthy()
      expect(typeof store.selectedFont).toBe('string')
    })

    it('has reasonable default font size', () => {
      expect(store.fontSize).toBeGreaterThan(0)
      expect(store.fontSize).toBeLessThan(200)
    })

    it('has default words per sentence', () => {
      expect(store.wordsPerSentence).toBeGreaterThan(0)
    })
  })

  describe('Store Getters', () => {
    it('computes sentence count from sentences array', () => {
      expect(store.getSentencesCount).toBe(0)
      
      store.setSentences(['one'])
      expect(store.getSentencesCount).toBe(1)
      
      store.setSentences(['one', 'two', 'three'])
      expect(store.getSentencesCount).toBe(3)
    })

    it('sentence count updates dynamically', () => {
      store.setSentences(['a', 'b'])
      expect(store.getSentencesCount).toBe(2)
      
      store.setSentences(['a', 'b', 'c', 'd', 'e'])
      expect(store.getSentencesCount).toBe(5)
    })
  })

  describe('Store State Isolation', () => {
    it('changing one state does not affect another', () => {
      const initialErrorCount = store.errorCount
      const initialWordsCount = store.wordsCount
      
      store.increaseErrorCount()
      expect(store.errorCount).not.toBe(initialErrorCount)
      expect(store.wordsCount).toBe(initialWordsCount)
    })

    it('font changes do not affect sentence state', () => {
      store.setSentences(['test'])
      const initialSentenceCount = store.getSentencesCount
      
      store.setFontSize(50)
      store.setSelectedFont('Arial')
      
      expect(store.getSentencesCount).toBe(initialSentenceCount)
    })
  })
})
