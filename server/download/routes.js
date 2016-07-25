var downloadController = require('./downloadController');

module.exports = function(app){
	
	app.get('/id/:id', downloadController.getDownload);
	app.post('/id', downloadController.queryDownload);	
}