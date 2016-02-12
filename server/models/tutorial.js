var db = require('../lib/db.js')
var Tutorial = {};
module.exports = Tutorial;

var collection = function() {
	return db.collection('tutorials')
}

Tutorial.insert = function(tutorial) {
	return Promise.resolve(['test']);
}