import { createStore } from 'vuex'
import mutationFactory from '../helpers'

export interface Font {
  text: string
  value: string
}

interface State {
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
}

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
  getters: {
    getSentencesCount(state: State) {
      return state.sentences.length
    },
  },
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
    toggleMenuOpen(state: State) {
      state.menuOpen = !state.menuOpen
    },
    increaseErrorCount(state: State) {
      state.errorCount += 1
    },
    increaseFontSize(state: State) {
      state.fontSize += 1
    },
    decreaseFontSize(state: State) {
      state.fontSize -= 1
    },
    toggleCapitalLetters(state: State) {
      state.showCapitalLetters = !state.showCapitalLetters
    },
  },
})