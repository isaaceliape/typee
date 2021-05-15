import { pascalCase } from "pascal-case"
import { computed } from 'vue'

const mutationFactory = (properties) => properties
    .map((property) => ({
      [`set${pascalCase(property)}`](state, payload){
        state[property] = payload
      }
    }))
    .reduce((x, y) => ({ ...x, ...y }))

export const mapAppState = (items, store) => {
  return items.reduce((accumulator, currentValue) => ({ ...accumulator, ...{
    [currentValue]: computed(() => store.state[currentValue])
  }}), {})
}

export const mapAppGetters = (items, store) => {
  return items.reduce((accumulator, currentValue) => ({ ...accumulator, ...{
    [currentValue]: computed(() => store.getters[currentValue])
  }}), {})
}

export const mapAppMutations = (items, store) => {
  return items.reduce((accumulator, currentValue) => ({ ...accumulator, ...{
    [currentValue]: () => store.commit(currentValue)
  }}), {})
}

export function updateSelectedFont(value) {
  document.querySelector('#selectedFontStyle')?.remove()
  const newStyle = document.createElement('style')
  const fontStyle = document.createTextNode(`* { font-family: ${value} }`)
  newStyle.appendChild(fontStyle)
  newStyle.setAttribute('id', 'selectedFontStyle')
  document.head.appendChild(newStyle)
}

export default mutationFactory