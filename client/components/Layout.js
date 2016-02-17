var m       = require('mithril');
var nav     = require('./Nav');
var Layout  = module.exports;

Layout.controller = function () {
  var ctrl = this;
};

Layout.view = function (ctrl, options) {
    return m('div', [
      nav.view(),
      notificationSubView(),
      contentSubView()
    ]);
};

var notificationSubView = function() {
 return m('div.alert.alert-danger.alert-dismissible[role=alert]', [
   m('button.close[type=button, data-dismiss=alert, aria-label=Close]', [
     m('span[aria-hidden=true]', 'X')
   ]),
   m('strong', 'Error Encountered! ')
 ], 'Something went wrong!')
};

var contentSubView = function() {
  return m('div.content-area')
}
