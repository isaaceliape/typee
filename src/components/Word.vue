<template>
  <span class="Word">
    <Letter
      v-for="letter in letters"
      :key="letter.id"
      :text="letter.text"
      :statuses="letter.statuses"
    />
  </span>
</template>

<script>
import Letter from './Letter.vue'

export default {
  components: {
    Letter,
  },
  props: {
    letters: {
      type: Array,
      default: () => [],
    }
  },
  mounted() {
    // console.log('letters', [...this.letters])
  }
}
</script>

<style lang="scss" scoped>
  .Word {
    display: inline-block;
  }
</style>