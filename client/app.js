var m = require('mithril')

//
// Global variable for global state (e.g. currentUser)
//
window.App = {}

//
// Client-side routing
//

//sets the type of route to hash. e.i. localhost:4000/#/create
m.route.mode = "hash"
// m.route.mode = 'pathname'

//defines all of the various routes
m.route(document.getElementById('app'), '/', {
  '/'   : require('./components/TutorialList'),
  '/list'   : require('./components/TutorialList'),
  '/edit/:id' : require('./components/CreateTutorial'),
  '/create' : require('./components/CreateTutorial'),
  '/read/:id'   : require('./components/ReadTutorial'),
  '/example-list' : require('./components/ExampleList'),
  '/sign-in' : require('./components/Login'),
  '/profile' : require('./components/Profile'),
})
