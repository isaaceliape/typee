<template>
  <div id="app">
    <Menu />
    <TextRenderer />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { updateSelectedFont } from './helpers.js'

import Menu from './components/Menu.vue'
import TextRenderer from './components/TextRenderer.vue'

export default {
  name: 'App',
  components: {
    Menu,
    TextRenderer,
  },
  head: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap'},
    ],
  },
  computed: {
    ...mapState([
      'selectedFont',
      'fonts',
    ])
  },
  watch: {
    selectedFont(value) {
      updateSelectedFont(value)
    },
  },
  mounted() {
    if(!this.selectedFont) this.setSelectedFont(this.fonts[1])
    updateSelectedFont(this.selectedFont)
    if('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
    }
  },
  methods: {
    ...mapMutations([
      'setSelectedFont',
    ]),
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
