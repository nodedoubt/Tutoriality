require(TEST_HELPER) // <--- This must be at the top of every test file.

var MyComponent = require(__client + '/components/MyComponent');

describe("The MyComponent component", function() {
  it("does stuff'", function() {
  	var output = MyComponent.view(null, {title : "Test"});
  	//
  	
    //yied Tutorial.insert() * 2

    // Notice how we're in a generator function (indicated by the the *)
    // See test/test-helper.js for details of why this works.
    //
  })
})
