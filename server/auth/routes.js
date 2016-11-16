var authController = require('./authController');

module.exports = function(app){
	app.post('/login', authController.login);
}