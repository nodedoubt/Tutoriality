var db = require('../lib/db.js')
var user = require('./user');
var Tutorial = {};
module.exports = Tutorial;

var collection = function() {
	return db.collection('tutorials')
}

Tutorial.insert = function(tutorial) {
  tutorial.created_by = db.getMongoID(tutorial.created_by)
	return collection().insert(tutorial);
}

Tutorial.find = function(query) {
  console.log("the query in the server model", query)
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