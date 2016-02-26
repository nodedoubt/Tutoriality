var m              = require('mithril');
var _              = require('underscore');
var Accordian      = require('./Accordion.js');
var Tutorial       = require('../models/tutorials.js')
var mainLayout     = require('../layouts/main');
var Read           = require('./ReadTutorial.js');
var User           = require('../models/users');
var List           = module.exports;


List.controller = function () {
  var ctrl = this;
  ctrl.tutorials = [];
  Tutorial.fetchAll().then(function(tutorials) {
    ctrl.tutorials = _.map(tutorials, function(tutorial) {
        return {
          id: tutorial._id,
          title: tutorial.title,
          content: m('.tutorial-content', tutorial.description),
          author: tutorial.author,
          pic: tutorial.pic
        };
      });
  });
};

List.view = function (ctrl, options) {
  var view = m('.listView', [

    m('div.page-header', [
      m('h1', 'Tutorials')
    ]),

    m('div.content-area', [
      ctrl.tutorials.map(function(tutorial) {
        console.log(tutorial);
        return m('div.panel.panel-default', [
          m('div.panel-heading', [
            m('a[href=#/read/' + tutorial.id + '].panel-title.list-link', tutorial.title),
            m('h5', "Created by " + tutorial.author),
          ])
        ],
        m('div.panel-body', tutorial.content.children[0])
        );
      })
    ])

  ]);

  return mainLayout(view);
};
