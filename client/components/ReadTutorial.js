var m = require('mithril');
var Nav = require('./Nav');
var Read = module.exports;

Read.controller = function () {
  var ctrl = this;

  };

Read.view = function (ctrl, options) {
    return m('.read', [
        Nav.view(),
        readTitle(),
        readSubView()
    ]);
};

var readTitle = function() {
    return m('legend', [
        m('h2', "Tutorial Title"),
        m('br'),
        m('p', 'Description of the tutorial'),
        m('div', editBtn())
    ]) //close div.title
}

var readSteps = function() {
  return m('div.steps', [
    m('.panel-group', { 'aria-multiselectable': 'true', id: 'accordion', role: 'tablist' }, [
        m('.panel.panel-default', [
            m('.panel-heading', { id: 'headingOne', role: 'tab' }, [
                m('h4.panel-title', [
                    m('a', { 'aria-controls': 'collapseOne', 'aria-expanded': 'false', 'data-parent': '#accordion', 'data-toggle': 'collapse', href: '#collapseOne', role: 'button' }, [
                        m('h3', 'Step #1')
                    ])
                  ])
                ]),
            m('.panel-collapse.collapse', { 'aria-labelledby': 'headingOne', id: 'collapseOne', role: 'tabpanel' }, [
                m('.panel-body', [
                    m('p', 'these are the steps')
                  ])
                ])
            ]), //close .panel.panel-default 'step - one'

        m(".panel.panel-default", [
            m('.panel-heading', { id:'headingTwo', role:'tab' }, [
                m("h4.panel-title", [
                    m("a.collapsed", { 'aria-controls':'collapseTwo', 'aria-expanded':'false', 'data-parent': '#accordion', 'data-toggle':'collapse', 'href':'#collapseTwo', role:'button' }, [
                        m('h3', 'Step #2')
                    ])
                  ])
                ]),
            m(".panel-collapse.collapse", { 'aria-labelledby':'headingTwo', id:'collapseTwo', role:'tabpanel' }, [
                    m(".panel-body", [
                        m('p', 'these are the steps')
                    ])
                  ])
            ]), //close .panel.panel-default 'step - two'

        m(".panel.panel-default", [
            m(".panel-heading", { id: 'headingThree', role:'tab' }, [
                m("h4.panel-title", [
                    m("a.collapsed", { 'aria-controls':'collapseThree', 'aria-expanded':'false', 'data-parent':'#accordion', 'data-toggle':'collapse', href:'#collapseThree', role:'button' }, [
                            m('h3', 'Step #3')
                        ])
                    ])
                ]),
                m(".panel-collapse.collapse", { 'aria-labelledby':'headingThree', id:'collapseThree', role:'tabpanel' }, [
                    m(".panel-body", [
                        m('p', 'these are the steps')
                    ])
                ])
            ])  //close .panel.panel-default 'step - three'
     ])
  ])
}

var editBtn = function() {
    return m('div.btn', [
        m('button.btn.btn-primary.btn-md', { 'data-target': '#myModal', 'data-toggle': 'modal', type: 'button' }, [
            m('div.edit', 'Edit')
         ]),
        m('.modal.fade', { 'aria-labelledby': 'myModalLabel', id: 'myModal', role: 'dialog', tabindex: '-1' },  [
            m('.modal-dialog', { role: 'document' }, [
                m('.modal-content', [
                    m('.modal-header', [
                        m('button.close', { 'aria-label': 'Close', 'data-dismiss': 'modal', type: 'button' }, [
                            m('span', { 'aria-hidden': true }, 'x')]),
                        m('h4.modal-title', { id: 'myModalLabel' }, "Edit Tutorial")
                    ]),
                    m('.modal-body', [
                        m('textarea', { rows:'3', type:'text', style: 'width:75%; height:175px', value: 'val' }) //trying to create edit
                    ]), //close .modal-body
                    m('.modal-footer', [
                        m('button.btn.btn-default', { 'data-dismiss': 'modal', type: 'button' }, "Close"),
                        m('button.btn.btn-primary', { type: 'button' }, "Save Changes")
                    ])
                ]) // close .modal-content
            ])
         ])
    ])
}

// var progressBar = function() {
//     m(".progress", [
//             m(".progress-bar[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='60'][role='progressbar']", {style: {"width": " 60%"}}, [
//             60%
//             ])
//         ])
// }



var editForm = m.prop(readSteps())

var readSubView = function() {
  return m('div.content-read', readSteps())
}

