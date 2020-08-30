<template>
  <div id="app">
    <table class="info">
      <tr>
        <th>Words</th>
        <th>Errors</th>
      </tr>
      <tr>
        <td><span class="numberOfWords">0</span></td>
        <td><span class="numberOfError">0</span></td>
      </tr>
    </table>
    <TextRenderer
      ref="TextRenderer"
      :letters="letters"
    />
    <button class="toogleTyping">Start typing</button>
    <textarea
      class="textArea"
      rows="4"
      cols="50"
      :value="text"
    />
    <button class="apply">Apply</button>
  </div>
</template>

<script>
import TextRenderer from './components/TextRenderer';

const MOCK_DATA = 'Google took five days to review several ads with misleading information about voting by mail before opting to approve them, The Washington Post reported. The ads were created by Protect My Vote a group the Post refers to as "shadowy" and appeared to target people in several US states, including Arizona, Florida, Georgia, Iowa, Michigan, and Texas, showing up in response to searches for "mail-in voting." One of the ads reads "think mail-in voting and absentee voting are the same. Think again There are different safeguards for each a misleading and inaccurate claim.'

export default {
  name: 'App',
  components: {
    TextRenderer,
  },
  data() {
    return {
      letters: [],
      text: MOCK_DATA,
    }
  },
  methods: {
    render() {
      this.renderTextEl.innerHTML = this.letters
        .map(({ text, status, active, type }) => {
          const activeClass = active ? ' active' : ''
          const typeClass = type === 'space' ? ' isSpace' : ''
          return `<span class='${status}${activeClass}${typeClass}'>${text}</span>`;
        })
        .join('');
    },
    sanitizeText() {
      this.letters = Array.from(this.textArea.value).map( (text, i) => {
        let type = text === ' '? 'space' : '';
        return {
          text: text.toLowerCase(),
          status: 'ok',
          active: i === 0,
          type,
        };
      });
    },
  },
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    font-family: Courier;
  }

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

  .apply,
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

  .textArea {
    padding: 10px 15px;
    margin: 50px auto 15px auto;
    display: block;
    font-size: 20px;
    width: 80vw;
    max-width: 800px;
    box-sizing: border-box;
  }

  .error {
    color: red !important;
  }

  .success {
    color: black !important;
  }

  .active {
    animation: blink 600ms steps(1, start) infinite;
  }

  .isSpace.success:before {
    color: black;
  }
  .isSpace.error:before {
    color: red;
    opacity: 1;
  }
  .isSpace:before {
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
