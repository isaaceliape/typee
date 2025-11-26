import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import InfoPanel from '@/components/InfoPanel.vue'
import { useAppStore } from '@/store/app'

describe('InfoPanel.vue', () => {
  let wrapper: any
  let store: any

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    store = useAppStore()
    
    wrapper = mount(InfoPanel, {
      global: {
        plugins: [pinia],
      },
    })
  })

  describe('Component Rendering', () => {
    it('should render the component with correct root class', () => {
      expect(wrapper.find('.InfoPanel').exists()).toBe(true)
    })

    it('should render a table element', () => {
      expect(wrapper.find('table').exists()).toBe(true)
    })

    it('should render table headers', () => {
      const headers = wrapper.findAll('th')
      expect(headers.length).toBeGreaterThan(0)
    })

    it('should render table body rows', () => {
      const tbody = wrapper.find('tbody')
      expect(tbody.exists()).toBe(true)
    })
  })

  describe('Table Structure', () => {
    it('should have correct table structure with header and data rows', () => {
      const rows = wrapper.findAll('tr')
      expect(rows).toHaveLength(2) // 1 header row + 1 data row
    })

    it('should have thead with two columns', () => {
      const headers = wrapper.findAll('th')
      expect(headers.length).toBe(2)
    })

    it('should have tbody with one data row', () => {
      const bodyRows = wrapper.findAll('tbody tr')
      expect(bodyRows).toHaveLength(1)
    })

    it('should have correct number of cells in data row', () => {
      const cells = wrapper.findAll('tbody td')
      expect(cells).toHaveLength(2)
    })
  })

  describe('Headers Display', () => {
    it('should display "Errors" header', () => {
      const headers = wrapper.findAll('th')
      const headerTexts = headers.map((h: any) => h.text())
      expect(headerTexts).toContain('Errors')
    })

    it('should display "Sentences" header', () => {
      const headers = wrapper.findAll('th')
      const headerTexts = headers.map((h: any) => h.text())
      expect(headerTexts).toContain('Sentences')
    })

    it('should display both headers in correct order', () => {
      const headers = wrapper.findAll('th')
      expect(headers[0].text()).toBe('Errors')
      expect(headers[1].text()).toBe('Sentences')
    })
  })

  describe('Statistics Data Rendering', () => {
    it('should display exactly two error span elements', () => {
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans).toHaveLength(2)
    })

    it('should display error count in first span', () => {
      const errorSpans = wrapper.findAll('.errors')
      const errorCountSpan = errorSpans[0]
      expect(errorCountSpan.text()).toBe('0') // default errorCount
    })

    it('should display sentence position and total count in second span', () => {
      const errorSpans = wrapper.findAll('.errors')
      const sentenceSpan = errorSpans[1]
      expect(sentenceSpan.text()).toMatch(/\d+ of \d+/)
    })

    it('should format sentence display as "position of total"', () => {
      const errorSpans = wrapper.findAll('.errors')
      const sentenceSpan = errorSpans[1]
      const text = sentenceSpan.text()
      expect(text).toMatch(/^\d+ of \d+$/)
    })

    it('should display error count with zero initially', () => {
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[0].text()).toBe(String(store.errorCount))
    })

    it('should display sentence count from store', () => {
      const errorSpans = wrapper.findAll('.errors')
      const sentenceText = errorSpans[1].text()
      expect(sentenceText).toContain(String(store.getSentencesCount))
    })
  })

  describe('Store Integration - Error Count', () => {
    it('should update when errorCount is set to 5', async () => {
      store.setErrorCount(5)
      await wrapper.vm.$nextTick()
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[0].text()).toBe('5')
    })

    it('should update when errorCount is increased', async () => {
      store.increaseErrorCount()
      await wrapper.vm.$nextTick()
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[0].text()).toBe('1')
    })

    it('should handle large error counts', async () => {
      store.setErrorCount(999)
      await wrapper.vm.$nextTick()
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[0].text()).toBe('999')
    })

    it('should display zero errors correctly', async () => {
      store.setErrorCount(0)
      await wrapper.vm.$nextTick()
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[0].text()).toBe('0')
    })

    it('should reflect multiple error count changes', async () => {
      const errorSpans = wrapper.findAll('.errors')
      
      store.setErrorCount(2)
      await wrapper.vm.$nextTick()
      expect(errorSpans[0].text()).toBe('2')
      
      store.setErrorCount(10)
      await wrapper.vm.$nextTick()
      expect(errorSpans[0].text()).toBe('10')
    })
  })

  describe('Store Integration - Sentence Position', () => {
    it('should update when sentencePos is changed to 1', async () => {
      store.setSentencePos(1)
      await wrapper.vm.$nextTick()
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[1].text()).toContain('2 of')
    })

    it('should display sentence position as 1-indexed (position + 1)', async () => {
      store.setSentencePos(0)
      await wrapper.vm.$nextTick()
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[1].text()).toContain('1 of')
    })

    it('should update sentence display when position changes', async () => {
      store.setSentencePos(0)
      await wrapper.vm.$nextTick()
      let errorSpans = wrapper.findAll('.errors')
      const text1 = errorSpans[1].text()

      store.setSentencePos(5)
      await wrapper.vm.$nextTick()
      errorSpans = wrapper.findAll('.errors')
      const text2 = errorSpans[1].text()

      expect(text1).not.toBe(text2)
    })

    it('should reflect position in sentence display', async () => {
      store.setSentencePos(3)
      await wrapper.vm.$nextTick()
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[1].text()).toContain('4 of')
    })
  })

  describe('Store Integration - Sentences Count', () => {
    it('should update sentence count when sentences are set', async () => {
      store.setSentences(['sentence 1', 'sentence 2', 'sentence 3'])
      await wrapper.vm.$nextTick()
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[1].text()).toContain('of 3')
    })

    it('should display correct total sentences', async () => {
      const testSentences = ['a', 'b', 'c', 'd', 'e']
      store.setSentences(testSentences)
      await wrapper.vm.$nextTick()
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[1].text()).toContain('of 5')
    })

    it('should handle zero sentences', async () => {
      store.setSentences([])
      await wrapper.vm.$nextTick()
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[1].text()).toContain('of 0')
    })

    it('should display single sentence correctly', async () => {
      store.setSentences(['only one'])
      await wrapper.vm.$nextTick()
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[1].text()).toContain('of 1')
    })
  })

  describe('Dynamic Updates', () => {
    it('should handle combined error count and sentence position updates', async () => {
      store.setErrorCount(5)
      store.setSentencePos(2)
      store.setSentences(['s1', 's2', 's3'])
      await wrapper.vm.$nextTick()
      
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[0].text()).toBe('5')
      expect(errorSpans[1].text()).toBe('3 of 3')
    })

    it('should update all data when store is reset', async () => {
      store.setErrorCount(10)
      store.setSentencePos(5)
      store.setSentences(['s1', 's2', 's3'])
      await wrapper.vm.$nextTick()

      store.setErrorCount(0)
      store.setSentencePos(0)
      store.setSentences([])
      await wrapper.vm.$nextTick()

      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[0].text()).toBe('0')
      expect(errorSpans[1].text()).toBe('1 of 0')
    })
  })

  describe('Cell Formatting', () => {
    it('should have correct CSS classes on error spans', () => {
      const errorSpans = wrapper.findAll('.errors')
      errorSpans.forEach((span: any) => {
        expect(span.classes()).toContain('errors')
      })
    })

    it('should render spans within table cells', () => {
      const cells = wrapper.findAll('tbody td')
      const spans = wrapper.findAll('.errors')
      expect(spans.length).toBeGreaterThan(0)
      expect(cells.length).toBe(spans.length)
    })

    it('should display error count span in first cell', () => {
      const cells = wrapper.findAll('tbody td')
      const span = cells[0].find('.errors')
      expect(span.exists()).toBe(true)
    })

    it('should display sentence span in second cell', () => {
      const cells = wrapper.findAll('tbody td')
      const span = cells[1].find('.errors')
      expect(span.exists()).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('should handle very large error counts', async () => {
      store.setErrorCount(1000000)
      await wrapper.vm.$nextTick()
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[0].text()).toBe('1000000')
    })

    it('should handle many sentences', async () => {
      const manySentences = Array(100).fill('sentence')
      store.setSentences(manySentences)
      await wrapper.vm.$nextTick()
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[1].text()).toContain('of 100')
    })

    it('should maintain correct display with extreme sentence position', async () => {
      store.setSentences(Array(10).fill('s'))
      store.setSentencePos(9)
      await wrapper.vm.$nextTick()
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[1].text()).toBe('10 of 10')
    })

    it('should handle rapid store updates', async () => {
      for (let i = 0; i < 5; i++) {
        store.setErrorCount(i)
        store.setSentencePos(i)
        await wrapper.vm.$nextTick()
      }
      
      const errorSpans = wrapper.findAll('.errors')
      expect(errorSpans[0].text()).toBe('4')
    })
  })

  describe('Accessibility and Content', () => {
    it('should display all required information', () => {
      const text = wrapper.text()
      expect(text).toContain('Errors')
      expect(text).toContain('Sentences')
      expect(text).toMatch(/\d+/) // error count
      expect(text).toMatch(/\d+ of \d+/) // sentence format
    })

    it('should have meaningful text content in cells', () => {
      const cells = wrapper.findAll('tbody td')
      cells.forEach((cell: any) => {
        expect(cell.text()).toBeTruthy()
      })
    })
  })
})
