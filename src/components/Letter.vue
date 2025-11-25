<template>
  <span
    class="Letter"
    :class="classes"
  >
    {{ text }}
  </span>
  <wbr v-if="text === '␣'">
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String,
      default: '' ,
    },
    classes: {
      type: Array as () => string[],
      default: () => [],
    }
  }
})
</script>

<style lang="scss" scoped>
  .Letter {
    position: relative;

    &.success {
      color: #80808063;

      &.space:before {
        color: black;
      }
    }
    &.error {
      color: red;

      &.space {
        color: red;
        opacity: 1;
      }
    }
    &.active {
      &.space {
        &.error:before {
          color: red;
          opacity: 1;
        }
      }
    }
    &.space {
      color: gray;
      opacity: 0.3;
    }
  }
</style>