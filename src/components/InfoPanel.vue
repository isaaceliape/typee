<template>
  <div class="InfoPanel">
    <table class="info">
      <tr>
        <th>Words</th>
        <th>Errors</th>
      </tr>
      <tr>
        <td><span class="words">{{ wordsCount }}</span></td>
        <td><span class="errors">{{ errorCount }}</span></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: mapState([
    'errorCount',
    'fontSize',
    'wordsCount',
    'showCapitalLetters',
  ]),
  methods: mapMutations(['toggleCapitalLetters'])
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

</style>