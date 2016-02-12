var m = require('mithril')

//
// Global variable for global state (e.g. currentUser)
//
window.App = {}

//
// Client-side routing
//
m.route.mode = "hash"
// m.route.mode = 'pathname'
m.route(document.getElementById('app'), '/', {
  '/'       : require('./components/Layout'),
  '/list'   : require('./components/TutorialList'),
  '/create' : require('./components/CreateTutorial'),
  '/read'   : require('./components/ReadTutorial')

})
