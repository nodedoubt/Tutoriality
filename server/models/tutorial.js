var db = require('../lib/db.js')
var user = require('./user');
var Tutorial = {};
module.exports = Tutorial;

var collection = function() {
	return db.collection('tutorials')
}

var ucollection = function() {
  return db.collection('users')
}

Tutorial.insert = function(tutorial) {
  tutorial.created_by = db.getMongoID(tutorial.created_by)
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
Tutorial.delete = function(id) {
	console.log("this is id", id);
}
