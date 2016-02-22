var db = require('../lib/db.js')
var Tutorial = {};
module.exports = Tutorial;

var collection = function() {
	return db.collection('tutorials')
}

Tutorial.insert = function(tutorial) {
	return collection().insert(tutorial);
}

Tutorial.find = function(query) {
	var query = query || {};
	// the id can be undefined
	return collection().find(query);
}

Tutorial.findByID = function(id) {
	return collection().findOne({_id : db.getMongoID(id)});
}

Tutorial.update = function(query, updateFields) {
	return collection().update(query, {$set : updateFields});
}

Tutorial.updateByID = function(id, updateFields) {
	return Tutorial.update({_id : db.getMongoID(id)}, updateFields);
}