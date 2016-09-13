var usersController = require('./usersController');
var checkAuth = require('./../helpers/authHelper');

module.exports = function(app){
	app.post('/', usersController.createUser);
	app.post('/:id', checkAuth, usersController.updateUser);
	app.get('/:id', checkAuth, usersController.getUser);
	app.get('/test', checkAuth, usersController.createTest);

	// add middleware to every route in userRoutescheckAuth
	// app.use(authenticate)
}