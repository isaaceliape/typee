import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { updateSelectedFont } from '../helpers'

describe('helpers.ts', () => {
  describe('updateSelectedFont', () => {
    let styleElement: HTMLElement | null

    beforeEach(() => {
      // Clean up any existing style elements before each test
      styleElement = document.querySelector('#selectedFontStyle')
      if (styleElement) {
        styleElement.remove()
      }
    })

    afterEach(() => {
      // Clean up style element after each test
      styleElement = document.querySelector('#selectedFontStyle')
      if (styleElement) {
        styleElement.remove()
      }
    })

    it('should create a style element with the selected font', () => {
      updateSelectedFont("'Ubuntu Mono', monospace")
      
      const style = document.querySelector('#selectedFontStyle')
      expect(style).toBeDefined()
      expect(style?.textContent).toContain("font-family: 'Ubuntu Mono', monospace")
    })

    it('should remove previous font style when updating', () => {
      updateSelectedFont("'Arial', sans-serif")
      let styles = document.querySelectorAll('#selectedFontStyle')
      expect(styles.length).toBe(1)
      
      updateSelectedFont("'Courier', monospace")
      styles = document.querySelectorAll('#selectedFontStyle')
      expect(styles.length).toBe(1)
      expect(document.querySelector('#selectedFontStyle')?.textContent).toContain('Courier')
    })

    it('should append the style to document head', () => {
      updateSelectedFont("'Georgia', serif")
      
      const style = document.querySelector('head #selectedFontStyle')
      expect(style).toBeDefined()
    })
  })
})
