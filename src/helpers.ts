import { pascalCase } from "pascal-case"
import { computed, type ComputedRef } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * Creates state update functions that modify state properties.
 * Automatically generates setters for the provided property names.
 * 
 * @deprecated This is a legacy helper from the Vuex migration. Prefer Pinia stores.
 * @param properties - Array of property names to create mutations for
 * @returns Object containing setter functions for each property in PascalCase
 * 
 * @example
 * const mutations = mutationFactory(['count', 'name'])
 * // Creates setCount(state, payload) and setName(state, payload)
 */
const mutationFactory = (properties: string[]): Record<string, (state: Record<string, unknown>, payload: unknown) => void> => properties
    .map((property: string) => ({
      [`set${pascalCase(property)}`](state: Record<string, unknown>, payload: unknown) {
        state[property] = payload
      }
    }))
    .reduce((x, y) => ({ ...x, ...y }), {})

/**
 * Maps store state properties to component computed properties.
 * Provides reactive access to store state in components.
 * 
 * @param items - Array of state property names to map
 * @param store - The store instance
 * @returns Object with computed property accessors for each state item
 * 
 * @example
 * const stateMap = mapAppState(['count', 'users'], store)
 * // Provides reactive computed properties for store.state.count and store.state.users
 */
export const mapAppState = (items: string[], store: { state: Record<string, unknown> }): Record<string, ComputedRef<unknown>> => {
  return items.reduce((accumulator: Record<string, ComputedRef<unknown>>, currentValue: string) => ({ ...accumulator, ...{
    [currentValue]: computed(() => store.state[currentValue])
  }}), {})
}

/**
 * Maps store getters to component computed properties.
 * Provides reactive access to store getters in components.
 * 
 * @param items - Array of getter names to map
 * @param store - The Vuex store instance
 * @returns Object with computed property accessors for each getter
 * 
 * @example
 * const gettersMap = mapAppGetters(['getSentencesCount'], store)
 * // Provides reactive computed property for store.getters.getSentencesCount
 */
export const mapAppGetters = (items: string[], store: { getters: Record<string, unknown> }): Record<string, ComputedRef<unknown>> => {
  return items.reduce((accumulator: Record<string, ComputedRef<unknown>>, currentValue: string) => ({ ...accumulator, ...{
    [currentValue]: computed(() => store.getters[currentValue])
  }}), {})
}

/**
 * Maps store mutations to component methods.
 * Provides convenient methods to commit mutations to the store.
 * 
 * @param items - Array of mutation names to map
 * @param store - The Vuex store instance with commit method
 * @returns Object with methods that commit the corresponding mutations
 * 
 * @example
 * const mutationsMap = mapAppMutations(['setCount', 'setName'], store)
 * // Provides methods mutationsMap.setCount(payload) and mutationsMap.setName(payload)
 */
export const mapAppMutations = (items: string[], store: { commit: (mutation: string, payload?: unknown) => void }): Record<string, (payload?: unknown) => void> => {
  return items.reduce((accumulator: Record<string, (payload?: unknown) => void>, currentValue: string) => ({ ...accumulator, ...{
    [currentValue]: (payload?: unknown) => store.commit(currentValue, payload)
  }}), {})
}

/**
 * Updates the selected font style for the entire document.
 * Dynamically creates and injects a style tag to apply the font family.
 * Removes any previously set font style.
 * 
 * @param value - CSS font family value to apply (e.g., "'Ubuntu Mono', monospace")
 * 
 * @example
 * updateSelectedFont("'Roboto Mono', monospace")
 * // All text on the page will use Roboto Mono font
 */
export function updateSelectedFont(value: string): void {
  document.querySelector('#selectedFontStyle')?.remove()
  const newStyle = document.createElement('style')
  const fontStyle = document.createTextNode(`* { font-family: ${value} }`)
  newStyle.appendChild(fontStyle)
  newStyle.setAttribute('id', 'selectedFontStyle')
  document.head.appendChild(newStyle)
}

export default mutationFactory