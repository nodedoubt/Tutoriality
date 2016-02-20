var m              = require('mithril');
var Nav            = require('./Nav');
var _              = require('underscore');
var Accordian      = require('./Accordion.js');
var List           = module.exports;


List.controller = function () {
  var ctrl = this;
  ctrl.tutorials = [];

  ctrl.tutorials = _.map(List.tutorials, function(tutorial) {
    return {
      id: tutorial.id,
      title: tutorial.title,
      content: m('.tutorial-content', tutorial.description)
    };
  });
};

List.view = function (ctrl, options) {
  return m('div.listView', [
    Nav.view(),

    m('div.page-header', [
      m('h1', 'Tutorial List')
    ]),

    m('div.content-area', [
      ctrl.tutorials.map(function(tutorial) {
        return m('div.panel.panel-default', [
          m('div.panel-heading', [
            m('h3.panel-title.list-link',  { "data-id": tutorial.id, onclick: function(e){
              console.log('Call Tutorial.fetchByID() with this id: ', e.target.getAttribute('data-id'));
            }.bind(ctrl)}, tutorial.title)
          ])
        ],
        m('div.panel-body', tutorial.content.children[0]));
      })
    ])

  ]);


  // options = {
  //   sections: ctrl.tutorials,
  //   id: ''
  // };
  // return m('div', [
  //   Nav.view(),
  //   m('h2', 'Tutorial List'),
  //   m.component(Accordian, options)
  // ]);

};


List.tutorials =[
    { id: 0,
      title: 'How to wash a dog',
      description: 'A tutorial on how to wash a muddy pup',
      steps: [
        {
          Title: 'Gather all dog washing supplies',
          Description: 'Get dog shampoo, a basin or tub to wash the dog in and warm water'
        },
        {
          Title: 'Wrangle dog into water',
          Description: 'Use hotdogs or your speed to capture the dog and put it in the basin of water'
        }
      ]
    },
    { id: 1,
      title: 'How to put on shoes',
      description: 'A tutorial on how to put your shoes on',
      steps: [
          {
            Title: 'Get two matching shoes',
            Description: 'Find both matching shoes that you want to wear'
          },
          {
            Title: 'Put shoes on',
            Description: 'Make sure laces are untied and slip foot into shoe.'
          }
        ]
    },    { id: 2,
          title: 'How to use a phone',
          description: 'A tutorial on how use a phone',
          steps: [
              {
                Title: 'Dial a phone number',
                Description: 'Use the keypad to dial someone\'s phone number'
              },
              {
                Title: 'Say Hello',
                Description: 'When that person answers, say hello. Otherwise, leave a message'
              }
            ]
        }
];
