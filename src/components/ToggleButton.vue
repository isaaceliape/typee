<template>
  <div
    class="ToggleButton"
    :class="activeClass"
    @click="$emit('on-click-toggle-button')"
  >
    <div class="knob" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['on-click-toggle-button'],
  setup(props) {
    return { activeClass: computed(() => props.active ? 'active' : '') }
  }
})
</script>

<style lang="scss" scoped>
  .ToggleButton {
    border: 1px solid var(--border-color);
    border-radius: 5px;
    width: 60px;
    height: 20px;
    cursor: pointer;
    margin: 0 auto;
    transition: border-color 0.3s ease;
    &.active {
      .knob {
        transform: translateX(0%);
        border-right: 1px solid var(--border-color);
        border-left: 0;
        opacity: 1;
      }
    }
  }
  .knob {
    height: 20px;
    width: 30px;
    box-sizing: border-box;
    background-color: #c3c3c3;
    opacity: .5;
    transition: all 150ms ease;
    transform: translateX(100%);
    border-left: 1px solid var(--border-color);
    border-radius: 5px;
  }
</style>