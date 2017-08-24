export function rgb2hex (rgb) {
  const {red, green, blue} = rgb
  return {'hex': [red, green, blue].map(x => x.toString(16).length === 1 ? '0' + x.toString(16) : x.toString(16)).join('')}
}

export function hex2rgb (hex) {
  const rgb = hex.hex.match(/.{2}/g).map(x => parseInt(x, 16))
  return {'red': rgb[0], 'green': rgb[1], 'blue': rgb[2]}
}
