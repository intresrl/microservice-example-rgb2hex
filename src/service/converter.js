/*
 * This color converter software is part of a micro-service architecture written for demonstration purposes.
 * Copyright (C)  2017  Gianni Bombelli @ Intré S.r.l.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

export function rgb2hex (rgb) {
  const {red, green, blue} = rgb
  return {'hex': [red, green, blue].map(x => x.toString(16).length === 1 ? '0' + x.toString(16) : x.toString(16)).join('')}
}

export function hex2rgb (hex) {
  const rgb = hex.hex.match(/.{2}/g).map(x => parseInt(x, 16))
  return {'red': rgb[0], 'green': rgb[1], 'blue': rgb[2]}
}
