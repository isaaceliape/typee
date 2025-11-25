import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToggleButton from '@/components/ToggleButton.vue'

describe('ToggleButton.vue', () => {
  it('renders component', () => {
    const wrapper = mount(ToggleButton)
    expect(wrapper.find('.ToggleButton').exists()).toBe(true)
  })

  it('renders with active class when prop is true', () => {
    const wrapper = mount(ToggleButton, {
      props: {
        active: true,
      },
    })
    expect(wrapper.find('.ToggleButton').classes()).toContain('active')
  })

  it('does not have active class when prop is false', () => {
    const wrapper = mount(ToggleButton, {
      props: {
        active: false,
      },
    })
    expect(wrapper.find('.ToggleButton').classes()).not.toContain('active')
  })

  it('has active class by default', () => {
    const wrapper = mount(ToggleButton)
    expect(wrapper.find('.ToggleButton').classes()).not.toContain('active')
  })

  it('renders the knob element', () => {
    const wrapper = mount(ToggleButton)
    expect(wrapper.find('.knob').exists()).toBe(true)
  })

  it('emits on-click-toggle-button event when clicked', async () => {
    const wrapper = mount(ToggleButton)
    await wrapper.find('.ToggleButton').trigger('click')
    expect(wrapper.emitted('on-click-toggle-button')).toBeTruthy()
    expect(wrapper.emitted('on-click-toggle-button')).toHaveLength(1)
  })

  it('emits event multiple times on multiple clicks', async () => {
    const wrapper = mount(ToggleButton)
    await wrapper.find('.ToggleButton').trigger('click')
    await wrapper.find('.ToggleButton').trigger('click')
    expect(wrapper.emitted('on-click-toggle-button')).toHaveLength(2)
  })

  it('updates active class when prop changes', async () => {
    const wrapper = mount(ToggleButton, {
      props: {
        active: false,
      },
    })
    expect(wrapper.find('.ToggleButton').classes()).not.toContain('active')

    await wrapper.setProps({ active: true })
    expect(wrapper.find('.ToggleButton').classes()).toContain('active')

    await wrapper.setProps({ active: false })
    expect(wrapper.find('.ToggleButton').classes()).not.toContain('active')
  })
})
