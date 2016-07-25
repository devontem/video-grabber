var usersController = require('./usersController');

module.exports = function(app){
	app.get('/:id', usersController.getUser);
}