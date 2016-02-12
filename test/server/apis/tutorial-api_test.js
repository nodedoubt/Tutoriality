require(TEST_HELPER) // <--- This must be at the top of every test file.

var request = require('supertest')
var routes = require(__server + '/index.js');

describe("The Tutorial API", function() {
  var app = TestHelper.createApp();
   app.use('/', routes);
  app.testReady();

  it_("other all tutorials on get '/api/tutorials'", function * () {
    // Notice how we're in a generator function (indicated by the the *)
    // See test/test-helper.js for details of why this works.
    yield request(app)
      .get('/api/tutorials')
      .expect(200)
      .expect(function(response) {
        expect(response.body[0]).to.include({title : "A tutorial"});
      })
  })
})


