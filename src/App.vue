<template>
  <div id="app">
    <Menu />
    <TextRenderer />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import Menu from './components/Menu.vue'
import helpers from './helpers.js'
import TextRenderer from './components/TextRenderer'

export default {
  name: 'App',
  components: {
    Menu,
    TextRenderer,
  },
  computed: {
    ...mapState([
      'selectedFont',
      'fonts',
    ])
  },
  mounted() {
    if(!this.selectedFont) this.setSelectedFont(this.fonts[1])
    helpers.updateSelectedFont(this.selectedFont)
  },
  methods: {
    ...mapMutations([
      'setSelectedFont',
    ]),
  },
  watch: {
    selectedFont(value) {
      helpers.updateSelectedFont(value)
    },
  },
  head: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap'},
    ],
  },
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
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
