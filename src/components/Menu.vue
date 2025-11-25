<template>
  <div
    class="Menu"
    :class="{ hide: !store.disableTyping }"
  >
    <BurgerMenu @click="store.toggleMenuOpen" />
    <div
      class="content"
      :class="menuHiddenClass"
    >
      <table>
        <tr>
          <td>Capital letters</td>
          <td>
            <ToggleButton
              :active="store.showCapitalLetters"
              @on-click-toggle-button="store.toggleCapitalLetters"
            />
          </td>
        </tr>
        <tr>
          <td>Text size</td>
          <td class="fontSizeControler">
            <span class="currentFontSize">{{ store.fontSize }}</span>
            <button
              class="fontSizeControlerButtons"
              @click="store.increaseFontSize"
            >
              +
            </button>
            <button
              class="fontSizeControlerButtons"
              @click="store.decreaseFontSize"
            >
              -
            </button>
          </td>
        </tr>
        <tr>
          <td>Font</td>
          <td>
            <select v-model="selectedFontValue">
              <option
                v-for="{ value, text } in store.fonts"
                :key="value"
                :value="value"
                :selected="value === store.selectedFont ? 'selected' : false"
              >
                {{ text }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Words per sentence</td>
          <td>{{ store.wordsPerSentence }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useAppStore } from '../store/app'

import ToggleButton from './ToggleButton.vue'
import BurgerMenu from './BurgerMenu.vue'

export default defineComponent({
  components: {
    BurgerMenu,
    ToggleButton,
  },
  setup() {
    const store = useAppStore()

    const menuHiddenClass = computed(() => store.menuOpen ? '' : 'hide')

    const selectedFontValue = computed({
      get: () => store.selectedFont,
      set: (value: string) => {
        store.setSelectedFont(value)
      }
    })

    function onClickBurgerMenu(): void {
      store.toggleMenuOpen()
      if (!store.disableTyping) store.setDisableTyping(true)
    }

    return {
      store,
      menuHiddenClass,
      onClickBurgerMenu,
      selectedFontValue,
    }
  },
})
</script>

<style lang="scss" scoped>
  td {
    white-space: nowrap;
  }
  .Menu {
    position: absolute;
    left: 5px;
    top: 5px;
    transform: translateX(0);
    transition: all 300ms ease;

    &.hide {
      transform: translateX(-100%);
      left: 0;
    }
  }
  table {
    border-collapse: separate;
    border: 1px solid black;
    border-radius: 3px;
    tr {
      td {
        border-right: 0;
        border-top: 0;
        &:first-child {
          border-left: 0;
        }
        &:last-child {
          text-align: center;
        }
      }
      &:last-child {
        td {
          border-bottom: 0;
        }
      }
    }
  }
  .content {
    transition: all 250ms ease;
    overflow: hidden;
    &.hide {
      width: 0px;
    }
  }
  .currentFontSize {
    margin-right: 10px;
  }
  .fontSizeControlerButtons {
    padding: 4px 8px;
    margin-right: 5px;
    border-radius: 3px;
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