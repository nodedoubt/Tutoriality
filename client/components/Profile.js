var m              = require('mithril');
var _              = require('underscore');
var User = require('../models/users.js');
var Profile = module.exports;
var mainLayout = require('../layouts/main.js');
var Tutorial = require('../models/tutorials.js')

Profile.controller = function () {
  var ctrl = this;
  ctrl.tutorials = [];
  Tutorial.fetchAll().then(function(tutorials) {
    ctrl.tutorials = _.map(tutorials, function(tutorial) {
        return {
          id: tutorial._id,
          title: tutorial.title,
          content: m('.tutorial-content', tutorial.description)
        };
      });
  });
}


Profile.view = function (ctrl, options) {
  var attributes = {
    onclick : function() {
      ctrl.signIn();
    }
  };
  var view = m('.container', [
      m('.col-sm-12 .col-md-6  .offset-md-3',[
        m('img', { src: User.getPic(), width: '200', height: '200' }),
        m('h2', User.getName()),
        m('hr'),
        m('h2', 'My Tutorials'),
        //m('div', editBtn(options, ctrl.tutorial)),
        //render my tutorials
        ctrl.tutorials.map(function(tutorial) {
          return m('div.panel.panel-default', [
            m('div', editBtn(tutorial)),
            m('div', dltBtn(tutorial)),
            m('div.panel-heading', [
              m('h3.panel-title.list-link', {onclick: function(e){
                // grab tutorial id and pass to read using variadic route
                m.route('/read/' + tutorial.id)
              }}, tutorial.title)
            ])
          ],
          m('div.panel-body', tutorial.content.children[0]));
        }),
        m('hr'),
        m('h2', 'My Progress'),
      ])
  ]);
  return mainLayout(view);
}

  var editBtn = function(tutorial) {
    return m('button.btn', {onclick : function(){
      m.route('/edit/' + tutorial.id);
    }}, "Edit")
  }

    var dltBtn = function(tutorial) {
    return m('button.btn', {onclick : function(){
      m.route('/edit/' + tutorial.id);
    }}, "Delete")
  }


      // ctrl.tutorials.map(function(tutorial) {
      //   return m('div.panel.panel-default', [
      //     m('div.panel-heading', [
      //       m('h3.panel-title.list-link', {onclick: function(e){
      //         // grab tutorial id and pass to read using variadic route
      //         m.route('/read/' + tutorial.id)
      //       }}, tutorial.title)
      //     ])
      //   ],
      //   m('div.panel-body', tutorial.content.children[0]));
      // })
//do a successful DB call to get back tutorials
//map them into profile view
