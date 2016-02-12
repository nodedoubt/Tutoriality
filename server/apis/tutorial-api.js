var express = require('express');
var router = express.Router();
router.get('/tutorials', function(request, response){
	response.send([{title : "A tutorial"}]);
});
module.exports = router;

