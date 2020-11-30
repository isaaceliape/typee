<template>
  <div id="app">
    <TextRenderer
      :letters="letters"
      :article-title="articleTitle"
    />
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
      Type this news
    </button>
  </div>
</template>

<script>
import TextRenderer from './components/TextRenderer';
import xml2js from 'xml2js';

export default {
  name: 'App',
  components: {
    TextRenderer,
  },
  data() {
    return {
      letters: [],
      text: '',
      article: '',
      articleTitle: '',
    }
  },
  mounted() {
    this.loadFeed();
  },
  watch: {
    article(article) {
      const div = document.createElement('div');
      div.innerHTML = article;
      let text = div.innerText;
      // text = this.removeSpecialCaracters(text).trim();
      text = text.replace(/\s{2,}/g, '');
      this.text = text;
    }
  },
  methods: {
    sanitizeText() {
      this.letters = Array.from(this.text).map((letter, i) => {
        let type = letter === ' ' ? 'space' : '';
        let text = letter;
        if (text === '’') text = letter = '\'';
        return {
          text,
          status: 'ok',
          active: i === 0,
          type,
        };
      });
    },
    removeSpecialCaracters(text) {
      return text.replace(/[^\w\s]/gi, '');
    },
    loadFeed() {
      fetch('https://www.theverge.com/rss/index.xml')
        .then(res => res.text())
        .then((data) => {
          return xml2js.parseString(data, (err, result) => {
            const randomArticle = Math.floor(Math.random() * result.feed.entry.length + 1);
            const article = result.feed.entry[randomArticle];
            this.articleTitle = article?.title[0] ?? '';
            this.article = article?.content[0]._ ?? '';
            this.sanitizeText();
          });
        });
    }
  },
}
</script>

<style lang="scss">
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
