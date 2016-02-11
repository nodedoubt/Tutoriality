var express = require('express');
var router = express.Router();
router.get('/api/tutorials', function(request, response){
	response.send([{description : "A tutorial"}]);
});
module.exports = router;

