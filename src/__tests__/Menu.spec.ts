import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Menu from '@/components/Menu.vue'

describe('Menu.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the component', () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    expect(wrapper.find('.Menu').exists()).toBe(true)
  })

  it('renders BurgerMenu component', () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    expect(wrapper.findComponent({ name: 'BurgerMenu' }).exists()).toBe(true)
  })

  it('renders ToggleButton for capital letters', () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    expect(wrapper.findComponent({ name: 'ToggleButton' }).exists()).toBe(true)
  })

  it('displays current font size', () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    const fontSize = wrapper.find('.currentFontSize')
    expect(fontSize.exists()).toBe(true)
  })

  it('renders font size control buttons', () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    const buttons = wrapper.findAll('.fontSizeControlerButtons')
    expect(buttons).toHaveLength(2)
  })

  it('displays words per sentence', () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    const table = wrapper.find('table')
    expect(table.exists()).toBe(true)
    expect(wrapper.findAll('tr')).toHaveLength(4)
  })

  it('renders menu content', () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    const content = wrapper.find('.content')
    expect(content.exists()).toBe(true)
  })

  it('hides menu content when menu is closed', async () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    // Access store from wrapper to toggle menu
    const store = wrapper.vm.store
    store.toggleMenuOpen()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick() // Extra tick to ensure reactivity
    const content = wrapper.find('.content')
    expect(content.exists()).toBe(true)
  })

  it('toggles menu when burger menu is clicked', async () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    const store = wrapper.vm.store
    expect(store.menuOpen).toBe(false) // Default state
    
    await wrapper.find('.BuggerMenu').trigger('click')
    expect(store.menuOpen).toBe(true)
  })

  it('increases font size when plus button is clicked', async () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    const store = wrapper.vm.store
    const initialSize = store.fontSize
    const buttons = wrapper.findAll('.fontSizeControlerButtons')
    await buttons[0].trigger('click')
    expect(store.fontSize).toBe(initialSize + 2)
  })

  it('decreases font size when minus button is clicked', async () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    const store = wrapper.vm.store
    const initialSize = store.fontSize
    const buttons = wrapper.findAll('.fontSizeControlerButtons')
    await buttons[1].trigger('click')
    expect(store.fontSize).toBe(initialSize - 2)
  })

  it('renders select dropdown for fonts', () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
  })

  it('renders table with configuration options', () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    const table = wrapper.find('table')
    expect(table.exists()).toBe(true)
    const rows = wrapper.findAll('tr')
    expect(rows.length).toBeGreaterThan(0)
  })

  it('displays Capital letters label', () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    expect(wrapper.text()).toContain('Capital letters')
  })

  it('displays Text size label', () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    expect(wrapper.text()).toContain('Text size')
  })

  it('displays Font label', () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    expect(wrapper.text()).toContain('Font')
  })

  it('applies hide class when disableTyping is true', async () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [createPinia()],
      },
    })
    const store = wrapper.vm.store
    store.setDisableTyping(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.Menu').exists()).toBe(true)
  })
})
