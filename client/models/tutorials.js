var m = require('mithril');

var Tutorial = module.exports;

Tutorial.fetchAll = function() {
	return m.request({method : 'GET', url : '/api/tutorials'});
}

Tutorial.fetchByID = function(id) {
	return m.request({method : 'GET', url : '/api/tutorials' + id});
}
