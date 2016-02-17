var m              = require('mithril');
var Nav            = require('./Nav');
var CreateTutorial = module.exports;

CreateTutorial.controller = function () {
  var ctrl = this;


}

CreateTutorial.view = function (ctrl, options) {
 return m('div', [
      Nav.view(),
      createTemplate()
    ]);

}

var subViews = function(ctrl) {
  return m('')
}

var createTemplate = function() {
  return m('.CreateTutorial', [

    m('h2', 'Create Tutorial'),

    m('div', [
      m('fieldset', { style:'margin-right: 35%' }, [
        m('legend', 'Tutorial Information'),
        m('form', 'Title: ', { type: 'text' }, [
          m('br'),
          m('input', { type: 'text', placeholder: 'Enter Title', style: 'width: 45%' })
        ]),
        m('form', 'Description: ', { type: 'text' }, [
          m('br'),
          m('input', { type: 'text', placeholder: 'Enter Description', style: 'width: 45%' })
        ])
      ]),
    ]),
    m('br'),
    m('div', [
        m('fieldset', { style: 'margin-right: 35%;'}, [
          m('legend', 'Step Information'),
          m('form', 'Description:', { type: 'text' }, [
            m('br'),
            m('input', { type: 'text', placeholder: 'Give a short description of step', style: 'width: 35%' })
          ]),

          m('form', 'Step: ', { type: 'text' }, [
            m('br'),
            m('textarea.form-control', { rows:'3', type:'text', placeholder:'Step it out!', style: 'width:75%; height:175px ' }),

            ])
          ])
        ])
    ])
}
