var routes = require('../index.js');

routes.get('/api/tutorials', function(request, response) {
	console.log('tutorials');
	response.send({});
})