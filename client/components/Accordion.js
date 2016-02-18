var m              = require('mithril')

// Make sure that bootstrap has access to jquery
// this is weird but it's needed for us to not have to use bower
window.$ = window.jQuery = require('jquery');

// load bootstrap so the accordion will work
require('../lib/bootstrap.min.js');
var Accordion = module.exports;
var _ = require('underscore');
 
Accordion.controller = function () {
  var ctrl = this;
}

Accordion.view = function (ctrl, options) {
	
	// Just for readability, split out all attributes into their own object
	var attributes = {
		id : options.id,
		role : "tablist",
		// dictates whether multiple tabs can be open at once
		"aria-multiselectable" : "true"
	};

	// the top level of an accordion is all of the sections together
	return m('.panel-group', attributes, sections(options.sections, options.id));
}

function sections(sections, id) {
	// iterate over all of the sections and return a sub view
	return _.map(sections, function(section, index){
		// get the index of the current section in the sections array
		// so we can use it to populate the ids that
		// bootstrap requires to open and close a section correctly
		return panel(section, index, id);
	});
}

// A heading and body grouped together
// Note how each subdivision in bootstrap is split out
// into its own view function
function panel(section, index, id) {
	return m('.panel.panel-default', [
		panelHeading(section, index, id),
		panelBody(section, index),
	]);
}

function getSectionID(index) {
	return 'collapse-' + index;
}

function getHeadingID(index) {
	return 'heading-' + index;
}

function panelBody(section, index) {
	var attributes = {
		// this id connects a given heading, with the section
		// that it will hide and show
		// generate an id based on the index
		// so that its unique
		id : getSectionID(index),
		role : "tabpanel",

		// this is another way of connecting the heading
		// to the section body, not sure why you need both
		"aria-labelledby" : getHeadingID(index),
	};

	// this is the actual content that will be hidden or
	// shown inside of the accordion
	return m('.panel-collapse.collapse', attributes, [
		m('.panel-body', [
			section.content,
		])
	]);
}

function panelHeading(section, index, id) {
	var attributes = {
		role : "tab",
		id : getHeadingID(index),
	};
	return m('.panel-heading', attributes, [
		panelTitle(section, index, id),
	]);
}

function panelTitle(section, index, id) {
	var sectionID = getSectionID(index);
	var attributes = {
		role : "button", 
		"data-toggle" : "collapse", 
		"data-parent" : "#" + id,
		href : "#" + sectionID,
		//  this dictates whether or not accordions
		// will be open by default
		"aria-expanded" : "false",
		"aria-controls" : sectionID,
	};
	return m('h4.panel-title', [
		m('a', attributes, section.title)
	])
}
