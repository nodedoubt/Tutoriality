var m = require('mithril');
var User = require('../models/users');
module.exports = function(body) {
	return m('.main', [
		navSubView(),
		notificationSubView(),
		body,
	]);
}

var notificationSubView = function() {
 return m('div.alert.alert-danger.alert-dismissible[role=alert]', [
   m('button.close[type=button]', {'data-dismiss':'alert', 'aria-label':'Close'}, [
     m('span[aria-hidden=true]', 'x')
   ]),
   m('strong', 'Error Encountered! ')
 ], 'Something went wrong!')
};

var navSubView = function() {
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
					m('a[href="/"]', {onclick : function(event){
						event.preventDefault();
						User.signOut().then(function(){
							m.route('/sign-in');
						});
					}}, 'Sign Out')
				])
			])
		]),
	]);
}
