var downloadController = require('./downloadController');

module.exports = function(app){
	app.post('/', downloadController.queryDownload);	
	app.get('/id/:id', downloadController.getDownload);
	app.get('/check/id/:id', downloadController.checkDownload);
}