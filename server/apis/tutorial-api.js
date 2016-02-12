var express = require('express');
var router = express.Router();
var Tutorial = require('../models/tutorial.js');
router.get('/tutorials', function(request, response, next){
	Tutorial.insert({test : 1}).catch(function(error){
		console.log('error');
		response.send([{title : "A tutorial"}]);
	}).then(function(response){
		console.log('test');
		response.send('test');
	});
	next();
});
module.exports = router;

