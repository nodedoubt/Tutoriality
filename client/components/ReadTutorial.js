var m              = require('mithril');
var Read           = module.exports;
var mainLayout     = require('../layouts/main');
var User           = require('../models/users');
var _              = require('underscore');
var Tutorial       = require('../models/tutorials');


Read.controller = function () {
  var ctrl = this;

  // id is passed in from TutorialList
  // use this for fetchByID(ctrl.id)
  ctrl.id = m.route.param('id');

  // User.confirmLoggedIn();

  // ctrl.tutorials = Tutorial.fetchByID(ctrl.id);
  ctrl.tutorials = Tutorial.soFetch[ctrl.id];

  ctrl.listSteps = _.map(Tutorial.soFetch[ctrl.id].steps, function(list) {
      return list;
  })
  console.log('map steps', ctrl.listSteps)
};


var id = 0;
Read.view = function (ctrl, options) {
    var view =  m('.read', [
        m('.title-read', [
            m('legend', [
                m('h2', ctrl.tutorials.title),
                m('br'),
                m('p', ctrl.tutorials.description),
                m('div', editBtn())
           ])
        ]),
        m('.content-steps', [
            ctrl.listSteps.map(function(list) {
                id++
                 return m('.panel-group', { 'aria-multiselectable': 'true', id: 'accordion', role: 'tablist' }, [
                          m('.panel.panel-default', [
                            m('.panel-heading', { id: 'heading' + id, role: 'tab' }, [
                              m('h4.panel-title', [
                                m('a', { 'aria-controls': 'collapse' + id, 'aria-expanded': 'false', 'data-parent': '#accordion', 'data-toggle': 'collapse', href: '#collapse' + id, role: 'button' }, [
                                  m('h3', list.Title)
                               ])
                             ])
                           ]),
                        m('.panel-collapse.collapse', { 'aria-labelledby': 'heading' + id, id: 'collapse' + id, role: 'tabpanel' }, [
                          m('.panel-body', [
                            m('p', list.Description)
                          ])
                        ])
                      ])
               ])
            })
        ])
    ]);
    return mainLayout(view);
};

var editBtn = function(ctrl) {
  console.log('cccc',Tutorial.soFetch[m.route.param('id')])
    return m('div.btn', [
        m('button.btn.btn-primary.btn-md', { 'data-target': '#myModal', 'data-toggle': 'modal', type: 'button' }, [
            m('div.edit', 'Edit')
         ]),
        m('.modal.fade', { 'aria-labelledby': 'myModalLabel', id: 'myModal', role: 'dialog', tabcounter: '-1' },  [
            m('.modal-dialog', { role: 'document' }, [
                m('.modal-content', [
                    m('.modal-header', [
                        m('button.close', { 'aria-label': 'Close', 'data-dismiss': 'modal', type: 'button' }, [
                            m('span', { 'aria-hidden': true }, 'x')]),
                        m('h4.modal-title', { id: 'myModalLabel' }, "Edit Tutorial")
                    ]),
                    m('.modal-body', [
                        // m('div', editForm())
                        // console.log(document.getElementsByClassName("content-read"))
                        m('textarea', { rows:'3', type:'text', style: 'width:75%; height:175px', value: _.values( Tutorial.soFetch[m.route.param('id')] ) }) //trying to create edit
                    ]),
                    m('.modal-footer', [
                        m('button.btn.btn-default', { 'data-dismiss': 'modal', type: 'button' }, "Close"),
                        m('button.btn.btn-primary', { type: 'button' }, "Save Changes")
                    ])
                ])
            ])
         ])
    ])
}
