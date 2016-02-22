var m              = require('mithril');
var Tutorial       = require('../models/tutorials')
var CreateTutorial = module.exports;
var mainLayout     = require('../layouts/main.js');
var User           = require('../models/users');


CreateTutorial.controller = function () {
  var ctrl = this

  ctrl.tutorial = Tutorial.tutorialVM()
  User.confirmLoggedIn();

  ctrl.removeStep = function (idx) {
    ctrl.tutorial.steps.splice(idx, 1)
  }

}


CreateTutorial.view = function (ctrl, options) {
    var view = m('div', [
      createTemplate(ctrl),
      makeSteps(ctrl),
      buttons(ctrl),
    ]);
    return mainLayout(view);
}

var removeStep = function(ctrl, idx) {
  if (ctrl.tutorial.steps.length >= 2) {
    return m('button', { onclick: ctrl.tutorial.removeStep(idx) }, 'Remove Step')
  }
}

var createTemplate = function(ctrl, options) {

  return m('.CreateTutorial', [
            m('h2', 'Create Tutorial'),

          m('div', [
            m('fieldset', { style:'margin-right: 20%; margin-left: 10px;' }, [
              m('legend', 'Tutorial Information'),
                m('form', 'Title: ', { type: 'text' }, [
                  m('br'),
                  m('input', {
                    type: 'text',
                    placeholder: 'Enter Title',
                    style: 'width: 75%;',
                    onchange: function(e) { e.preventDefault(); ctrl.tutorial.title = this.value }
                  })
                ]),
                m('form', 'Description: ', { type: 'text' }, [
                  m('br'),
                  m('input', {
                    type: 'text',
                    placeholder: 'Enter Description',
                    style: 'width: 75%;',
                    onchange: function(e) { e.preventDefault(); ctrl.tutorial.description = this.value }
                  })
                ])
            ]),
          ]),

          m('br'),
          m('div', [
            m('fieldset', { style: 'margin-right: 33%; margin-left: 10px;'}, [
              m('legend', 'Step Information'),
            ])
          ])
         ])
}


var makeSteps = function(ctrl) {
  return m('.steps', { style: 'margin-left: 10px;'}, [

  ctrl.tutorial.steps.map(function(step, idx){
    return m('form', 'Description:', { type: 'text',  style: 'margin-right: 40%;' }, [
            m('br'),
            m('input', {
              type: 'text',
              placeholder: 'Give a short description of step',
              style: 'width: 75%',
              oninput: function() { ctrl.tutorial.steps[idx].title = this.value }
               //on change
               }),
            m('br'),
            m('br'),
            m('form', 'Step #' + (idx+1), { type: 'text' }),
            m('textarea.form-control', {
              rows:'3',
              type:'text',
              placeholder:'Step it out!',
              style: 'width:75%; height:175px ',
              oninput: function() { ctrl.tutorial.steps[idx].content = this.value }
              // onchange
               }),
            m('br'),
           ])
         })
       ])
}



var buttons = function(ctrl) {
  return m('div', [
      m(".btn-group[aria-label='...'][role='group']", [
        m("button.btn.btn-default[type='button']", {
          onclick:  function(e){ e.preventDefault(); ctrl.tutorial.steps.push( Tutorial.stepVM() ) }
        }, "Add Step"),
        m("button.btn.btn-default[type='button']",  "Delete Step"),
        m("button.btn.btn-default[type='button']", {
          onclick: function(e) { e.preventDefault(); Tutorial.create(ctrl.tutorial); console.log(ctrl.tutorial) }
        }, "Save"),
      ])
    ])
}

