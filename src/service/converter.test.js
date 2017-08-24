import chai from 'chai'
import { hex2rgb, rgb2hex } from './converter.js'
import { tests } from '../test-data/colors'

chai.config.includeStack = true
chai.should()

describe('Color Converter rgb2hex', () => {
  describe('Convert from RGB to HEX', () => {
    tests.forEach((test) => {
      it(`rgb2hex(${JSON.stringify(test.rgbValue)} should equal ${JSON.stringify(test.hexValue)})`, () => {
        rgb2hex(test.rgbValue).should.deep.equal(test.hexValue)
      })
    })
  })

  describe('Convert from HEX to RGB', () => {
    tests.forEach((test) => {
      it(`hex2rgb(${JSON.stringify(test.hexValue)} should equal ${JSON.stringify(test.rgbValue)})`, () => {
        hex2rgb(test.hexValue).should.deep.equal(test.rgbValue)
      })
    })
  })
})
