var browserify = require('browserify-middleware')
var express = require('express')
var Path = require('path')

var routes = express.Router();

var session = require('express-session');
var uid = require('uid-safe');

//
// Provide a browserified file at a specified path
//
routes.get('/app-bundle.js', browserify('./client/app.js'));

var apiRoutes = express.Router();

apiRoutes.use('', require('./apis/tutorial-api'));
apiRoutes.use('', require('./apis/auth-api'));
routes.use('/api', apiRoutes);
//
// Static assets (html, etc.)
//
var assetFolder = Path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))


if (process.env.NODE_ENV !== 'test') {

  // Load all routes

  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  var app = express()

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() )

  app.use(session({
    genid: function(req) {
      return uid.sync(18) // use UUIDs for session IDs
    },
    secret: 'burger time',
  }))

  // Mount our main router
  app.use('/', routes);

  // Start the server!
  var port = process.env.PORT || 4000;
  app.listen(port)
  console.log("Listening on port", port)
}
else {

  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
