import { describe, it, expect } from 'vitest'
import mutationFactory from '../helpers'

describe('helpers.ts', () => {
  describe('mutationFactory', () => {
    it('should create mutation functions for given properties', () => {
      const mutations = mutationFactory(['testProp', 'anotherProp'])
      
      expect(mutations).toBeDefined()
      expect(mutations['setTestProp']).toBeDefined()
      expect(mutations['setAnotherProp']).toBeDefined()
    })

    it('should create mutations that set state properties', () => {
      const mutations = mutationFactory(['count'])
      const state = { count: 0 }
      
      mutations['setCount'](state, 42)
      
      expect(state.count).toBe(42)
    })

    it('should handle multiple properties', () => {
      const mutations = mutationFactory(['a', 'b', 'c'])
      const state = { a: 1, b: 2, c: 3 }
      
      mutations['setA'](state, 10)
      mutations['setB'](state, 20)
      mutations['setC'](state, 30)
      
      expect(state.a).toBe(10)
      expect(state.b).toBe(20)
      expect(state.c).toBe(30)
    })

    it('should handle property names with different cases', () => {
      const mutations = mutationFactory(['menuOpen', 'selectedFont'])
      const state = { menuOpen: false, selectedFont: 'Arial' }
      
      mutations['setMenuOpen'](state, true)
      mutations['setSelectedFont'](state, 'Courier')
      
      expect(state.menuOpen).toBe(true)
      expect(state.selectedFont).toBe('Courier')
    })
  })
})
