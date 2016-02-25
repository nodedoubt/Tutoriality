var express = require('express');
var router = express.Router();
var Tutorial = require('../models/tutorial.js');

router.get('/tutorials', function(request, response){
	// run a find a without an id to get all tutorials
	Tutorial.find().then(function(tutorials){
		response.send(tutorials);
	});
});

router.get('/tutorials/:id', function(request, response){
	// run a find a without an id to get all tutorials
	Tutorial.findByID(request.params.id).then(function(tutorial){
		response.send(tutorial);
	});
});

router.put('/tutorials/:id', function(request, response){
	var id = request.params.id;
	Tutorial.updateByID(id, request.body)
		.then(() => Tutorial.findByID(id))
		.then(record => response.send(record));
});

router.post('/tutorials', function(request, response){
	Tutorial.insert(request.body).then(function(newRecord){
		response.send(newRecord);
	});
});

router.delete('/tutorials/delete/:id', function(request, response){
  var id = request.params.id;
  Tutorial.delete(id)
  //.then(function(res){
  	//response.send(res);
  //})
})

module.exports = router;

