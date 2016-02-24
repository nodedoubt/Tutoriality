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
      console.log(tutorial)
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
        m('img', { src: "#", width: '100', height: '200' }),
        m('h2', 'Lucy Fer'),
        m('hr'),
        m('h2', 'My Tutorials'),
        //render my tutorials
        ctrl.tutorials.map(function(tutorial) {
          return m('div.panel.panel-default', [
            m('div.panel-heading', [
              m('h3.panel-title.list-link', {onclick: function(e){
                // grab tutorial id and pass to read using variadic route
                m.route('/read/' + tutorial.id)
              }}, tutorial.title)
            ])
          ],
          m('div.panel-body', tutorial.content.children[0]));
        })
      ])
  ]);
  return mainLayout(view);
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
