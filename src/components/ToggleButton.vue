<template>
  <div
    class="ToggleButton"
    :class="[{bg: bg}, activeClass]"
    @click="$emit('on-click-toggle-button')"
  >
    <div class="knob" />
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    bg:{
      type: Boolean,
      default: false
    }
  },
  emits: ['on-click-toggle-button'],
  setup(props) {
    return { activeClass: computed(() => props.active ? 'active' : '') }
  }
}
</script>

<style lang="scss" scoped>
  .ToggleButton {
    border: 1px solid var(--line-default);
    border-radius: 5px;
  }
  .ToggleButton {
    width: 60px;
    height: 20px;
    cursor: pointer;
    margin: 0 auto;
    &.active {
      .knob {
        transform: translateX(0%);
        border-right: 1px solid;
        border-left: 0;
        opacity: 1;
      }
    }
    &.bg{
      position: absolute;
      top: 15px;
      right: 15px;
      background: url('../assets/moon-black.svg') 6px center/14px no-repeat;
      &.active{
        .knob{
          background: url('../assets/moon.svg') 6px center/14px no-repeat #c3c3c3;
        }
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
    border-left: 1px solid;
    border-radius: 5px;
  }
</style>