<template>
  <div class="Menu">
    <BurgerMenu @click="toggleMenuOpen" />
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
                v-for="value in fonts"
                :key="value"
                :value="value"
              >
                {{value}}
              </option>
            </select>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import ToggleButton from './ToggleButton.vue';
import BurgerMenu from './BurgerMenu.vue';

export default {
  components: {
    BurgerMenu,
    ToggleButton,
  },
  data() {
    return {
      selectedFontValue: this.selectedFont,
    };
  },
  computed: {
    ...mapState([
      'fonts',
      'fontSize',
      'menuOpen',
      'selectedFont',
      'showCapitalLetters',
    ]),
    menuHiddenClass() {
      return this.menuOpen ? '' : 'hide';
    },
  },
  methods: {
    ...mapMutations([
      'toggleMenuOpen',
      'increaseFontSize',
      'decreaseFontSize',
      'toggleCapitalLetters',
    ]),
  }
}
</script>

<style lang="scss" scoped>
  td {
    white-space: nowrap;
  }
  .menu {
    position: absolute;
    left: 0;
    top: 0;
  }
  .content {
    transition: all 250ms ease;
    overflow: hidden;
    width: 255px;
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