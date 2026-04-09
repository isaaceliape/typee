import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('renders app component', () => {
    const wrapper = mount(App, {
      global: {
        stubs: ['AppMenu', 'TextRenderer']
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('#app').exists()).toBe(true)
  })

  it('includes AppMenu and TextRenderer components', () => {
    const wrapper = mount(App, {
      global: {
        stubs: ['AppMenu', 'TextRenderer']
      }
    })
    expect(wrapper.findComponent({ name: 'AppMenu' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'TextRenderer' }).exists()).toBe(true)
  })
})
