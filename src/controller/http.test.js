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

import chai from 'chai'
import chaiHttp from 'chai-http'
import config from './http.config.json'
import { tests } from '../test-data/colors'

chai.config.includeStack = true
chai.should()
chai.use(chaiHttp)

describe('Color Converter rgb2hex REST API', () => {
  const url = process.env.npm_config_rgb2hex_test_url || `http://localhost:${config.port}`
  console.log('Test URL: ' + url)

  describe('RGB to Hex conversion', () => {
    tests.forEach((test) => {
      it(`rgb2hex(${JSON.stringify(test.rgbValue)} should equal ${JSON.stringify(test.hexValue)})`, (done) => {
        chai.request(url)
          .get('/rgb2hex')
          .query(test.rgbValue)
          .then(res => {
            res.status.should.equal(200)
            res.body.should.deep.equal(test.hexValue)
            done()
          })
      })
    })
  })

  describe('Hex to RGB conversion', () => {
    tests.forEach((test) => {
      it(`hex2rgb(${JSON.stringify(test.hexValue)} should equal ${JSON.stringify(test.rgbValue)})`, (done) => {
        chai.request(url)
          .get('/hex2rgb')
          .query(test.hexValue)
          .then(res => {
            res.status.should.equal(200)
            res.body.should.deep.equal(test.rgbValue)
            done()
          })
      })
    })
  })
})
