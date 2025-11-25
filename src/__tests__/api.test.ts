import { describe, it, expect, vi, afterEach } from 'vitest'
import theverge from '../api'

describe('api.ts', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('theverge', () => {
    it('should be a function', () => {
      expect(typeof theverge).toBe('function')
    })

    it('should handle fetch errors gracefully', async () => {
      const context = {
        articleTitle: '',
        article: '',
        sanitizeText: vi.fn(),
      }

      // Mock fetch to reject
      global.fetch = vi.fn(() => Promise.reject(new Error('Network error')))
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

      await theverge.call(context)

      expect(consoleError).toHaveBeenCalled()
      expect(context.sanitizeText).not.toHaveBeenCalled()

      consoleError.mockRestore()
    })
  })
})
