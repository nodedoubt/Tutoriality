var m              = require('mithril');
var User = require('../models/users.js');
var Login = module.exports;
// var mainLayout = require('../layouts/main.js');

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
	var view = m('.signin-splash', [
    m('.container', [
      m('.col-sm-12 .col-md-4 .col-md-offset-4', [
        m('.login', [
          m('h1', "Tutoriality"),
          m('p', "Please login to read and create your own tutorials."),
		      m('button.btn.btn-primary.btn-lrg', attributes, "Sign in with Github")
        ])
      ])
    ])
	]);
	return view;
}
