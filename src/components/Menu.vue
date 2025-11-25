<template>
  <div
    class="Menu"
    :class="{ hide: !disableTyping }"
  >
    <BurgerMenu @click="onClickBurgerMenu" />
    <div
      class="content"
      :class="menuHiddenClass"
    >
      <table>
        <tr>
          <td>Capital letters</td>
          <td>
            <ToggleButton
              :active="showCapitalLetters"
              @on-click-toggle-button="toggleCapitalLetters"
            />
          </td>
        </tr>
        <tr>
          <td>Text size</td>
          <td class="fontSizeControler">
            <span class="currentFontSize">{{ fontSize }}</span>
            <button
              class="fontSizeControlerButtons"
              @click="increaseFontSize"
            >
              +
            </button>
            <button
              class="fontSizeControlerButtons"
              @click="decreaseFontSize"
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
                v-for="{ value, text } in fonts"
                :key="value"
                :value="value"
                :selected="value === selectedFont ? 'selected' : false"
              >
                {{ text }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Words per sentence</td>
          <td>{{ wordsPerSentence }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { mapAppState, mapAppMutations } from '../helpers'

import ToggleButton from './ToggleButton.vue'
import BurgerMenu from './BurgerMenu.vue'

export default defineComponent({
  components: {
    BurgerMenu,
    ToggleButton,
  },
  setup() {
    const store = useStore()

    const appState = mapAppState([
      'fonts',
      'fontSize',
      'menuOpen',
      'selectedFont',
      'wordsPerSentence',
      'disableTyping',
      'showCapitalLetters',
    ], store)
    const appMutations = mapAppMutations([
      'toggleMenuOpen',
      'setSelectedFont',
      'increaseFontSize',
      'decreaseFontSize',
      'setDisableTyping',
      'toggleCapitalLetters',
    ], store)

    const menuHiddenClass = computed(() => appState.menuOpen.value ? '' : 'hide')

    const selectedFontValue = computed({
      get: () => appState.selectedFont.value,
      set: (value: string) => {
        appMutations.setSelectedFont(value)
      }
    })

    function onClickBurgerMenu(): void {
      appMutations.toggleMenuOpen()
      if (!appState.disableTyping.value) appMutations.setDisableTyping(true)
    }

    return {
      ...appState,
      ...appMutations,
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