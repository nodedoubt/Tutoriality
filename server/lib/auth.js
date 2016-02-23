var OAuth = require('oauthio');
// var credentials = require('./config.js').credentials.oauth;
OAuth.initialize(process.env.OAUTH_PUBLIC_KEY, process.env.OAUTH_SECRET_KEY);
OAuth.confirmLogin = function(request, response, next) {
  var credentials = request.getCredentials();
  console.log('here are the creds', credentials)
  OAuth.auth('github', request.session).then(function(){
    next();
  }).catch(function(){
    response.redirect('/api/sign-in');
  });
}
module.exports = OAuth;