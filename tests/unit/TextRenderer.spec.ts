import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TextRenderer from '@/components/TextRenderer.vue'
import { createStore } from 'vuex'

describe('TextRenderer.vue', () => {
  const createMockStore = () => {
    return createStore({
      state: {
        fontSize: 20,
        sentences: ['test sentence', 'another sentence'],
        wordsCount: 0,
        errorCount: 0,
        sentencePos: 0,
        selectedFont: "'Ubuntu Mono', monospace",
        disableTyping: true,
        wordsPerSentence: 20,
        showCapitalLetters: false,
      },
      mutations: {
        setMenuOpen: () => {},
        setWordsCount: () => {},
        setErrorCount: () => {},
        setSentencePos: () => {},
        setDisableTyping: () => {},
        setSentences: () => {},
        increaseErrorCount: () => {},
      },
      getters: {
        getSentencesCount: (state) => state.sentences.length,
      },
    })
  }

  it('renders TextRenderer component', () => {
    const store = createMockStore()
    const wrapper = mount(TextRenderer, {
      global: {
        plugins: [store],
        stubs: ['TypingLetter', 'KeymapOverlay', 'InfoPanel']
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders toggle typing button', () => {
    const store = createMockStore()
    const wrapper = mount(TextRenderer, {
      global: {
        plugins: [store],
        stubs: ['TypingLetter', 'KeymapOverlay', 'InfoPanel']
      }
    })
    expect(wrapper.find('.toogleTyping').exists()).toBe(true)
  })

  it('displays word countdown', () => {
    const store = createMockStore()
    const wrapper = mount(TextRenderer, {
      global: {
        plugins: [store],
        stubs: ['TypingLetter', 'KeymapOverlay', 'InfoPanel']
      }
    })
    expect(wrapper.find('.wordCountdown').exists()).toBe(true)
  })
})
