var m              = require('mithril');
var Read           = module.exports;
var mainLayout     = require('../layouts/main');
var User           = require('../models/users');
var _              = require('underscore');
var Tutorial       = require('../models/tutorials');


Read.controller = function () {
  var ctrl = this;
  console.log('error',ctrl.error)

  ctrl.id = m.route.param('id');
  console.log('id',ctrl.id)
  User.confirmLoggedIn();

  ctrl.tutorial = null;;
  ctrl.listSteps = null

  Tutorial.fetchByID(ctrl.id).then(function(tutorial) {
     ctrl.tutorial = tutorial
  })
};

Read.view = function (ctrl, options) {
    var id = 0;
    var view =  m('.read', [
                  m('legend', [
                  m('h2', ctrl.tutorial.title),
                  m('br'),
                  m('p', ctrl.tutorial.description),
                  m('.auth-edit', [
                  //edit  to creator of tutorial 
                  User.isLoggedIn() ? [
                    m('div', editBtn(options))
                  ] : null,
               ])
             ]),
        m('.content-steps', [
            ctrl.tutorial.steps.map(function(list) {
              console.log('content steps', list)
                id++
                 return m('.panel-group', { 'aria-multiselectable': 'true', id: 'accordion', role: 'tablist' }, [
                          m('.panel.panel-default', [
                            m('.panel-heading', { id: 'heading' + id, role: 'tab' }, [
                              m('h4.panel-title', [
                                m('a', { 'aria-controls': 'collapse' + id, 'aria-expanded': 'false', 'data-parent': '#accordion', 'data-toggle': 'collapse', href: '#collapse' + id, role: 'button' }, [
                                  m('h3', list.title)
                               ])
                             ])
                           ]),
                        m('.panel-collapse.collapse', { 'aria-labelledby': 'heading' + id, id: 'collapse' + id, role: 'tabpanel' }, [
                          m('.panel-body', [
                            m('p', list.content)
                          ])
                        ])
                      ])
               ])
            })
        ])
    ]);
    return mainLayout(view);
};

var editBtn = function(options) {
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
                        
                        // console.log(document.getElementsByClassName("content-read"))
                        m('textarea', { rows:'3', type:'text', style: 'width:75%; height:175px', value: document.getElementsByClassName(".read").value }) //trying to create edit
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
