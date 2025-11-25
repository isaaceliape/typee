<template>
  <div id="app" :class="{ 'dark-mode': store.darkMode }">
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
    // Initialize dark mode from localStorage or system preference
    this.store.initializeDarkMode()
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

  :root {
    --text-color: #000;
    --bg-color: #fff;
    --border-color: #000;
    --button-hover-bg: #000;
    --button-hover-text: #fff;
  }

  html.dark-mode {
    --text-color: #e0e0e0;
    --bg-color: #1a1a1a;
    --border-color: #e0e0e0;
    --button-hover-bg: #e0e0e0;
    --button-hover-text: #000;
  }

  body {
    font-size: 16px;
    padding-top: 15px;
    color: var(--text-color);
    background-color: var(--bg-color);
    transition: color 0.3s ease, background-color 0.3s ease;
  }

  #app.dark-mode {
    color: var(--text-color);
    background-color: var(--bg-color);
  }

  .apply {
    border: 1px solid var(--border-color);
    background: var(--bg-color);
    color: var(--text-color);
    border-radius: 3px;
    padding: 5px 10px;
    margin: 0 auto;
    display: block;
    font-size: 20px;
    outline: 0;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: var(--button-hover-bg);
      color: var(--button-hover-text);
    }
  }
</style>
