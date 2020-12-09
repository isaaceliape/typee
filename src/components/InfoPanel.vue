<template>
  <div class="InfoPanel">
    <table class="info">
      <tr>
        <th>Words</th>
        <th>Errors</th>
        <th>Text size</th>
      </tr>
      <tr>
        <td><span class="words">{{ words }}</span></td>
        <td><span class="errors">{{ errors }}</span></td>
        <td class="fontSizeControler">
          <span class="currentFontSize">{{ fontSize }}</span>
          <button
            class="fontSizeControlerButtons"
            @click="() => this.$emit('changeFontSize', 'incriseFontSize', 1)"
          >
            +
          </button>
          <button
            class="fontSizeControlerButtons"
            @click="() => this.$emit('changeFontSize', 'decriseFontSize', 1)"
          >
            -
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    words: {
      type: Number,
      default: 0
    },
    errors: {
      type: Number,
      default: 0
    },
    fontSize: {
      type: Number,
      default: 0
    },
  },
}
</script>

<style lang="scss" scoped>
.info {
  margin: 0 auto;
  border: 1px solid black;
  text-align: center;
}

.currentFontSize {
  display: block;
  margin-bottom: 5px;
}

.fontSizeControlerButtons {
  padding: 4px 8px;
  margin-right: 5px;
  border-radius: 5px;
  background-color: transparent;
  border: 1px solid;
  vertical-align: middle;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
    border-color: transparent;
  }
  &:last-child {
    margin-right: 0;
  }
}
</style>