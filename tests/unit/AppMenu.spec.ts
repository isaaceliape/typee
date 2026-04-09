import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppMenu from '@/components/AppMenu.vue'
import { createStore } from 'vuex'

describe('AppMenu.vue', () => {
  const createMockStore = () => {
    return createStore({
      state: {
        fontSize: 20,
        menuOpen: false,
        selectedFont: "'Ubuntu Mono', monospace",
        fonts: [
          { text: 'Ubuntu', value: "'Ubuntu Mono', monospace" },
          { text: 'Roboto', value: "'Roboto Mono', monospace" },
        ],
        showCapitalLetters: false,
        disableTyping: true,
      },
      mutations: {
        setMenuOpen: () => {},
        increaseFontSize: () => {},
        decreaseFontSize: () => {},
        setSelectedFont: () => {},
        toggleCapitalLetters: () => {},
      },
    })
  }

  it('renders AppMenu component', () => {
    const store = createMockStore()
    const wrapper = mount(AppMenu, {
      global: {
        plugins: [store],
        stubs: ['BurgerMenu', 'ToggleButton']
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('has menu content div', () => {
    const store = createMockStore()
    const wrapper = mount(AppMenu, {
      global: {
        plugins: [store],
        stubs: ['BurgerMenu', 'ToggleButton']
      }
    })
    expect(wrapper.find('.content').exists()).toBe(true)
  })

  it('displays settings table', () => {
    const store = createMockStore()
    const wrapper = mount(AppMenu, {
      global: {
        plugins: [store],
        stubs: ['BurgerMenu', 'ToggleButton']
      }
    })
    expect(wrapper.find('table').exists()).toBe(true)
  })
})
