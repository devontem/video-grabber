var usersController = require('./usersController');

module.exports = function(app){
	app.post('/', usersController.createUser);
	app.post('/:id', usersController.updateUser);
	app.get('/:id', usersController.getUser);
}