var express = require('express');
var router = express.Router();
var OAuth = require('../lib/auth.js');

router.get('/sign-in', OAuth.auth('github', 'http://localhost:4000'));
module.exports = router;
