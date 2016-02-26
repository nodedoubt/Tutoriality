var m              = require('mithril');
var Read           = module.exports;
var mainLayout     = require('../layouts/main');
var User           = require('../models/users');
var _              = require('underscore');
var Tutorial       = require('../models/tutorials');
var MarkDownText   = require('../components/MarkDownText');


Read.controller = function () {
  var ctrl = this;
  var userId = User.getID();


  ctrl.id = m.route.param('id');
  User.confirmLoggedIn();

  ctrl.tutorial = null;
  ctrl.listSteps = null;


  Tutorial.fetchByID(ctrl.id).then(function(tutorial) {
     ctrl.tutorial = tutorial
     if(ctrl.tutorial.favorites.indexOf(userId.toString()) === -1){
       ctrl.faved = false;
     } else {
       ctrl.faved = true;
     }
  })

  ctrl.toggleFavorite = function(tutorial){
    if(ctrl.tutorial.favorites.indexOf(userId.toString()) === -1){
      ctrl.tutorial.favorites.push(userId);
      ctrl.faved = true;
    } else {
      console.log("in the slice")
      ctrl.tutorial.favorites = ctrl.tutorial.favorites.slice(ctrl.tutorial.favorites.indexOf(userId), 0);
      ctrl.faved = false;
    }
    delete tutorial['_id'];
    console.log(tutorial);
    Tutorial.updateByID(ctrl.id, ctrl.tutorial).then(function(tutorial) {
       console.log("FAV TOGGLED!!!");
    })
  }
};

Read.view = function (ctrl, options) {
    var view =  m('.content-read', [
                m('.tutorial-header.clearfix', [
                m('a[href=/#/].pull-right', { onclick: function(e){
                  e.preventDefault();
                  ctrl.toggleFavorite(ctrl.tutorial)
                }}, [ m('i', {class:ctrl.faved ? 'fa fa-star' : 'fa fa-star-o'}, " Favorite") ]),
                m('h2.tutorial-title', ctrl.tutorial.title),
                m('img.created-by-pic', {src: User.getPic()}),
                m('h5.created-by', "Created by " + User.getName()),
                m('.auth-edit', [
                User.confirmLoggedIn() && User.isUserMatch(ctrl.tutorial.created_by) ? [
                  m('div', editBtn(options, ctrl.tutorial))
                ] : null,
             ])
        ]),
        m('.content-steps', [
          m('p.lead', ctrl.tutorial.description),
          ctrl.tutorial.steps.map(function(list, index) {
            index = index+1;
            return m('div', {'aria-multiselectable': 'true'}, [
              m('h3', list.title),
              m('.step-container', [
                m('p', m.component(MarkDownText, list.content))
              ])
            ])
          })
        ])
    ]);
    return mainLayout(view);
};

var editBtn = function(options, tutorial) {
  return m('button.btn', {onclick : function(){
    m.route('/edit/' + tutorial._id);
  }}, "Edit");
}
