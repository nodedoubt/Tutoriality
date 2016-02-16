var pmongo = require('promised-mongo');
var dbName = process.env.NODE_ENV === 'test' ? 'test' : 'local';
var db = pmongo(dbName);
db.deleteEverything = function () {
  return Promise.all([
    db.collection('tutorials').remove(),
  ])
}

module.exports = db;



