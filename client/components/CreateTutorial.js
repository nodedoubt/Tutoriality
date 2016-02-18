var m              = require('mithril');
var Nav            = require('./Nav');
var TutorialModel  = require('../models/TutorialModel')
var CreateTutorial = module.exports;

CreateTutorial.controller = function () {
  var ctrl = this;

  ctrl.steps = [{Description: '', Instruction:''}, {}, {}]

  ctrl.addStep = function(){
    ctrl.steps.push({ Description: '', Instruction:''})
    console.log(ctrl.steps)
    m.redraw()
  }



}

CreateTutorial.view = function (ctrl, options) {
 return m('div', [
      Nav.view(),
      createTemplate(ctrl),
      makeSteps(ctrl),
      // createTemplate()
    ]);

}


var createTemplate = function(ctrl, options) {
  return m('.CreateTutorial', [

    m('h2', 'Create Tutorial'),

    m('div', [
      m('fieldset', { style:'margin-right: 35%; margin-left: 10px;' }, [
        m('legend', 'Tutorial Information'),
        m('form', 'Title: ', { type: 'text' }, [
          m('br'),
          m('input', { type: 'text', placeholder: 'Enter Title', style: 'width: 55%;' })
        ]),
        m('form', 'Description: ', { type: 'text' }, [
          m('br'),
          m('input', { type: 'text', placeholder: 'Enter Description', style: 'width: 55%;' })
        ])
      ]),
    ]),
    m('br'),
    m('div', [
        m('fieldset', { style: 'margin-right: 33%;'}, [
          m('legend', 'Step Information'),
        ])
    ])
])
}


var makeSteps = function(ctrl) {
  return m('.steps', [

  ctrl.steps.map(function(step){
    return m('form', 'Description:', { type: 'text',  style: 'margin-right: 33%; margin-left: 10px;' }, [
            m('br'),
            m('input', { type: 'text', placeholder: 'Give a short description of step', style: 'width: 54%' }),
            m('br'),
            m('br'),
            m('form', 'Step: ', { type: 'text' }),
            m('textarea.form-control', { rows:'3', type:'text', placeholder:'Step it out!', style: 'width:75%; height:175px ' }),
            m('br'),

            m('button', 'Add Step', { type:'submit', onclick: function(e){ e.preventDefault(); ctrl.addStep()  } }),
            ])
        })
  ])
}



//function blanks step model into steps array
