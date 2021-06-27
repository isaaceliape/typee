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
      :style="{fontSize: `${fontSize}px`, fontFamily: `${selectedFont}`}"
      class="wrapViewer"
      :class="{ disabled: disableTyping }"
    >
      <input
        ref="userInput"
        v-model="value"
        class="userInput"
        disabled="disabled"
        autofocus
        @keydown="onKeydownUserInput"
      >
      <!-- @blur="onClickToogleTyping" -->
      <!-- eslint-disable vue/no-v-html -->
      <!-- <div
        ref="viewer"
        class="viewer"
        :style="{fontSize: `${fontSize}px`, fontFamily: `${selectedFont}`}"
        v-html="finalText"
      /> -->
      <Word
        v-for="word in words"
        :key="word.id"
        :letters="word.letters"
      />
    </div>
    <button
      class="toogleTyping"
      @click="onClickToogleTyping"
    >
      {{ toogleTypingBtnText }}
    </button>
  </div>
</template>

<script>
import * as R from 'ramda'
import { mapState, mapMutations, mapGetters } from 'vuex'

import InfoPanel from './InfoPanel.vue'
import Word from './Word.vue'
import mostCommonEnglishWords from '../assets/1000EnglishWords'

const mock_data = mostCommonEnglishWords.sort(() => Math.random() - 0.5).join(' ')
const NOT_ALLOWED_KEYS = ['ArrowLeft','ArrowRight','Tab']

export default {
  components: {
    InfoPanel,
    Word,
  },
  data() {
    return {
      currentPos: {
        word: 0,
        letter: 0,
      },
      value: '',
      currentSentence: null,
      finalText: '',
      sourceText: mock_data,
      article: '',
      articleTitle: '',
      words: [],
      typedText: [],
    }
  },
  computed: {
    ...mapState([
      'fontSize',
      'sentences',
      'errorCount',
      'sentencePos',
      'selectedFont',
      'disableTyping',
      'wordsPerSentence',
      'showCapitalLetters',
    ]),
    ...mapGetters([
      'getSentencesCount',
    ]),
    toogleTypingBtnText(){
      const action = this.disableTyping ? 'start' : 'stop'
      return `${action} typing`
    },
  },
  watch: {
    value(currentText) {
      if (currentText.length >= this.currentSentence.length) {
        this.updateCurrentSentence(this.sentencePos + 1)
        this.resetTyping()
      }
      this.updateViewer(currentText)
    }
  },
  mounted(){
    this.updateCurrentSentence(0)
    // this.updateViewer(this.currentSentence)
    this.words = this.parceSentence(this.currentSentence)
    this.typedText = this.parceSentence(this.value)
    console.log('this.typedText', this.typedText)
    // this.onClickToogleTyping()
  },
  methods: {
    ...mapMutations([
      'setMenuOpen',
      'setWordsCount',
      'setErrorCount',
      'setSentencePos',
      'setDisableTyping',
      'setSentences',
      'increaseErrorCount',
    ]),
    updateErrorCount(currentSentence, currentText, currPosLetter) {
      if(currentSentence[currPosLetter] !== currentText[currPosLetter]) this.increaseErrorCount()
    },
    updateWordsCount(parsedCurrentText, currPosLetter) {
      const count = parsedCurrentText
        .substr(0, currPosLetter)
        .split('␣').length - 1
      this.setWordsCount(count)
    },
    addSpaces(_words) {
      const words = []
      _words.forEach((word, i) => {
        words.push(word)
        words.push({
          id: i,
          letters: [{
            id: 0,
            text: '␣',
            statuses: [],
          }],
        })
      });
      return words
    },
    parceSentence(_text) {
      let text = _text
      if (!this.showCapitalLetters) text = text.toLowerCase()
      let words = text
        .split(' ')
        .map((word, i) => ({
          id: i,
          text: word,
          letters: [...word].map((letter, j) => ({
            id: j,
            text: letter,
            statuses: [],
          })),
        }))
      words = this.addSpaces(words)
      // words[this.currentPos.word].letters[this.currentPos.letter].statuses = ['active']
      return words
    },
    updateViewer() {
      // const isNotFirstWord = this.value.includes(' ')
      // let typedWords = this.value.split(' ')
      // const currentWordPos = isNotFirstWord ? typedWords.length : 0
      // const currentLetterPos = isNotFirstWord ? typedWords[currentWordPos].length : this.value.length
      // console.log('typedWords', typedWords);
      this.typedText.forEach((typedWord) => {
        typedWord.letters.forEach((typedLetter, j) => {
          console.log(typedLetter, j);
      //     const word = this.words[i];
      //     const letter = word.letters[j];
      //     this.removeStatus(letter, ['active', 'error', 'success'])
      //     if (letter.text !== typedLetter) {
      //       this.addStatus(letter, 'error')
      //       // console.log('error letter', letter);
      //     }
      //     if (letter.text === typedLetter) {
      //       this.addStatus(letter, 'success')
      //       // console.log('success letter', letter);
      //     }
        })
      })
      // const currentLetter = this.words[currentWordPos].letters[currentLetterPos]
      // console.log('currentLetter', currentLetter);
      // this.addStatus(currentLetter, 'active')
      // console.log('currentLetter', currentLetter)
    },
    gotoNextPos(_words) {
      let words = _words
      const targetLetterPos = this.currentPos.letter + 1
      const targetWord = this.currentPos.word + 1

      const currentWord = words[this.currentPos.word].text
      const currentWordLength = currentWord.length
      const wordsLength = words.length

      console.log({
        currentWord,
        targetLetterPos,
        currentWordLength,
        targetWord,
        wordsLength,
      })
      if (targetLetterPos <= currentWordLength) {
        this.currentPos.letter = targetLetterPos;
        this.addStatus(words[targetWord].letters[targetLetterPos], 'active')
        return
      }
      if (targetWord <= wordsLength) {
        this.currentPos.letter = 0;
        this.currentPos.word = targetWord;
        this.addStatus(words[targetWord].letters[targetLetterPos], 'active')
        return
      }
      if (targetWord > wordsLength) {
        this.currentPos.letter = currentWordLength;
        this.currentPos.word = wordsLength;
        this.addStatus(words[targetWord].letters[targetLetterPos], 'active')
        return
      }
    },
    onKeydownUserInput(e) {
      this.preventNotAllowedKeys(e);
      if (e.key === 'Escape') this.resetTyping()
    },
    resetTyping() {
      // this.currentPos = 0
      this.value = ''
      this.setErrorCount(0)
      // this.updateViewer(this.currentSentence)
    },
    preventNotAllowedKeys(e) {
      if(NOT_ALLOWED_KEYS.includes(e.key)) e.preventDefault()
    },
    updateCurrentSentence(targetPos) {
      if (targetPos > this.getSentencesCount) {
        console.log('DONE')
      } else {
        this.setSentencePos(targetPos)
        this.setSentences(R.splitEvery(this.wordsPerSentence, this.sourceText.split(' ')).map(x => x.join(' ')))
        this.currentSentence = this.sentences[this.sentencePos]
      }
    },
    removeStatus(letter, status){
      const listMethod =  item => !status.includes(item)
      const stringMethod =  item => item !== status
      const targetMethod = Array.isArray(status) ? listMethod : stringMethod
      letter.statuses = letter.statuses.filter(targetMethod);
    },
    addStatus(letter, status){
      this.removeStatus(letter, status);
      letter.statuses.push(status)
    },
    onClickToogleTyping() {
      const { customText, userInput } = this.$refs
      this.resetTyping()
      this.setDisableTyping(!this.disableTyping)
      this.setMenuOpen(false)
      this.updateCurrentSentence(0)

      if(this.disableTyping) {
        customText.focus()
        return
      }

      userInput.removeAttribute('disabled')
      userInput.focus()
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
