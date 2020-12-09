<template>
  <div id="app">
    <TextRenderer />
  </div>
</template>

<script>
import TextRenderer from './components/TextRenderer';

export default {
  name: 'App',
  components: {
    TextRenderer,
  },
  watch: {
    article(article) {
      const div = document.createElement('div');
      div.innerHTML = article;
      let text = div.innerText;
      text = text.replace(/\s{2,}/g, '');
      this.rawText = text;
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

</style>
