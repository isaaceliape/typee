import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Keymap from '@/components/Keymap.vue'

describe('Keymap.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(Keymap)
    expect(wrapper.find('.Keymap').exists()).toBe(true)
  })

  it('renders 4 rows of keys', () => {
    const wrapper = mount(Keymap)
    const rows = wrapper.findAll('.row')
    expect(rows).toHaveLength(4)
  })

  it('renders first row with 10 keys', () => {
    const wrapper = mount(Keymap)
    const rows = wrapper.findAll('.row')
    const firstRowKeys = rows[0].findAll('.key')
    expect(firstRowKeys).toHaveLength(10)
  })

  it('renders second row with 10 keys', () => {
    const wrapper = mount(Keymap)
    const rows = wrapper.findAll('.row')
    const secondRowKeys = rows[1].findAll('.key')
    expect(secondRowKeys).toHaveLength(10)
  })

  it('renders third row with 7 keys', () => {
    const wrapper = mount(Keymap)
    const rows = wrapper.findAll('.row')
    const thirdRowKeys = rows[2].findAll('.key')
    expect(thirdRowKeys).toHaveLength(7)
  })

  it('renders fourth row with space key', () => {
    const wrapper = mount(Keymap)
    const rows = wrapper.findAll('.row')
    const fourthRowKeys = rows[3].findAll('.key')
    expect(fourthRowKeys).toHaveLength(1)
  })

  it('displays correct key text', () => {
    const wrapper = mount(Keymap)
    const keys = wrapper.findAll('.key')
    expect(keys[0].text()).toBe('Q')
    expect(keys[1].text()).toBe('W')
  })

  it('highlights active key', () => {
    const wrapper = mount(Keymap, {
      props: {
        selectedKey: 'Q',
      },
    })
    const qKey = wrapper.find('[data-key="Q"]')
    expect(qKey.classes()).toContain('active')
  })

  it('does not highlight other keys', () => {
    const wrapper = mount(Keymap, {
      props: {
        selectedKey: 'Q',
      },
    })
    const wKey = wrapper.find('[data-key="W"]')
    expect(wKey.classes()).not.toContain('active')
  })

  it('handles lowercase selected key', () => {
    const wrapper = mount(Keymap, {
      props: {
        selectedKey: 'q',
      },
    })
    const qKey = wrapper.find('[data-key="Q"]')
    expect(qKey.classes()).toContain('active')
  })

  it('applies correct CSS class to rows', () => {
    const wrapper = mount(Keymap)
    const rows = wrapper.findAll('.row')
    expect(rows[0].classes()).toContain('row-1')
    expect(rows[1].classes()).toContain('row-2')
    expect(rows[2].classes()).toContain('row-3')
    expect(rows[3].classes()).toContain('row-4')
  })

  it('sets data-key attribute on keys', () => {
    const wrapper = mount(Keymap)
    const qKey = wrapper.find('[data-key="Q"]')
    expect(qKey.attributes('data-key')).toBe('Q')
  })

  it('updates active key when prop changes', async () => {
    const wrapper = mount(Keymap, {
      props: {
        selectedKey: 'Q',
      },
    })
    let qKey = wrapper.find('[data-key="Q"]')
    expect(qKey.classes()).toContain('active')

    await wrapper.setProps({ selectedKey: 'W' })
    qKey = wrapper.find('[data-key="Q"]')
    const wKey = wrapper.find('[data-key="W"]')
    expect(qKey.classes()).not.toContain('active')
    expect(wKey.classes()).toContain('active')
  })

  it('renders space key with special styling', () => {
    const wrapper = mount(Keymap)
    const spaceKey = wrapper.find('[data-key=" "]')
    expect(spaceKey.exists()).toBe(true)
  })

  it('renders all expected keys', () => {
    const wrapper = mount(Keymap)
    const expectedKeys = [
      'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
      'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';',
      'Z', 'X', 'C', 'V', 'B', 'N', 'M',
      ' '
    ]
    
    expectedKeys.forEach(key => {
      const keyElement = wrapper.find(`[data-key="${key}"]`)
      expect(keyElement.exists()).toBe(true)
    })
  })

  it('has correct number of total keys', () => {
    const wrapper = mount(Keymap)
    const allKeys = wrapper.findAll('.key')
    expect(allKeys).toHaveLength(28) // 10 + 10 + 7 + 1
  })
})
