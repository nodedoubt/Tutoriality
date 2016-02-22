var m              = require('mithril');
var _              = require('underscore');
var Accordian      = require('./Accordion.js');
var Tutorial       = require('../models/tutorials.js')
var mainLayout     = require('../layouts/main');
var Read           = require('./ReadTutorial.js');
var List           = module.exports;


List.controller = function () {
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
};

List.view = function (ctrl, options) {
  var view = m('div.listView', [

    m('div.page-header', [
      m('h1', 'Tutorial List')
    ]),

    m('div.content-area', [
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
};
