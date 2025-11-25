<template>
  <div class="Keymap">
    <div
      v-for="(row, i) in keys"
      :key="i"
      class="row"
      :class="`row-${i + 1}`"
    >
      <span
        v-for="text in row"
        :key="text"
        :class="{
          active: selectedKey.toUpperCase() === text
        }"
        class="key"
        :data-key="text"
      >
        {{ text }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface KeymapData {
  keys: string[][]
}

export default defineComponent({
  props: {
    selectedKey: {
      type: String,
      default: '',
    }
  },
  data(): KeymapData {
    return {
      keys: [
        ['Q','W','E','R','T','Y','U','I','O','P'],
        ['A','S','D','F','G','H','J','K','L',';'],
        ['Z','X','C','V','B','N','M'],
        [' ']
      ]
    }
  },
})
</script>
<style lang="scss" scoped>
  .Keymap {
    width: 687px;
    margin: 0 auto 40px auto;
  }
  .key {
    border-radius: 3px;
    border: 1px solid var(--border-color);
    padding: 10px 25px;
    margin: 3px;
    display: inline-block;
    transition: background-color 100ms ease-in, border-color 0.3s ease, color 0.3s ease;
    background-color: var(--bg-color);
    color: var(--text-color);

    &.active {
      background-color: var(--button-hover-bg);
      color: var(--button-hover-text);
    }
    &[data-key=" "]{
      width: 280px;
      text-align: center;
      margin-left: 183px;
      &:before {
        content: 'Typee';
      }
    }
    &[data-key="F"],
    &[data-key="J"]{
      background-color: #bbb;
      position: relative;
      &:after {
        content: "_";
        position: absolute;
        left: 50%;
        bottom: 7px;
        transform: translateX(-50%);
      }
      &.active {
        background-color: var(--button-hover-bg);
        color: var(--button-hover-text);
      }
    }
  }
  .row-2 {
    margin-left: 10px;
  }
  .row-3 {
    margin-left: 44px;
  }
</style>