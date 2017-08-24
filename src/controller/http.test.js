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
