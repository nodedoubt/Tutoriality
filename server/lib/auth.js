var OAuth = require('oauthio');
var credentials = require('./config.js').credentials.oauth;
OAuth.initialize(credentials.key, credentials.secret);
OAuth.confirmLogin = function(request, response, next) {
	OAuth.auth('github', request.session).then(function(){
		next();
	}).catch(function(){
		response.redirect('/api/sign-in');
	});
}
module.exports = OAuth;

