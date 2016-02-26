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

  ctrl.comments = [{name: 'fuckyou', comment: 'civil discourse on the internet is important', created: 'July 12th, 2015'},
  {name: 'ice cube', comment: 'chickity check yo self before you wreck yoself', created: 'July 12th, 2016'}];

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
                  ctrl.toggleFavorite(ctrl.tutorial);
                }}, [ m('i', {class:ctrl.faved ? 'fa fa-star' : 'fa fa-star-o'}, " Favorite") ]),
                m('h2.tutorial-title', ctrl.tutorial.title),
                m('img.created-by-pic', {src: User.getPic()}),
                m('h5.created-by', "Created by " + ctrl.tutorial.created_by),
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
        ]),
        m('.comments',{style: {border: "1px solid red"}},[
          ctrl.comments.map(function(comment){
            return m('.singleComment',[
              m('img.created-by-pic',{src: '#', width: '75', height: '75'}),
              m('p', comment.name),
              m('p', comment.comment),
              m('p', comment.created)
             ])
          }),
          //this is the add a comment logic
          m('img.created-by-pic', { src: User.getPic(), width: '75', height: '75' }),
          m('p', User.getName()),
            m('fieldset', [
                m('form', { type: 'text' }, [
                  m('br'),
                  m('textarea.form-control', {
                    type: 'text',
                    placeholder: 'Write a comment',
                    style: 'width: 75%;',
                    onchange: function(e) { e.preventDefault();
                      //console.log(this.value);
                      ctrl.comments.push({name:'Tina Yothers', comment:this.value, created: Date.now()});
                    }
                  }),
                ]),
                // m("button.btn.btn-success.btn-lrg[type='button']", {
                //   onclick: function(e) { e.preventDefault(); console.log('iam hte comments'); }
                // }, "Reply")
            ]),
                m("button.btn.btn-success.btn-lrg[type='button']", {
                  onclick: function(e) {console.log('iam hte comments'); e.preventDefault();}
                }, "Reply")
        ]),
    ]);
    return mainLayout(view);
};

var editBtn = function(options, tutorial) {
  return m('button.btn', {onclick : function(){
    m.route('/edit/' + tutorial._id);
  }}, "Edit");
}
