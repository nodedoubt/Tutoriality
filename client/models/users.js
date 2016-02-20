var m = require('mithril');

var OAuth = require('../lib/oauth.min.js').OAuth;
var OAuthUser = require('../lib/oauth.min.js').User;

OAuth.initialize('t2PEPMuehspsbZXlrrx9Xr2SWMg');

var User = module.exports;

User.signIn = function() {
	return OAuth.popup('github').then(function(res){
		return OAuthUser.signin(res);
	}).fail(function(error){
		console.log(error);
	})
}

User.isLoggedIn = function() {
	return OAuthUser.isLogged();
};

User.signOut = function() {
	var user = OAuthUser.getIdentity();
	if(!user) {
		return Promise.resolve(null);
	} else {
		return OAuthUser.getIdentity().logout();
	}
}

User.confirmLoggedIn = function() {
	if(!User.isLoggedIn()) {
		m.route('/sign-in');
	}
}