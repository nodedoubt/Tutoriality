var m              = require('mithril');
var Read           = module.exports;
var mainLayout     = require('../layouts/main');
var User           = require('../models/users');
var _              = require('underscore');
var Tutorial       = require('../models/tutorials');
var MarkDownText   = require('../components/MarkDownText');


Read.controller = function () {
  var ctrl = this;

  ctrl.id = m.route.param('id');
  User.confirmLoggedIn();

  ctrl.tutorial = null;
  ctrl.listSteps = null;

  Tutorial.fetchByID(ctrl.id).then(function(tutorial) {
     ctrl.tutorial = tutorial
     console.log(ctrl.tutorial)
  })
};

Read.view = function (ctrl, options) {
    var view =  m('.content-read', [
                m('.tutorial-header', [
                m('h2', ctrl.tutorial.title),
                m('img.created-by-pic', {src: User.getPic()}),
                m('h5.created-by', "Created by " + User.getName()),
                m('p', ctrl.tutorial.description),
                m('.auth-edit', [
                User.confirmLoggedIn() && User.isUserMatch(ctrl.tutorial.created_by) ? [
                  m('div', editBtn(options, ctrl.tutorial))
                ] : null,
             ])
        ]),
        m('.content-steps', [
          ctrl.tutorial.steps.map(function(list, index) {
            index = index+1;
            return m('div', {'aria-multiselectable': 'true'}, [
              m('h3', list.title),
              m('.step-container', [
                m('p', m.component(MarkDownText, list.content))
              ])
            ])
          })
        ]),
        m('.comments',[
          m('img.commentAvatar', { src: User.getPic(), width: '75', height: '75' }),
          m('p', User.getName()),
        ]),
    ]);
    return mainLayout(view);
};

var editBtn = function(options, tutorial) {
  return m('button.btn', {onclick : function(){
    m.route('/edit/' + tutorial._id);
  }}, "Edit");
}
