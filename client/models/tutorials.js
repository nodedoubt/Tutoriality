var m = require('mithril');
var _ = require('underscore');

var Tutorial = module.exports;

Tutorial.fetchAll = function() {
	return m.request({method : 'GET', url : '/api/tutorials'});
}

Tutorial.fetchByID = function(id) {
	return m.request({method : 'GET', url : '/api/tutorials/' + id});
}

Tutorial.create = function(tutorial) {
	return m.request({method : 'POST', url : '/api/tutorials', data : tutorial});
}

Tutorial.updateByID = function(id, tutorial) {
  return m.request({method : 'PUT', url : '/api/tutorials/' + id, data : tutorial});
}

Tutorial.tutorialVM = function () {
  return {
    title: '',
    description: '',
    steps: [ Tutorial.stepVM() ]
  }
}

Tutorial.stepVM = function () {
  return {
    title: '',
    content: ''
  }
}
