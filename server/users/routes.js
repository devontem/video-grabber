var usersController = require('./usersController');
var checkAuth = require('./../helpers/authHelper');

module.exports = function(app){
	app.post('/', usersController.createUser);
	// app.get('/:id', function(req, res){ res.send('hey')});
	app.get('/:id', checkAuth, usersController.getUser);
	app.put('/:id', checkAuth, usersController.updateUser);
	app.get('/:id/feed', checkAuth, usersController.getFeed);
	app.get('/test', checkAuth, usersController.createTest);

	// add middleware to every route in userRoutescheckAuth
	// app.use(authenticate)
}