<template>
  <div id="app">
    <Menu />
    <TextRenderer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { updateSelectedFont } from './helpers'
import { useAppStore } from './store/app'

import Menu from './components/Menu.vue'
import TextRenderer from './components/TextRenderer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Menu,
    TextRenderer,
  },
  head: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap' },
    ],
  },
  setup() {
    const store = useAppStore()
    return { store }
  },
  computed: {
    selectedFont(): string {
      return this.store.selectedFont
    },
    fonts() {
      return this.store.fonts
    },
  },
  watch: {
    selectedFont(value: string) {
      updateSelectedFont(value)
    },
  },
  mounted() {
    if (!this.store.selectedFont) this.store.setSelectedFont(this.store.fonts[1].value)
    updateSelectedFont(this.store.selectedFont)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
    }
  },
})
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
