var OAuth = require('oauthio');
OAuth.initialize(process.env.OAUTHIO_PUBLIC_KEY);
OAuth.confirmLogin = function(request, response, next) {
	OAuth.auth('github', request.session).then(function(){
		next();
	}).catch(function(){
		response.redirect('/api/sign-in');
	});
}
module.exports = OAuth;

