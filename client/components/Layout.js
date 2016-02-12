var m              = require('mithril')
var Layout = module.exports;

Layout.controller = function () {
  var ctrl = this;


}

Layout.view = function (ctrl, options) {
  return m('.Layout', [
    m('h2', 'hello layout')
  ])
}

var subViews = function(ctrl) {
  return m('')
}
