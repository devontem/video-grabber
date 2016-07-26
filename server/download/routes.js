var downloadController = require('./downloadController');

module.exports = function(app){
	
	app.post('/', downloadController.convertLink);
	app.get('/id/:id', downloadController.getDownload);
	app.post('/id', downloadController.queryDownload);	
}