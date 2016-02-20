var m              = require('mithril');
var Accordion = require('./Accordion.js');
var ExampleList = module.exports;
var Tutorial = require('../models/tutorials');
var mainLayout = require('../layouts/main');
var _ = require('underscore');

ExampleList.controller = function () {
  	var ctrl = this;
  	ctrl.tutorials = [];
	Tutorial.fetchAll().then(function(tutorials){
		ctrl.tutorials = _.map(tutorials, function(tutorial){
			return {
				title : tutorial.title,
				content : m('.test-content', tutorial.description),
			};
		});
	});
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
	var view = Accordion.view(ctrl, options);
	return mainLayout(view);
}
