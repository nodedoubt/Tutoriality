var m     = require('mithril');
var Nav   = module.exports;

Nav.controller = function () {
  var ctrl = this;
};

Nav.view = function (ctrl, options) {
  return m('nav.navbar.navbar-default', [
    m('div.container-fluid', [
      m('div.navbar-header', [
        m('a.navbar-brand[href="/"]', {config: m.route}, 'Tutoriality')
      ]),
      m('ul.nav.nav-pills.navbar-right', [
        m('li[role=presentation].active', [
          m('a[href="/create"]', {config: m.route}, 'Create')
        ]),
        m('li[role=presentation].active', [
          m('a[href="/"]', {config: m.route}, 'Sign Out')
        ])
      ])
    ]),
  ]);
};
