/**
 * Pinia Store Utilities
 * 
 * This file contains helper functions and factories for creating
 * consistent and reusable store patterns in Pinia.
 */

import { ref, computed } from 'vue'

/**
 * Factory function for creating setter actions
 * Standardizes the pattern for simple state setters
 * 
 * @example
 * const setErrorCount = createSetter(errorCount)
 */
export function createSetter<T>(_stateRef: { value: T }) {
  return (payload: T) => {
    _stateRef.value = payload
  }
}

/**
 * Factory function for creating toggle actions
 * Standardizes the pattern for boolean state toggles
 * 
 * @example
 * const toggleMenuOpen = createToggle(menuOpen)
 */
export function createToggle(_stateRef: { value: boolean }) {
  return () => {
    _stateRef.value = !_stateRef.value
  }
}

/**
 * Factory function for creating increment/decrement operators
 * Standardizes the pattern for numeric state changes
 * 
 * @example
 * const increaseFontSize = createIncrement(fontSize, 2)
 * const decreaseFontSize = createDecrement(fontSize, 2)
 */
export function createIncrement(_stateRef: { value: number }, amount = 1) {
  return () => {
    _stateRef.value += amount
  }
}

export function createDecrement(_stateRef: { value: number }, amount = 1) {
  return () => {
    _stateRef.value -= amount
  }
}

/**
 * Factory function for creating array add actions
 * Standardizes the pattern for adding items to array state
 * 
 * @example
 * const addSentence = createArrayAdd(sentences)
 */
export function createArrayAdd<T>(_arrayRef: { value: T[] }) {
  return (item: T) => {
    _arrayRef.value.push(item)
  }
}

/**
 * Factory function for creating array remove actions
 * Standardizes the pattern for removing items from array state
 * 
 * @example
 * const removeSentence = createArrayRemove(sentences)
 */
export function createArrayRemove<T>(_arrayRef: { value: T[] }) {
  return (index: number) => {
    if (index >= 0 && index < _arrayRef.value.length) {
      _arrayRef.value.splice(index, 1)
    }
  }
}

/**
 * Factory function for creating array replace actions
 * Standardizes the pattern for replacing array state
 * 
 * @example
 * const setSentences = createArrayReplace(sentences)
 */
export function createArrayReplace<T>(_arrayRef: { value: T[] }) {
  return (items: T[]) => {
    _arrayRef.value = [...items]
  }
}

/**
 * Factory function for creating computed count getters
 * Standardizes the pattern for array length getters
 * 
 * @example
 * const getSentencesCount = createCountGetter(sentences)
 */
export function createCountGetter<T>(_arrayRef: { value: T[] }) {
  return computed(() => _arrayRef.value.length)
}

/**
 * Factory function for creating computed aggregate getters
 * Standardizes the pattern for computed derived values
 * 
 * @example
 * const getErrorRate = createComputedGetter(() => {
 *   return (store.errorCount / store.totalAttempts) * 100
 * })
 */
export function createComputedGetter<T>(_computeFn: () => T) {
  return computed(_computeFn)
}

/**
 * Factory function for creating localStorage persisted state
 * Provides consistent pattern for client-side persistence
 * 
 * @example
 * const darkMode = createPersistedBoolean('darkMode', false)
 */
export function createPersistedBoolean(key: string, defaultValue: boolean) {
  const stored = localStorage.getItem(key)
  const initialValue = stored !== null ? JSON.parse(stored) : defaultValue
  const state = ref(initialValue)

  const setter = (value: boolean) => {
    state.value = value
    localStorage.setItem(key, JSON.stringify(value))
  }

  const toggle = () => {
    setter(!state.value)
  }

  return {
    value: state,
    set: setter,
    toggle,
  }
}

/**
 * Factory function for creating localStorage persisted string state
 * 
 * @example
 * const selectedFont = createPersistedString('selectedFont', 'Ubuntu')
 */
export function createPersistedString(key: string, defaultValue: string) {
  const stored = localStorage.getItem(key)
  const initialValue = stored ?? defaultValue
  const state = ref(initialValue)

  const setter = (value: string) => {
    state.value = value
    localStorage.setItem(key, value)
  }

  return {
    value: state,
    set: setter,
  }
}

/**
 * Factory function for creating localStorage persisted JSON state
 * 
 * @example
 * const settings = createPersistedJSON('settings', { theme: 'light' })
 */
export function createPersistedJSON<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key)
  const initialValue = stored ? JSON.parse(stored) : defaultValue
  const state = ref<T>(initialValue)

  const setter = (value: T) => {
    state.value = value
    localStorage.setItem(key, JSON.stringify(value))
  }

  return {
    value: state,
    set: setter,
  }
}

/**
 * Helper function for validating numeric values
 * Used in actions that modify numeric state with constraints
 * 
 * @example
 * const setFontSize = (size: number) => {
 *   if (validateRange(size, 12, 72)) {
 *     fontSize.value = size
 *   }
 * }
 */
export function validateRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Helper function for validating string values
 * Used in actions that modify string state with constraints
 * 
 * @example
 * if (validateString(value, 'non-empty')) {
 *   state.value = value
 * }
 */
export function validateString(value: string, type: 'non-empty' | 'non-blank' = 'non-empty'): boolean {
  if (type === 'non-empty') {
    return value.length > 0
  }
  if (type === 'non-blank') {
    return value.trim().length > 0
  }
  return false
}

/**
 * Helper function for logging store actions (debugging aid)
 * Enable/disable for development
 * 
 * @example
 * logAction('setErrorCount', { value: 5 })
 */
export function logAction(actionName: string, payload?: unknown) {
  if (import.meta.env.DEV) {
    console.log(`[Store Action] ${actionName}`, payload)
  }
}

/**
 * Helper function for logging store state changes (debugging aid)
 * 
 * @example
 * logStateChange('errorCount', 0, 1)
 */
export function logStateChange(propertyName: string, oldValue: unknown, newValue: unknown) {
  if (import.meta.env.DEV) {
    console.log(`[Store State] ${propertyName}: ${oldValue} → ${newValue}`)
  }
}

/**
 * Helper for initial state object creation
 * Useful for resetting store to initial state
 * 
 * @example
 * const initialState = createInitialState({
 *   errorCount: 0,
 *   menuOpen: false
 * })
 */
export function createInitialState<T extends Record<string, unknown>>(state: T): T {
  return { ...state }
}

/**
 * Helper for merging partial state updates
 * Useful for complex state updates
 * 
 * @example
 * const updated = mergeState(currentState, { errorCount: 5 })
 */
export function mergeState<T extends Record<string, unknown>>(current: T, updates: Partial<T>): T {
  return { ...current, ...updates }
}
