var m              = require('mithril');
var marked         = require('marked');

var mainLayout     = require('../layouts/main.js');
var Tutorial       = require('../models/tutorials')
var User           = require('../models/users');

var CreateTutorial = module.exports;
//assume options object tutorial_id
// pass in options
CreateTutorial.controller = function (options) {
  var ctrl = this
  ctrl.save = function (tutorial) {
    if(ctrl.idCheck) {
      Tutorial.update(tutorial)
    }
    else {
      Tutorial.create(tutorial)
    }
  }

  ctrl.populate = function(options) {
    ctrl.tutorial = null;
    if(options.tutorial_id === undefined) {
      ctrl.tutorial = Tutorial.tutorialVM()
    }
    else {
      Tutorial.fetchById(options.tutorial_id)
      .then(function(tutorial){
        ctrl.tutorial = tutorial;
      })
    }
  }


  ctrl.removeStep = function (idx) {
    ctrl.tutorial.steps.splice(idx, 1)
  }

  User.confirmLoggedIn();
  ctrl.populate();
}

CreateTutorial.view = function (ctrl, options) {
    var view = m('div', [
      createTemplate(ctrl),
      makeSteps(ctrl),
      buttons(ctrl),
    ]);
    return mainLayout(view);

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
              onchange: function() { step.title = this.value }
               }),
            m('br'),
            m('br'),
            m('form', 'Step #' + (idx+1), { type: 'text' }),
            m('textarea.form-control', {
              rows:'3',
              type:'text',
              placeholder:'Step it out!',
              style: 'width:75%; height:175px ',
              onchange: function() { step.content = this.value }
               }),
            m('br'),
           ])
         })
       ])
}



var buttons = function(ctrl) {
  return m('div', { style:'margin-left:30%;'}, [
      m(".btn-group[aria-label='...'][role='group']", [
        m("button.btn.btn-primary.btn-lrg[type='button']", {
          onclick:  function(e) { e.preventDefault(); ctrl.tutorial.steps.push( Tutorial.stepVM() );}
        }, "Add Step"),
        m("button.btn.btn.btn-primary.btn-lrg[type='button']", {
          onclick: function(e) { e.preventDefault(); ctrl.removeStep(ctrl, this.idx) }
        }, "Delete Step"),
        m("button.btn.btn.btn-primary.btn-lrg[type='button']", {
          onclick: function(e) { e.preventDefault(); ctrl.save(ctrl.tutorial); m.route('/'); }
        }, "Save"),
      ]),
      m('br'),
      m('br'),
    ])
}

var removeStep = function(ctrl, idx) {
  if (ctrl.tutorial.steps.length >= 2) {
    return m('button', { onclick: ctrl.tutorial.removeStep(idx) }, 'Remove Step')
  }
}

