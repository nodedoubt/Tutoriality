var db = require('../lib/db.js')
var User = {};
module.exports = User;

var collection = function() {
  return db.collection('users')
}

User.findAndModify = function(user) {
  var githubUsername = user.alias;
  return collection().findAndModify({
    query: { alias: githubUsername },
    update: user, 
    upsert: true,
    new: true
  })  
}

User.find = function(query) {
  var query = query || {};
  // the id can be undefined
  return collection().find(query);
}

User.findByID = function(id) {
  return collection().findOne({_id : db.getMongoID(id)});
}

User.update = function(query, updateFields) {
  return collection().update(query, {$set : updateFields});
}

User.updateByID = function(id, updateFields) {
  return User.update({_id : db.getMongoID(id)}, updateFields);
}