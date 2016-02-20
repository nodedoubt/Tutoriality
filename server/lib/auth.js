var OAuth = require('oauthio');
var credentials = require('./lib/config.js').credentials.oauth;
OAuth.initialize(credentials.key, credentials.secret);