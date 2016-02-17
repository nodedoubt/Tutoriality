var m = require('mithril');

var Tutorial = module.exports;

Tutorial.fetchAll = function() {
	return m.request({method : 'GET', url : '/api/tutorials'});
}
