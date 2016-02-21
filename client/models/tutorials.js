var m = require('mithril');
var _ = require('underscore');

var Tutorial = module.exports;

Tutorial.fetchAll = function() {
	return m.request({method : 'GET', url : '/api/tutorials'});
}

Tutorial.fetchByID = function(id) {
	return m.request({method : 'GET', url : '/api/tutorials' + id});
}

Tutorial.create = function(tutorial) {
	return m.request({method : 'POST', url : '/api/tutorials', data : tutorial});
}

Tutorial.addStep = function(){
  steps.push({ Title: '', Description:'' })
}



Tutorial.tutorial = { title: '', description: ''};
Tutorial.tutorial.steps    = [];

var idCount = 1;

Tutorial.tutorialVM = function () {
  return {
    title: '',
    description: '',
    steps: [ Tutorial.stepVM() ]
  }
}

Tutorial.stepVM = function () {
  return {
    title: '',
    content: ''
  }
}


var exampleData =[
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
        },
         {
          Title: 'extra',
          Description: 'Get dog shampoo, a basin or tub to wash the dog in and warm water'
        },
        {
          Title: 'extra 2',
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


Tutorial.soFetch = exampleData.filter(function(list) {
    if(list['id'] === 0) {
        return true;
    }
  });
console.log('fetch', Tutorial.soFetch[0].steps)

// Tutorial.readTuts = Tutorial.soFetch.map(function(tutorial) {
//     return {
//       id: tutorial.id,
//       title: tutorial.title,
//       description: tutorial.description,
//       steps: tutorial.steps
//     };
//   });

// console.log('listme',Tutorial.readTuts)

Tutorial.map = _.map(exampleData[0].steps, function(list) {
    console.log('map', list)
    return list
})

console.log('log tm',Tutorial.map)

// console.log('final step plz', Tutorial.listSteps)

