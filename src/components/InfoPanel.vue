<template>
  <div class="InfoPanel">
    <table>
      <tr>
        <th>Errors</th>
        <th>Sentences</th>
      </tr>
      <tr>
        <td><span class="errors">{{ store.errorCount }}</span></td>
        <td><span class="errors">{{ store.sentencePos + 1 }} of {{ store.getSentencesCount }}</span></td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppStore } from '../store/app'

export default defineComponent({
  setup() {
    const store = useAppStore()
    
    return {
      store,
    }
  }
})
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