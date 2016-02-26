var m              = require('mithril');
var _              = require('underscore');
var User = require('../models/users.js');
var Profile = module.exports;
var mainLayout = require('../layouts/main.js');
var Tutorial = require('../models/tutorials.js')

Profile.controller = function () {
  var ctrl = this;
  ctrl.tutorials = [];
  console.log("the userid we're passing", User.getID().toString())
  Tutorial.fetchByUserID(User.getID()).then(function(tutorials) {
    console.log(tutorials)
    ctrl.tutorials = _.map(tutorials, function(tutorial) {
        return {
          id: tutorial._id,
          title: tutorial.title,
          content: m('.tutorial-content', tutorial.description)
        };
      });
  });
  ctrl.delete = function(dlt){
    Tutorial.delete(dlt).then(function(res){
      ctrl.tutorials.forEach(function(data, index){
        if(data.id === dlt){
          ctrl.tutorials.splice(index, 1);
        }
      });
    })
  }
}


Profile.view = function (ctrl, options) {
  var attributes = {
    onclick : function() {
      ctrl.signIn();
    }
  };
  var view = m('.profile', [
        m('img', { src: User.getPic(), width: '200', height: '200' }),
        m('h2', User.getName()),
        m('hr'),
        m('h2', 'My Tutorials'),
        //m('div', editBtn(options, ctrl.tutorial)),
        //render my tutorials
        ctrl.tutorials.map(function(tutorial) {
          return m('div.panel.panel-default', [
            m('div', editBtn(tutorial)),
            m('button.btn', {onclick: function(e){
              e.preventDefault();
              ctrl.delete(tutorial.id);
            }},'Delete me Baby'),
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
  return mainLayout(view);
}

  var editBtn = function(tutorial) {
    return m('button.btn', {onclick : function(){
      m.route('/edit/' + tutorial.id);
    }}, "Edit")
  }

  //onclick:  function(e) { e.preventDefault(); ctrl.tutorial.steps.push( Tutorial.stepVM() );}

  // var dltBtn = function(tutorial) {
  //   return m('button.btn', {onclick : function(e){
  //     e.preventDefault();
  //     ctrl.delete(tutorial.id);
  //   }}, "Delete")
  // }


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
