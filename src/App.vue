<template>
  <div id="app">
    <TextRenderer :letters="letters"/>
    <textarea
      v-model="text"
      class="textArea"
      rows="4"
      cols="50"
    />
    <button
      class="apply"
      @click="sanitizeText"
    >
      Apply
    </button>
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
  mounted() {
    this.sanitizeText();
  },
  methods: {
    sanitizeText() {
      this.letters = Array.from(this.text).map((text, i) => {
        let type = text === ' ' ? 'space' : '';
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

  .apply {
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

</style>
