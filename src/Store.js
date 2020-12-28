const store = {
  state: {
    errorCount: 0,
    wordsCount: 0,
    showCapitalLetters: true,
    disableTyping: true,
    value: '',
    sentences: null,
    sentencePos: null,
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
    toggleMenuOpen (state) {
      state.menuOpen = !state.menuOpen;
    },
    setMenuOpen (state, payload) {
      state.menuOpen = payload;
    },
    setSentencePos (state, payload) {
      state.sentencePos = payload;
    },
    setSentences (state, payload) {
      state.sentences = payload;
    },
    setDisableTyping (state, payload) {
      state.disableTyping = payload;
    },
    increaseErrorCount (state) {
      state.errorCount += 1;
    },
    setErrorCount (state, payload) {
      state.errorCount = payload;
    },
    increaseFontSize (state) {
      state.fontSize += 1;
    },
    decreaseFontSize (state) {
      state.fontSize -= 1;
    },
    setWordsCount (state, payload) {
      state.wordsCount = payload;
    },
    setSelectedFont (state, payload) {
      state.selectedFont = payload;
    },
    toggleCapitalLetters (state) {
      state.showCapitalLetters = !state.showCapitalLetters;
    },
  },
};

export default store;