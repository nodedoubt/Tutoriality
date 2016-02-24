var m = require('mithril');
var User = require('../models/users');
var Notification = require('../models/notifications');
module.exports = function(body) {
	console.log(body);
	return m('.main', [
		navSubView(),
		Notification.isShown() ? notificationSubView() : null,
		body,
	]);
}

// var container = function(){
// 	return m('.container',[
// 		m('h1', "You guys rock and are amazing!!")
// 		]);
// }

var notificationSubView = function() {
 	var attr = {
 		role : 'alert',
 	};
	return m('div.alert.alert-danger.alert-dismissible', attr, [
		closeButton(),
		m('strong', 'Error Encountered! ')
	], Notification.getMessage());
};

var closeButton = function() {
	var attr = {
		"data-dismiss" : 'alert',
		'aria-label':'Close',
	};
	return m('button.close[type=button]', attr, [
		m('span', {"aria-hidden" : "true"}, 'x')
	]);
}



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
