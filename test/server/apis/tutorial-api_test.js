require(TEST_HELPER) // <--- This must be at the top of every test file.

var request = require('supertest')
var Tutorial = require(__server + '/models/tutorial.js');

describe("The Tutorial API", function() {
  var app = null;
  beforeEach(function(done){
    app = TestHelper.createApp();
    TestHelper.emptyDatabase().then(function(){
      done();
    });
  })
  
  it_("return all tutorials on /api/tutorials", function * () {
    yield Tutorial.insert({title : "A tutorial"});
    yield request(app)
      .get('/api/tutorials')
      .expect(200)
      .expect(function(response) {
        expect(response.body[0]).to.include({title : "A tutorial"});
      })
  })
  it_("creates a new tutorial", function * () {
    yield request(app)
      .post('/api/tutorials')
      .send({title : "A tutorial"})
      .expect(200)
      .expect(function(response) {
        expect(response.body).to.include({title : "A tutorial"});
      })
  })
  it_("returns a single tutorial on /api/tutorials/:id", function * () {
    yield Tutorial.insert({title : "A tutorial", _id : '1000'});
    yield request(app)
      .get('/api/tutorials/1000')
      .expect(200)
      .expect(function(response) {
        expect(response.body).to.include({title : "A tutorial"});
      })
  })
  it_("updates a single tutorial on put /api/tutorials/:id", function * () {
    var newContent = {
      title : "Other",
    };
    yield Tutorial.insert({oldContent : "foo", title : "A tutorial", _id : '1000'});
    yield request(app)
      .put('/api/tutorials/1000')
      .send(newContent)
      .expect(200)
      .expect(function(response, error) {
        expect(response.body).to.include({title : "Other", oldContent : "foo"});
      })
  })



})




