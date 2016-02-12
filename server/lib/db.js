var pmongo = require('promised-mongo');
var dbName = process.env.NODE_ENV === 'test' ? 'test' : 'local';
var db = pmongo(dbName);
module.exports = db;



