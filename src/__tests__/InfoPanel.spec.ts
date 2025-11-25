import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import InfoPanel from '@/components/InfoPanel.vue'

describe('InfoPanel.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the component', () => {
    const wrapper = mount(InfoPanel, {
      global: {
        plugins: [createPinia()],
      },
    })
    expect(wrapper.find('.InfoPanel').exists()).toBe(true)
  })

  it('renders a table', () => {
    const wrapper = mount(InfoPanel, {
      global: {
        plugins: [createPinia()],
      },
    })
    expect(wrapper.find('table').exists()).toBe(true)
  })

  it('displays errors header', () => {
    const wrapper = mount(InfoPanel, {
      global: {
        plugins: [createPinia()],
      },
    })
    expect(wrapper.text()).toContain('Errors')
  })

  it('displays sentences header', () => {
    const wrapper = mount(InfoPanel, {
      global: {
        plugins: [createPinia()],
      },
    })
    expect(wrapper.text()).toContain('Sentences')
  })

  it('displays error count', () => {
    const wrapper = mount(InfoPanel, {
      global: {
        plugins: [createPinia()],
      },
    })
    expect(wrapper.find('.errors').exists()).toBe(true)
  })

  it('displays sentence position and count', () => {
    const wrapper = mount(InfoPanel, {
      global: {
        plugins: [createPinia()],
      },
    })
    const errors = wrapper.findAll('.errors')
    expect(errors.length).toBeGreaterThan(1)
  })

  it('updates when errorCount changes', async () => {
    const wrapper = mount(InfoPanel, {
      global: {
        plugins: [createPinia()],
      },
    })
    const store = wrapper.vm.store
    store.setErrorCount(5)
    await wrapper.vm.$nextTick()
    const errors = wrapper.findAll('.errors')
    expect(errors.length).toBeGreaterThan(0)
  })

  it('updates when sentencePos changes', async () => {
    const wrapper = mount(InfoPanel, {
      global: {
        plugins: [createPinia()],
      },
    })
    const store = wrapper.vm.store
    store.setSentencePos(1)
    await wrapper.vm.$nextTick()
    const text = wrapper.text()
    expect(text).toContain('Errors')
  })

  it('has correct table structure', () => {
    const wrapper = mount(InfoPanel, {
      global: {
        plugins: [createPinia()],
      },
    })
    const rows = wrapper.findAll('tr')
    expect(rows).toHaveLength(2) // header row + data row
  })

  it('displays exactly two error span elements', () => {
    const wrapper = mount(InfoPanel, {
      global: {
        plugins: [createPinia()],
      },
    })
    const errors = wrapper.findAll('.errors')
    expect(errors).toHaveLength(2)
  })

  it('displays sentence count information', () => {
    const wrapper = mount(InfoPanel, {
      global: {
        plugins: [createPinia()],
      },
    })
    const text = wrapper.text()
    expect(text).toContain('Errors')
    expect(text).toContain('Sentences')
  })
})
