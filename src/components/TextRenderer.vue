<template>
  <div class="TextRenderer">
    <table class="info">
      <tr>
        <th>Words</th>
        <th>Errors</th>
      </tr>
      <tr>
        <td><span class="numberOfWords">0</span></td>
        <td><span class="numberOfError">{{ errorCount }}</span></td>
      </tr>
    </table>
    <h1 class="articleTitle">{{ articleTitle }}</h1>
    <div
      ref="renderer"
      class="renderer"
      :class="{ disableTyping }"
    >
      <span
        v-for="({ text, status, active, type }, index) in letters"
        :key="index"
        class="letter"
        :class="[{ active }, status, type]"
      >{{ text }}</span>
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
export default {
  name: 'TextRenderer',
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
      allowedKeys: ['Escape','Backspace','\'','.',',',' ','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'],
      currentPos: 0,
      errorCount: 0,
      disableTyping: true,
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

      const listener = this.disableTyping
        ? 'removeEventListener'
        : 'addEventListener';

      document[listener]('keyup', this.onKeyup);
      document[listener]('keydown', this.onKeydown);

      if (this.disableTyping){
        this.$refs.renderer.focus();
      }
    },
    onKeyup(e){
      const key = e.key;
      const isInvalidKey = !this.allowedKeys.includes(key);
      const isFinished = this.currentPos > this.letters.length;
      if(isInvalidKey || isFinished) return;
      
      switch (key) {
        case 'Backspace':
          this.letters[this.currentPos].status = 'ok';
          this.currentPos = this.currentPos - 1 >= 0
            ? this.currentPos - 1
            : 0;
          break;
        case 'Escape':
          this.reset();
          break;

        case this.letters[this.currentPos].text:
          this.letters[this.currentPos].status = 'success';
          this.currentPos += 1;
          break;
      
        default:
          this.letters[this.currentPos].status = 'error';
          this.errorCount += 1;
          break;
      }
      
      this.letters.forEach((x, i) => {
        this.letters[i].active = this.currentPos === i;
      });
    },
    onKeydown(e) {
      if (e.code === 'Space') e.preventDefault();
    },
  },
}
</script>
<style scoped>

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

  .renderer {
    border: 0;
    margin: 50px auto 15px auto;
    display: block;
    font-size: 30px;
    line-height: 1.2em;
    width: 80vw;
    height: auto;
    max-width: 800px;
    color: gray;
  }

  .letter {
    position: relative;
  }

  .renderer.disableTyping,
  .renderer.disableTyping .active,
  .renderer.disableTyping .success,
  .renderer.disableTyping .letter.active.space {
    animation: none;
    color: rgb(211, 211, 211);
  }

  .success {
    color: black;
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
  .space:before {
    content: '␣';
    position: absolute;
    bottom: 2px;
    color: gray;
    opacity: 0.3;
  }

  .info {
    margin: 0 auto;
    border: 1px solid black;
  }
  .info ul{
    list-style-type: none;
  }
  .info li{
    display: inline-block;
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
