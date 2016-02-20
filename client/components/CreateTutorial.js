var m              = require('mithril');
var TutorialModel  = require('../models/TutorialModel')
var CreateTutorial = module.exports;
var mainLayout = require('../layouts/main.js');

CreateTutorial.tutorial = { title: '', description: ''}
CreateTutorial.tutorial.steps    = [{Title: '', Description:''}]

CreateTutorial.controller = function () {
  var ctrl = this;

  ctrl.counter = 1;

  ctrl.addStep = function(){
    CreateTutorial.tutorial.steps.push({ Title: '', Description:''})
  }

}

CreateTutorial.view = function (ctrl, options) {
    var view = m('div', [
      createTemplate(ctrl),
      makeSteps(ctrl),
      buttons(ctrl)
    ]);
    return mainLayout(view);
}


var createTemplate = function(ctrl, options) {
  return m('.CreateTutorial', [
            m('h2', 'Create Tutorial'),

          m('div', [
            m('fieldset', { style:'margin-right: 35%; margin-left: 10px;' }, [
              m('legend', 'Tutorial Information'),
                m('form', 'Title: ', { type: 'text' }, [
                  m('br'),
                  m('input', {
                    type: 'text',
                    placeholder: 'Enter Title',
                    style: 'width: 55%;',
                    oninput: function() { CreateTutorial.tutorial.title = this.value }
                  })
                ]),
                m('form', 'Description: ', { type: 'text' }, [
                  m('br'),
                  m('input', {
                    type: 'text',
                    placeholder: 'Enter Description',
                    style: 'width: 55%;',
                    oninput: function() { CreateTutorial.tutorial.description = this.value }
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

  CreateTutorial.tutorial.steps.map(function(step){
    return m('form', 'Description:', { type: 'text',  style: 'margin-right: 33%;' }, [
            m('br'),
            m('input', {
              type: 'text',
              placeholder: 'Give a short description of step',
              style: 'width: 54%',
              oninput: function() { CreateTutorial.tutorial.steps[ctrl.counter-1].Title = this.value }
               }),
            m('br'),
            m('br'),
            m('form', 'Step: ' + ctrl.counter, { type: 'text' }),
            m('textarea.form-control', {
              rows:'3',
              type:'text',
              placeholder:'Step it out!',
              style: 'width:75%; height:175px ',
              oninput: function() { CreateTutorial.tutorial.steps[ctrl.counter-1].Description = this.value }
               }),
            m('br'),
           ])
         })
       ])
}

var buttons = function(ctrl){
  return m('.buttons', [
            m('button', {
              type:'submit',
              onclick:  function(e){ e.preventDefault(); ctrl.counter++; console.log(ctrl.counter); return ctrl.addStep();  }
              }, 'Add Step'),
            m('button', {
              type: 'submit',
              onclick: function(e) { e.preventDefault(); console.log('Commit Tutorial To Database'); console.log(CreateTutorial.tutorial) }
            }, 'Save')

    ])
}



//function blanks step model into steps array
