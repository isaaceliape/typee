<template>
  <div class="TextRenderer">
    <InfoPanel />
    <h1
      v-if="!disableTyping && articleTitle.length"
      class="articleTitle"
    >
      {{ articleTitle }}
    </h1>
    <div
      ref="wrapViewer"
      class="wrapViewer"
      :class="{ disabled: disableTyping }"
    >
      <input
        ref="userInput"
        class="userInput"
        disabled="disabled"
        autofocus
        v-model="value"
        @keydown="onKeydownUserInput"
      />
      <div
        ref="viewer"
        class="viewer"
        :style="{fontSize: `${fontSize}px`, fontFamily: `${selectedFont}`}"
        v-html="finalText"
      />
    </div>
    <button
      class="toogleTyping"
      @click="onClickToogleTyping"
    >
      {{ toogleTypingBtnText }}
    </button>
    <textarea
      ref="customText"
      v-model="sourceText"
      class="customText"
      :class="{disabled: !disableTyping}"
      :style="{fontSize: `${fontSize}px`, fontFamily: `${selectedFont}`}"
      rows="4"
      cols="50"
    />
  </div>
</template>

<script>
// import api from './api.js';

import { mapState, mapMutations } from 'vuex'

import InfoPanel from './InfoPanel.vue';

const mock_data = 'Amelia Krales A global phishing campaign has been targeting organizations associated with the distribution of COVID-19 vaccines since September 2020, IBM security researchers say. In a blog post, analysts Claire Zaboeva and Melissa';
const NOT_ALLOWED_KEYS = ['ArrowLeft','ArrowRight','Tab'];

export default {
  components: {
    InfoPanel,
  },
  data() {
    return {
      currentPos: 0,
      value: '',
      finalText: '<span class="active">&nbsp;</span>',
      sourceText: mock_data,
      article: '',
      articleTitle: '',
    }
  },
  watch: {
    value(currentText) {
      this.updateViewer(currentText);
    }
  },
  computed: {
    ...mapState([
      'fontSize',
      'errorCount',
      'selectedFont',
      'disableTyping',
      'showCapitalLetters',
    ]),
    toogleTypingBtnText(){
      return this.disableTyping
        ? 'Click here to start typing'
        : 'Click here to stop typing';
    },
  },
  mounted(){
    this.updateViewer(this.sourceText);
  },
  methods: {
    ...mapMutations([
      'setMenuOpen',
      'setWordsCount',
      'setErrorCount',
      'setDisableTyping',
      'increaseErrorCount',
    ]),
    updateErrorCount(sourceText, currentText, currPosLetter) {
      if(sourceText[currPosLetter] !== currentText[currPosLetter]) this.increaseErrorCount();
    },
    updateWordsCount(parsedCurrentText, currPosLetter) {
      const count = parsedCurrentText.substr(0, currPosLetter).split('␣').length - 1;
      this.setWordsCount(count);
    },
    updateViewer(currentText) {
      let analizedText = [];
      let currPosLetter = 0;
      const parsedCurrentText = currentText.replace(/ /g, '␣');
      let parsedSourceText = this.sourceText.replace(/ /g, '␣');
      if(!this.showCapitalLetters) parsedSourceText = parsedSourceText.toLowerCase();
      for (let i = 0; i < parsedSourceText.length; i++) {
        const currPosText = parsedCurrentText[i];
        const currPosSourceText = parsedSourceText[i];
        const classes = ['letter'];
        let finalText = currPosSourceText;

        if (i === this.value.length) {
          currPosLetter = i - 1;
          classes.push('active')
        }
        if(typeof currPosText !== 'undefined') {
          const status = currPosText !== currPosSourceText ? 'error' : 'success';
          finalText = currPosText;
          classes.push(status);
        }
        if (currPosSourceText === '␣') classes.push('space');
        const finalLetter = `<span class="${classes.join(' ')}">${finalText}</span>`;
        analizedText.push(finalLetter);
      }
      this.updateErrorCount(parsedSourceText, parsedCurrentText, currPosLetter);
      this.updateWordsCount(parsedCurrentText, currPosLetter);

      this.finalText = analizedText.join('');
    },
    onKeydownUserInput(e) {
      this.preventNotAllowedKeys(e);
      if (e.key === 'Escape') this.resetTyping();
    },
    resetTyping() {
      this.currentPos = 0;
      this.value = '';
      this.setErrorCount(0);
      this.updateViewer(this.sourceText);
    },
    preventNotAllowedKeys(e) {
      if(NOT_ALLOWED_KEYS.includes(e.key)) e.preventDefault();
    },
    onClickToogleTyping() {
      const { customText, userInput } = this.$refs;
      this.setDisableTyping(!this.disableTyping);
      this.setMenuOpen(false);

      if(this.disableTyping) {
        customText.focus();
      } else {
        userInput.removeAttribute('disabled');
        userInput.focus();
        this.updateViewer(this.sourceText);
      }
    },
  },
}
</script>
<style lang="scss">

  body {
    font-size: 16px;
    padding-top: 15px;
  }

  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    font-size: 16px;
  }

  th, td {
    padding: 5px;
  }

  .wrapViewer {
    position: relative;
    width: 80vw;
    max-width: 800px;
    margin: 50px auto 15px auto;
    overflow: hidden;
    transition: all .5s ease;
    opacity: 1;
    box-sizing: content-box;
    padding-bottom: 40px;

    &.disabled {
      height: 0;
      opacity: 0;
    }
  }
  .userInput,
  .viewer {
    border: 0;
    display: block;
    line-height: 1.2em;
    width: 100%;
    color: black;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .userInput {
    height: 0;
    pointer-events: none;
    opacity: 0;
    border: 0;
  }

  .customText {
    padding: 10px 15px;
    margin: 50px auto 15px auto;
    display: block;
    font-size: 20px;
    width: 80vw;
    max-width: 800px;
    box-sizing: border-box;
    border-radius: 5px;
    transition: all .5s ease;
    height: 20vh;
    opacity: 1;
    outline: none;

    &.disabled {
      height: 0;
      opacity: 0;
      pointer-events: none;
    }
  }
  .viewer {
    pointer-events: none;
    color: black;
    position: relative;
    z-index: 1;
    padding: 10px;
  }

  .letter {
    position: relative;
    display: inline-block;

    &.success {
      color: #80808063;

      &.space:before {
        color: black;
      }
    }
    &.error {
      color: white;
      background-color: red;

      &.space {
        opacity: 1;
        color: white;
      }
    }
    &.active {
      &.space {
        animation: blink 600ms steps(1, start) infinite;
        &.error:before {
          color: red;
          opacity: 1;
        }
      }
    }
    &.active {
      animation: blink 600ms steps(1, start) infinite;
    }
    &.space {
      color: gray;
      opacity: 0.3;
    }
  }

  .articleTitle {
    max-width: 800px;
    margin: 25px auto 0 auto;
    text-align: center;
  }

  .toogleTyping {
    border: 1px solid black;
    background: #fff;
    border-radius: 3px;
    padding: 5px 10px;
    margin: 0 auto;
    display: block;
    font-size: 20px;
    outline: 0;
    cursor: pointer;
    &:hover {
      background-color: black;
      color: white;
      border-color: transparent;
    }
  }
  @keyframes blink {
    0% {
      background-color: transparent;
      color: gray;
    }
    50% {
      background-color: black;
      color: white;
    }
    100% {
      background-color: transparent;
      color: gray;
    }
  }
</style>
