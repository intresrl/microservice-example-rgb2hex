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

import express from 'express'
import config from './http.config.json'
import { hex2rgb, rgb2hex } from '../service/converter.js'

const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', config.cors)
  res.header('Access-Control-Allow-Methods', 'GET')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/rgb2hex', function (req, res) {
  var red = parseInt(req.query.red, 10)
  var green = parseInt(req.query.green, 10)
  var blue = parseInt(req.query.blue, 10)

  res.send(rgb2hex({ 'red': red, 'green': green, 'blue': blue }))
})

app.get('/hex2rgb', function (req, res) {
  res.send(hex2rgb({ 'hex': req.query.hex }))
})

app.listen(config.port)
