var m = require('mithril')

exports.controller = function () {
	
}

exports.view = function (ctrl, options) {
  return m('.my-component', [
    m('h2', options.title)
  ])
}

var subViews = function(ctrl) {
	return m('')
}

