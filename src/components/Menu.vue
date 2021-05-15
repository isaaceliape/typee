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

<script>
import { mapState, mapMutations } from 'vuex'

import ToggleButton from './ToggleButton.vue'
import BurgerMenu from './BurgerMenu.vue'

export default {
  components: {
    BurgerMenu,
    ToggleButton,
  },
  data() {
    return {
      selectedFontValue: `'Ubuntu Mono', monospace`,
    };
  },
  computed: {
    ...mapState([
      'fonts',
      'fontSize',
      'menuOpen',
      'selectedFont',
      'wordsPerSentence',
      'disableTyping',
      'showCapitalLetters',
    ]),
    menuHiddenClass() {
      return this.menuOpen ? '' : 'hide'
    },
  },
  watch: {
    selectedFontValue(value) {
      this.setSelectedFont(value)
    }
  },
  methods: {
    ...mapMutations([
      'toggleMenuOpen',
      'setSelectedFont',
      'increaseFontSize',
      'decreaseFontSize',
      'setDisableTyping',
      'toggleCapitalLetters',
    ]),
    onClickBurgerMenu() {
      this.toggleMenuOpen()
      if (!this.disableTyping) this.setDisableTyping(true)
    }
  }
}
</script>

<style lang="scss" scoped>
  td {
    white-space: nowrap;
  }
  .Menu {
    position: absolute;
    left: 5px;
    top: 5px;
    transition: left 300ms ease;

    &.hide {
      left: -50px
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