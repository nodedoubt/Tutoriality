var OAuth = require('oauthio');
// var credentials = require('./config.js').credentials.oauth;
OAuth.initialize("2dtinySKQP0jVXxfP5_O7dwZq_M", "Nx8zeUlnczRitqwuam9HhzxjV9U");
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