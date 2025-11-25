import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BurgerMenu from '@/components/BurgerMenu.vue'

describe('BurgerMenu.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(BurgerMenu)
    expect(wrapper.find('.BuggerMenu').exists()).toBe(true)
  })

  it('renders three bars', () => {
    const wrapper = mount(BurgerMenu)
    const bars = wrapper.findAll('.bar')
    expect(bars).toHaveLength(3)
  })

  it('renders each bar as a div', () => {
    const wrapper = mount(BurgerMenu)
    const bars = wrapper.findAll('.bar')
    bars.forEach((bar) => {
      expect(bar.element.tagName).toBe('DIV')
    })
  })

  it('is clickable and can handle click events', async () => {
    const handleClick = vi.fn()
    const wrapper = mount(BurgerMenu, {
      attrs: {
        onClick: handleClick,
      },
    })
    await wrapper.find('.BuggerMenu').trigger('click')
    expect(handleClick).toHaveBeenCalled()
  })

  it('forwards event listeners to root element', async () => {
    const handleClick = vi.fn()
    const wrapper = mount(BurgerMenu)
    await wrapper.vm.$el.addEventListener('click', handleClick)
    await wrapper.find('.BuggerMenu').trigger('click')
    expect(handleClick).toHaveBeenCalled()
  })

  it('applies correct CSS class to root element', () => {
    const wrapper = mount(BurgerMenu)
    expect(wrapper.find('.BuggerMenu').classes()).toContain('BuggerMenu')
  })

  it('renders correctly with no props', () => {
    const wrapper = mount(BurgerMenu)
    expect(wrapper.vm.$el).toBeDefined()
    expect(wrapper.findAll('.bar')).toHaveLength(3)
  })

  it('maintains structure when mounted', () => {
    const wrapper = mount(BurgerMenu)
    const menuElement = wrapper.find('.BuggerMenu')
    const bars = wrapper.findAll('.bar')
    
    expect(menuElement.exists()).toBe(true)
    expect(bars.length).toBe(3)
    bars.forEach((bar) => {
      expect(bar.element.parentElement?.className).toContain('BuggerMenu')
    })
  })

  it('preserves bar count after re-render', () => {
    const wrapper = mount(BurgerMenu)
    expect(wrapper.findAll('.bar')).toHaveLength(3)
    
    // Force a re-render
    wrapper.vm.$forceUpdate()
    expect(wrapper.findAll('.bar')).toHaveLength(3)
  })
})
