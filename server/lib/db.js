var pmongo = require('promised-mongo');
var dbName = process.env.NODE_ENV === 'production' ? process.env.MONGOLAB_URI : 'tutoriality_dev';
var db = pmongo(dbName);
var _ = require('underscore');

db.deleteEverything = function () {
  return Promise.all([
    db.collection('tutorials').remove(),
  ])
}

db.loadFixtures = function() {
	// Get the fixture from a file, this just an object
	// where the key is the collection name and the
	// value is an array of records to be inserted
	var fixtures = require('./fixtures.js');
	_.each(fixtures, function(records, collectionName){
		db.collection(collectionName).find().then(function(items){
			// only insert if the collection is empty
			if(items.length === 0) {
				db.collection(collectionName).insert(records);
			}
		})
	});
}

db.getMongoID = function(idString) {
	return pmongo.ObjectId(idString);
}

db.loadFixtures();

module.exports = db;



