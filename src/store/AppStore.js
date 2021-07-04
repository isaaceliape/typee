import { createStore } from 'vuex'
import mutationFactory from '../helpers.js'

export default createStore({
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
    getSentencesCount(state) {
      return state.sentences.length;
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
    toggleMenuOpen(state) {
      state.menuOpen = !state.menuOpen;
    },
    increaseErrorCount(state) {
      state.errorCount += 1;
    },
    increaseFontSize(state) {
      state.fontSize += 1;
    },
    decreaseFontSize(state) {
      state.fontSize -= 1;
    },
    toggleCapitalLetters(state) {
      state.showCapitalLetters = !state.showCapitalLetters;
    },
  },
})