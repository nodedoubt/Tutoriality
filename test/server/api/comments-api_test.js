require(TEST_HELPER) // <--- This must be at the top of every test file.

var request = require('supertest')
var routes = require(__server + '/index.js')

describe("The Tutorial API", function() {

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  it("Returns All Tutorials in JSON", function * () {
    yield request(app)
      .get('/api/tutorials')
      .expect(200)
  })
})
