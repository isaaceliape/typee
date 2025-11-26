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