var m              = require('mithril');
var Nav            = require('./Nav');
var CreateTutorial = module.exports;

CreateTutorial.controller = function () {
  var ctrl = this;


}

CreateTutorial.view = function (ctrl, options) {
 return m('div', [
      Nav.view(),
      createTemplate(),
      addStep()
      // createTemplate()
    ]);

}


var createTemplate = function() {
  return m('.CreateTutorial', [

    m('h2', 'Create Tutorial'),

    m('div', [
      m('fieldset', { style:'margin-right: 35%' }, [
        m('legend', 'Tutorial Information'),
        m('form', 'Title: ', { type: 'text' }, [
          m('br'),
          m('input', { type: 'text', placeholder: 'Enter Title', style: 'width: 55%' })
        ]),
        m('form', 'Description: ', { type: 'text' }, [
          m('br'),
          m('input', { type: 'text', placeholder: 'Enter Description', style: 'width: 55%' })
        ])
      ]),
    ]),
    m('br'),
    m('div', [
        m('fieldset', { style: 'margin-right: 33%;'}, [
          m('legend', 'Step Information'),
          m('form', 'Description:', { type: 'text' }, [
            m('br'),
            m('input', { type: 'text', placeholder: 'Give a short description of step', style: 'width: 54%' })
          ]),

          m('form', 'Step: ', { type: 'text' }, [
            m('br'),
            m('textarea.form-control', { rows:'3', type:'text', placeholder:'Step it out!', style: 'width:75%; height:175px ' }),
            m('br'),
            m('button', 'Add Step', { type: 'submit', onclick:function(e){ e.preventDefault(); addStep() } }),

            ])
          ])
        ])
    ])
}


var addStep = function() {
  return m('div', [
        m('fieldset', { style: 'margin-right: 33%;'}, [
          m('legend', 'Step Information'),
          m('form', 'Description:', { type: 'text' }, [
            m('br'),
            m('input', { type: 'text', placeholder: 'Give a short description of step', style: 'width: 54%' })
          ]),

          m('form', 'Step: ', { type: 'text' }, [
            m('br'),
            m('textarea.form-control', { rows:'3', type:'text', placeholder:'Step it out!', style: 'width:75%; height:175px ' }),
            m('br'),
            m('button', 'Add Step', { type: 'submit', onclick: '' } ),
            ])
          ])
        ])
}

