import { createPinia, setActivePinia } from 'pinia'
import { vi } from 'vitest'

/**
 * Creates a fresh Pinia instance for testing
 */
export function createTestingPinia() {
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}

/**
 * Mock localStorage for testing
 */
export function setupLocalStorageMock() {
  const store: Record<string, string> = {}

  const mockLocalStorage = {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString()
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(key => delete store[key])
    }),
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
    length: 0,
  }

  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  })

  return mockLocalStorage
}

/**
 * Clean up after tests
 */
export function cleanupAfterTest() {
  vi.clearAllMocks()
  localStorage.clear()
}
