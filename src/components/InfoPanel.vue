<template>
  <div class="InfoPanel">
    <table class="info">
      <tr>
        <th>Words</th>
        <th>Errors</th>
      </tr>
      <tr>
        <td><span class="words">{{ words }}</span></td>
        <td><span class="errors">{{ errors }}</span></td>
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
  },
}
</script>

<style scoped lang="scss">
.info {
  margin: 0 auto;
  border: 1px solid black;
}
.info ul{
  list-style-type: none;
}
.info li{
  display: inline-block;
}
</style>