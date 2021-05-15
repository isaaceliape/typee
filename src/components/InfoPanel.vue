<template>
  <div class="InfoPanel">
    <table>
      <tr>
        <th>Words</th>
        <th>Errors</th>
        <th>Sentences</th>
      </tr>
      <tr>
        <td><span class="words">{{ wordsCount }}</span></td>
        <td><span class="errors">{{ errorCount }}</span></td>
        <td><span class="errors">{{ sentencePos + 1 }} of {{ getSentencesCount }}</span></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { mapAppState, mapAppGetters, mapAppMutations } from '../helpers'

export default {
  setup() {
    const store = useStore()
    
    return {
      ...mapAppState([
        'errorCount',
        'fontSize',
        'sentences',
        'wordsCount',
        'sentencePos',
        'showCapitalLetters',
      ], store),
      ...mapAppGetters(['getSentencesCount'], store),
      ...mapAppMutations(['toggleCapitalLetters'], store)
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  margin: 0 auto;
  text-align: center;
  border-collapse: separate;
  border: 1px solid black;
  border-radius: 3px;
  th,
  td {
    border-right: 0;
    border-top: 0;
    &:first-child {
      border-left: 0;
    }
  }
  tr {
    &:last-child {
      td,
      th {
        border-bottom: 0;
      }
    }
  }
}
.currentFontSize {
  display: block;
  margin-bottom: 5px;
}

</style>