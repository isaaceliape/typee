<template>
  <div class="TextRenderer">
    <InfoPanel
      :words="wordsCount"
      :errors="errorCount"
    />
    <h1 class="articleTitle">{{ articleTitle }}</h1>
    <div class="wrap-visualization">
      <textarea
        ref="renderer"
        class="renderer"
        :class="{ disableTyping }"
        v-model="value"
      />
      <div
        ref="visualization"
        class="visualization"
        v-html="finalText"
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
import InfoPanel from './InfoPanel.vue';

export default {
  components: {
    InfoPanel,
  },
  props: {
    articleTitle: {
      type: String,
      default: '',
    },
    rawText: {
      type: String,
      default: '',
    },
    letters: {
      type: Array,
      default: () => ['a'],
    },
  },
  data() {
    return {
      notAllowedKeys: ['Shift','Control','Alt','Meta','CapsLock','Tab','Enter','ArrowLeft','ArrowDown','ArrowRight'],
      currentPos: 0,
      errorCount: 0,
      disableTyping: true,
      value: '',
      finalText: '<span class="active">&nbsp;</span>',
    }
  },
  watch: {
    value(currentText) {
      let analizedText = [];
      const parsedCurrentText = currentText.replace(/ /g, '␣');
      const parsedRawText = this.rawText.replace(/ /g, '␣');
      for (let i = 0; i < parsedRawText.length; i++) {
        const currPosText = parsedCurrentText[i];
        const currPosRawText = parsedRawText[i];
        const classes = ['letter'];

        if (i === parsedCurrentText.length) classes.push('active');
        if(typeof currPosText !== 'undefined') {
          if (currPosText !== currPosRawText) {
            classes.push('error');
          } else {
            classes.push('success');
          }
        }
        if (currPosRawText === '␣') classes.push('space');
        const finalLetter = `<span class="${classes.join(' ')}">${currPosRawText}</span>`;
        analizedText.push(finalLetter);
      }
      this.finalText = analizedText.join('')
    }
  },
  computed: {
    wordsCount() {
      return this.rawText.substr(0, this.currentPos).split(' ').length - 1;
    },
    toogleTypingBtnText(){
      return this.disableTyping
        ? 'Click here to start typing'
        : 'Click here stop typing';
    }
  },
  methods: {
    reset() {
      this.currentPos = 0;
      this.letters.forEach((x, i) => {
        this.letters[i].active = this.currentPos === i;
        this.letters[i].status = 'ok';
      });
    },
    onClickToogleTyping() {
      this.disableTyping = !this.disableTyping;

      if (this.disableTyping){
        this.$refs.renderer.focus();
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

  .wrap-visualization {
    position: relative;
    width: 80vw;
    height: auto;
    max-width: 800px;
    margin: 50px auto 15px auto;
    overflow: hidden;
  }
  .renderer,
  .visualization {
    border: 0;
    display: block;
    font-size: 30px;
    line-height: 1.2em;
    width: 100%;
    color: gray;
    border: 1px solid red;
    box-sizing: border-box;
  }
  .renderer {
    position: absolute;
    opacity: 0;
  }
  .visualization {
    outline: 1px solid green;
    pointer-events: none;
    color: black;
    position: relative;
    z-index: 1;
  
    .error {
      color: red;
    }
  }

  .letter {
    position: relative;
    display: inline-block;
  }

  .visualization.disableTyping,
  .visualization.disableTyping .active,
  .visualization.disableTyping .success,
  .visualization.disableTyping .letter.active.space {
    animation: none;
    color: rgb(211, 211, 211);
  }

  .success {
    color: gray;
  }

  .active {
    animation: blink 600ms steps(1, start) infinite;
  }

  .letter.active.error {
    animation: blinkError 600ms steps(1, start) infinite;
  }
  .letter.active.space.error:before {
    color: red;
    opacity: 1;
  }
  .letter.active.space {
    animation: blink 600ms steps(1, start) infinite;
  }

  .space.success:before {
    color: black;
  }
  .space {
    color: gray;
    opacity: 0.3;
  }

  .articleTitle {
    max-width: 800px;
    margin: 25px auto 0 auto;
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
  @keyframes blinkError {
    0% {
      background-color: transparent;
      color: red;
    }
    50% {
      background-color: black;
      color: red;
    }
    100% {
      background-color: transparent;
      color: red;
    }
  }
</style>
