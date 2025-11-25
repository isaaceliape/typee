import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Letter from '@/components/Letter.vue'

describe('Letter.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(Letter)
    expect(wrapper.find('.Letter').exists()).toBe(true)
  })

  it('displays the text prop correctly', () => {
    const wrapper = mount(Letter, {
      props: {
        text: 'A',
      },
    })
    expect(wrapper.text()).toContain('A')
  })

  it('displays empty string by default', () => {
    const wrapper = mount(Letter)
    expect(wrapper.text()).toBe('')
  })

  it('renders with provided CSS classes', () => {
    const wrapper = mount(Letter, {
      props: {
        text: 'A',
        classes: ['success', 'active'],
      },
    })
    const letterEl = wrapper.find('.Letter')
    expect(letterEl.classes()).toContain('success')
    expect(letterEl.classes()).toContain('active')
  })

  it('renders without classes when not provided', () => {
    const wrapper = mount(Letter, {
      props: {
        text: 'A',
      },
    })
    const letterEl = wrapper.find('.Letter')
    expect(letterEl.classes().length).toBe(1) // Only 'Letter' class
  })

  it('renders with error class', () => {
    const wrapper = mount(Letter, {
      props: {
        text: 'A',
        classes: ['error'],
      },
    })
    expect(wrapper.find('.Letter').classes()).toContain('error')
  })

  it('renders with space class', () => {
    const wrapper = mount(Letter, {
      props: {
        text: '␣',
        classes: ['space'],
      },
    })
    expect(wrapper.find('.Letter').classes()).toContain('space')
  })

  it('renders wbr element when text is space character', () => {
    const wrapper = mount(Letter, {
      props: {
        text: '␣',
      },
    })
    expect(wrapper.find('wbr').exists()).toBe(true)
  })

  it('does not render wbr when text is not space character', () => {
    const wrapper = mount(Letter, {
      props: {
        text: 'A',
      },
    })
    expect(wrapper.find('wbr').exists()).toBe(false)
  })

  it('updates classes when prop changes', async () => {
    const wrapper = mount(Letter, {
      props: {
        text: 'A',
        classes: ['success'],
      },
    })
    expect(wrapper.find('.Letter').classes()).toContain('success')

    await wrapper.setProps({ classes: ['error'] })
    expect(wrapper.find('.Letter').classes()).toContain('error')
    expect(wrapper.find('.Letter').classes()).not.toContain('success')
  })

  it('updates text when prop changes', async () => {
    const wrapper = mount(Letter, {
      props: {
        text: 'A',
      },
    })
    expect(wrapper.text()).toContain('A')

    await wrapper.setProps({ text: 'B' })
    expect(wrapper.text()).toContain('B')
  })

  it('renders multiple classes correctly', () => {
    const wrapper = mount(Letter, {
      props: {
        text: 'X',
        classes: ['success', 'space', 'active'],
      },
    })
    const letterEl = wrapper.find('.Letter')
    expect(letterEl.classes()).toContain('success')
    expect(letterEl.classes()).toContain('space')
    expect(letterEl.classes()).toContain('active')
  })
})
