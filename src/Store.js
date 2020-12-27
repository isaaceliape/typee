const store = {
  state: {
    errorCount: 0,
    wordsCount: 0,
    showCapitalLetters: true,
    disableTyping: true,
    value: '',
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
    fontSize: 24,
  },
  mutations: {
    toggleMenuOpen (state) {
      state.menuOpen = !state.menuOpen;
      console.log('state.menuOpen', state.menuOpen);
    },
    setMenuOpen (state, payload) {
      state.menuOpen = payload;
    },
    setDisableTyping (state, payload) {
      state.disableTyping = payload;
    },
    increaseErrorCount (state) {
      state.errorCount += 1;
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
      console.log('toggleCapitalLetters');
      state.showCapitalLetters = !state.showCapitalLetters;
    },
  },
};

export default store;