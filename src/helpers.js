
function updateSelectedFont(value) {
  document.querySelector('#selectedFontStyle')?.remove();
  const newStyle = document.createElement('style');
  const fontStyle = document.createTextNode(`* { font-family: ${value} }`);
  newStyle.appendChild(fontStyle);
  newStyle.setAttribute('id', 'selectedFontStyle')
  document.head.appendChild(newStyle);
}

export default { updateSelectedFont };