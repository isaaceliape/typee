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
  border: 1px solid var(--border-color);
  border-radius: 3px;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  th,
  td {
    border-right: 0;
    border-top: 0;
    color: var(--text-color);
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