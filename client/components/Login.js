var m              = require('mithril');
var User = require('../models/users.js');
var Login = module.exports;
var mainLayout = require('../layouts/main.js');

Login.controller = function () {
	var ctrl = this;
	ctrl.signIn = function() {
		User.signIn().then(function(response){
			m.route("/read");
		});
	}
}

Login.view = function (ctrl, options) {
	var attributes = {
		onclick : function() {
			ctrl.signIn();
		}
	};
	var view = m('div', [
			m('button.btn.btn-primary.btn-lrg', attributes, "Sign in with Github")
	]);
	return mainLayout(view);
}
