var m              = require('mithril');
var Nav = module.exports;

Nav.controller = function () {
  var ctrl = this;


};

Nav.view = function (ctrl, options) {
  return m("div.navbar", [

    m("ul.nav", [
      m('h2', "hello nav"),

      m("li",  m("a[href='/']", {config: m.route}, "Home")),
      m("li",  m("a[href='/create']", {config: m.route}, "Create")),
      m("li",  m("a[href='/']", {config: m.route}, "Sign Out"))

    ])

  ]);
};

var subViews = function(ctrl) {
  return m('');
};
