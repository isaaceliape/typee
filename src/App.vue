<template>
  <div id="app">
    <ToggleButton
      :active="showDarkMode"
      :bg="true"
      @on-click-toggle-button="setToggleDarkMode"
    />
    <Menu />
    <TextRenderer />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { updateSelectedFont } from './helpers.js'

import Menu from './components/Menu.vue'
import TextRenderer from './components/TextRenderer'
import ToggleButton from './components/ToggleButton.vue'

export default {
  name: 'App',
  components: {
    Menu,
    TextRenderer,
    ToggleButton
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
      'showDarkMode'
    ])
  },
  watch: {
    selectedFont(value) {
      updateSelectedFont(value)
    },
    showDarkMode(value){
      value ? document.body.classList.add("dark-mode") : document.body.classList.remove("dark-mode");
    }
  },
  mounted() {
    if(!this.selectedFont) this.setSelectedFont(this.fonts[1])
    updateSelectedFont(this.selectedFont)
  },
  methods: {
    ...mapMutations([
      'setSelectedFont',
      'toggleDarkMode'
    ]),
    setToggleDarkMode(){
      this.toggleDarkMode()
    }
  },
}
</script>

<style lang="scss">
:root {
    --text-default: #000;
    --line-default: #000;
    --bg-default: #fff;
    --text-dark-mode: #33CB9A;
    --line-dark-mode: #33CB9A;
    --bg-dark-mode: #000;
}


  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-size: 16px;
    padding-top: 15px;
    background-color: var(--bg-default);

    &.dark-mode{
      --text-default: var(--text-dark-mode);
      --line-default: var(--line-dark-mode);
      --bg-default: var(--bg-dark-mode);
    }
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
