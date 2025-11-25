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
        v-model="value"
        class="userInput"
        disabled="disabled"
        autofocus
        @blur="onDisableTyping"
      >
      <!-- eslint-disable vue/no-v-html -->
      <div class="wordCountdown">
        {{ wordsCount }} / {{ wordsPerSentence }}
      </div>
      <div
        ref="viewer"
        class="viewer"
        :style="{fontSize: `${fontSize}px`, fontFamily: `${selectedFont}`}"
      >
        <Letter
          v-for="(letter, i) in finalText"
          :key="i"
          :text="letter.text"
          :classes="letter.classes"
        />
      </div>

      <div
        ref="caret"
        class="caret animate"
      />
    </div>

    <Keymap
      v-if="!disableTyping"
      :selected-key="nextLetter"
    />
    
    <button
      class="toogleTyping"
      @click="onClickToogleTyping"
    >
      {{ toogleTypingBtnText }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as R from 'ramda'
import { mapState, mapMutations, mapGetters } from 'vuex'

import Letter from './Letter.vue'
import InfoPanel from './InfoPanel.vue'
import Keymap from './Keymap.vue'

import mostCommonEnglishWords from '../assets/1000EnglishWords'

interface LetterData {
  text: string
  classes: string[]
}

const mock_data = mostCommonEnglishWords.sort(() => Math.random() - 0.5).join(' ')
const NOT_ALLOWED_KEYS = ['ArrowLeft','ArrowRight','Tab']
let debounceTimer: number | null = null

export default defineComponent({
  components: {
    InfoPanel,
    Letter,
    Keymap,
  },
  data() {
    return {
      currentPos: 0,
      value: '',
      currentSentence: null as string | null,
      finalText: [{ text: '&nbsp;', classes: ['active'] }] as LetterData[],
      sourceText: mock_data,
      article: '',
      articleTitle: '',
      onKeydownHandler: null as ((e: KeyboardEvent) => void) | null,
    }
  },
  computed: {
    ...mapState([
      'fontSize',
      'sentences',
      'wordsCount',
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
    toogleTypingBtnText(): string {
      const action = this.disableTyping ? 'start' : 'stop'
      return `${action} typing`
    },
    nextLetter(): string | undefined {
      return this.currentSentence ? this.currentSentence[this.value.length] : undefined
    }
  },
  watch: {
    value(currentText: string) {
      if (this.currentSentence && currentText.length >= this.currentSentence.length) {
        this.updateCurrentSentence(this.sentencePos + 1)
        this.resetTyping()
      }
      this.updateViewer(currentText)
    }
  },
  mounted(){
    this.updateCurrentSentence(0)
    this.updateViewer(this.currentSentence || '')
    this.onClickToogleTyping()
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
    updateErrorCount(currentSentence: string, currentText: string, currPosLetter: number): void {
      if(currentSentence[currPosLetter] !== currentText[currPosLetter]) this.increaseErrorCount()
    },
    updateWordsCount(): void {
      const count = this.value
        .split(' ').length - 1
      this.setWordsCount(count)
    },
    updateViewer(text: string): void {
      let analizedText: LetterData[] = []
      let currPosLetter = 0
      const parsedText = text.replace(/ /g, '␣')
      let parsedCurrentSentence = this.currentSentence ? this.currentSentence.replace(/ /g, '␣') : ''
      if(!this.showCapitalLetters) parsedCurrentSentence = parsedCurrentSentence.toLowerCase()
      for (let i = 0; i < parsedCurrentSentence.length; i++) {
        const currPosText = parsedText[i]
        const currPosSentenceText = parsedCurrentSentence[i]
        const classes = ['letter']
        let finalText = currPosSentenceText

        if (i === this.value.length) {
          currPosLetter = i - 1
          classes.push('active')
        }
        if(typeof currPosText !== 'undefined') {
          const status = currPosText !== currPosSentenceText ? 'error' : 'success'
          finalText = currPosText
          classes.push(status)
        }
        if (currPosSentenceText === '␣') classes.push('space')
        const finalLetter: LetterData = {
          text: finalText,
          classes,
        }
        analizedText.push(finalLetter)
      }
      this.updateErrorCount(parsedCurrentSentence, parsedText, currPosLetter)
      this.updateWordsCount()
      this.finalText = analizedText
      this.updateCaretPos()
    },
    updateCaretPos(): void {
      this.$nextTick(() => {
        const activeLetterEl = document.querySelector('.viewer .active') as HTMLElement | null
        const caret = document.querySelector('.caret') as HTMLElement | null
        if (caret) caret.classList.remove('animate')
        if (!activeLetterEl || !caret) return 
        const { y, x } = activeLetterEl.getBoundingClientRect()
        const topExtaPixels = (y / 100) * 2
        caret.style.left = `${x - 1}px`
        caret.style.top = `${y + topExtaPixels}px`
        this.debounce(() => caret.classList.add('animate'), 100)
      })
    },
    onKeydown(e: KeyboardEvent): void {
      this.preventNotAllowedKeys(e)
      if (this.value === '') return
      if (e.key === 'Tab') this.resetTyping()
    },
    debounce(callback: () => void, interval = 300): void {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(callback, interval)
    },
    resetTyping(): void {
      this.currentPos = 0
      this.value = ''
      this.setErrorCount(0)
      this.updateViewer(this.currentSentence || '')
    },
    preventNotAllowedKeys(e: KeyboardEvent): void {
      if(NOT_ALLOWED_KEYS.includes(e.key)) e.preventDefault()
    },
    updateCurrentSentence(targetPos: number): void {
      if (targetPos > this.getSentencesCount) {
        console.log('DONE')
      } else {
        this.setSentencePos(targetPos)
        this.setSentences(R.splitEvery(this.wordsPerSentence, this.sourceText.split(' ')).map((x: string[]) => x.join(' ')))
        this.currentSentence = this.sentences[this.sentencePos]
      }
    },
     onClickToogleTyping(): void {
       const { userInput } = this.$refs as { userInput: HTMLInputElement }
       let sentence = this.currentSentence
       this.resetTyping()
       this.setDisableTyping(!this.disableTyping)
       this.setMenuOpen(false)
       this.updateCurrentSentence(0)

       userInput.removeAttribute('disabled')
       userInput.focus()
       sentence = this.showCapitalLetters && sentence ? sentence : sentence?.toLowerCase() || ''
       this.updateViewer(sentence)
       this.onKeydownHandler = (e: KeyboardEvent) => this.onKeydown(e)
       document.addEventListener('keydown', this.onKeydownHandler)
     },
     onDisableTyping(): void {
       this.setDisableTyping(true)
       this.setMenuOpen(false)
       if (this.onKeydownHandler) {
         document.removeEventListener('keydown', this.onKeydownHandler)
         this.onKeydownHandler = null
       }
     }
  },
})
</script>
<style lang="scss">

  body {
    font-size: 16px;
    padding-top: 15px;
  }

  table, th, td {
    border: 1px solid rgb(0, 0, 0);
    border-collapse: collapse;
    font-size: 16px;
  }

  th, td {
    padding: 5px;
  }

  .wordCountdown {
    text-align: center;
    font-size: 1.5rem; 
  }

  .caret {
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 2em;
    background-color: black;
    transition: left 200ms ease, top 200ms ease;
    &.animate {
      animation: 1s steps(1, start) 1s infinite normal none running caret-blink;
    }
  }

  .wrapViewer {
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
    text-align: center;
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
  @keyframes caret-blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
