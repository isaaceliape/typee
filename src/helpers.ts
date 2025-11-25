import { pascalCase } from "pascal-case"
import { computed, type ComputedRef } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mutationFactory = (properties: string[]): Record<string, (state: Record<string, unknown>, payload: unknown) => void> => properties
    .map((property: string) => ({
      [`set${pascalCase(property)}`](state: Record<string, unknown>, payload: unknown) {
        state[property] = payload
      }
    }))
    .reduce((x, y) => ({ ...x, ...y }), {})

export const mapAppState = (items: string[], store: { state: Record<string, unknown> }): Record<string, ComputedRef<unknown>> => {
  return items.reduce((accumulator: Record<string, ComputedRef<unknown>>, currentValue: string) => ({ ...accumulator, ...{
    [currentValue]: computed(() => store.state[currentValue])
  }}), {})
}

export const mapAppGetters = (items: string[], store: { getters: Record<string, unknown> }): Record<string, ComputedRef<unknown>> => {
  return items.reduce((accumulator: Record<string, ComputedRef<unknown>>, currentValue: string) => ({ ...accumulator, ...{
    [currentValue]: computed(() => store.getters[currentValue])
  }}), {})
}

export const mapAppMutations = (items: string[], store: { commit: (mutation: string, payload?: unknown) => void }): Record<string, (payload?: unknown) => void> => {
  return items.reduce((accumulator: Record<string, (payload?: unknown) => void>, currentValue: string) => ({ ...accumulator, ...{
    [currentValue]: (payload?: unknown) => store.commit(currentValue, payload)
  }}), {})
}

export function updateSelectedFont(value: string): void {
  document.querySelector('#selectedFontStyle')?.remove()
  const newStyle = document.createElement('style')
  const fontStyle = document.createTextNode(`* { font-family: ${value} }`)
  newStyle.appendChild(fontStyle)
  newStyle.setAttribute('id', 'selectedFontStyle')
  document.head.appendChild(newStyle)
}

export default mutationFactory