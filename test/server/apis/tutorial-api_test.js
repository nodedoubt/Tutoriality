require(TEST_HELPER) // <--- This must be at the top of every test file.

var request = require('supertest')

describe("The Tutorial API", function() {
  var app = TestHelper.createApp();
  app.testReady();

  it("returns all tutorials on get '/api/tutorials'", function * () {

    //yied Tutorial.insert() * 2

    // Notice how we're in a generator function (indicated by the the *)
    // See test/test-helper.js for details of why this works.
    //
    yield request(app)
      .get('/api/tutorials')
      .expect(200)
      .expect(function(response) {
        // expect the right structure of data to come out
      })
  })
})
