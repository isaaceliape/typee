import { pascalCase } from "pascal-case"
import { computed, type ComputedRef } from 'vue'
import type { Store } from 'vuex'

const mutationFactory = (properties: string[]) => properties
    .map((property: string) => ({
      [`set${pascalCase(property)}`](state: any, payload: any) {
        state[property] = payload
      }
    }))
    .reduce((x, y) => ({ ...x, ...y }))

export const mapAppState = (items: string[], store: Store<any>) => {
  return items.reduce((accumulator: Record<string, ComputedRef<any>>, currentValue: string) => ({ ...accumulator, ...{
    [currentValue]: computed(() => store.state[currentValue])
  }}), {})
}

export const mapAppGetters = (items: string[], store: Store<any>) => {
  return items.reduce((accumulator: Record<string, ComputedRef<any>>, currentValue: string) => ({ ...accumulator, ...{
    [currentValue]: computed(() => store.getters[currentValue])
  }}), {})
}

export const mapAppMutations = (items: string[], store: Store<any>) => {
  return items.reduce((accumulator: Record<string, (_payload?: any) => void>, currentValue: string) => ({ ...accumulator, ...{
    [currentValue]: (_payload?: any) => store.commit(currentValue, _payload)
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