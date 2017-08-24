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

  res.send(rgb2hex({'red': red, 'green': green, 'blue': blue}))
})

app.get('/hex2rgb', function (req, res) {
  res.send(hex2rgb({'hex': req.query.hex}))
})

app.listen(config.port)
