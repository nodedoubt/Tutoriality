var m              = require('mithril')
var Accordion = require('./Accordion.js');
var ExampleList = module.exports;
var Tutorial = require('../models/tutorials.js');


ExampleList.controller = function () {
  	var ctrl = this;
  	
  	// this is the data we're going to pass into the abstract accordion view
  	var sections = [
		{
			// The accordion title to click on
			title : "Test one",

			// the content that will be inside of the accordion
			content : m('.test-content', "This is some test content"),
		},
		{
			title : "Test two",
			content : m('.test-content', "This is some other content"),
		},
	];
	ctrl.tutorials = sections;

	// to demonstrate that updating works correctly
	// wait 3 seconds and then update content
	setTimeout(function(){
		ctrl.tutorials[0].title = "Updated title";
		ctrl.tutorials.push({
			title : "Test three",
			content : m('.new-stuff', "Updated new content"),
		});

		// trigger a redraw so the view updates
		m.redraw();
	}, 3000);

}


ExampleList.view = function (ctrl, options) {
	
	// Pass in a sections array with all of the sections for the accordion
	// the id is required by bootstrap, so we just create one here
	var options = {
		sections : ctrl.tutorials,
		id : "accordion",
	};

	// we need to do m.component here so that it's actually mounting the component
	// rather than just using a view
	return m.component(Accordion, options);
}
