var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

// router.get('/create', OAuth.auth('github', 'http://localhost:4000'));

router.post('/users', function(request, response){
  User.findAndModify(request.body).then(function(user){
    response.send(user);
  });
});

module.exports = router;
