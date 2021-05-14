import { pascalCase } from "pascal-case";

const mutationFactory = (properties) => properties
    .map((property) => ({
      [`set${pascalCase(property)}`](state, payload){
        state[property] = payload
      }
    }))
    .reduce((x, y) => ({ ...x, ...y }))

export function updateSelectedFont(value) {
  document.querySelector('#selectedFontStyle')?.remove()
  const newStyle = document.createElement('style')
  const fontStyle = document.createTextNode(`* { font-family: ${value} }`)
  newStyle.appendChild(fontStyle)
  newStyle.setAttribute('id', 'selectedFontStyle')
  document.head.appendChild(newStyle)
}

export default mutationFactory