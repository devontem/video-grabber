var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');
var promise = require('bluebird');
var mongoose = require('mongoose');

module.exports = function(app, express){

	// setting application variables
	app.set('secret', config.secret);

	// serving static files
	app.use(express.static(__dirname + '/../../client'));

	// colored/detailed server logs
	app.use(morgan('dev'));

	// parses x-www-form-urlencoded (form) data on request
	app.use(bodyParser({ urlencoded: true }));

	// parses json data on request
	app.use(bodyParser.json());

	// routers
	var downloadRouter = express.Router();
	var userRouter = express.Router();
	var authRouter = express.Router();

	// routes
	app.use('/api/download', downloadRouter);
	app.use('/api/users', userRouter);
	app.use('/api/authenticate', authRouter);

	// initializing routers
	var downloadRoutes = require('../download/routes');
	downloadRoutes(downloadRouter);

	var userRoutes = require('../users/routes');
	userRoutes(userRouter);

	var authRoutes = require('../auth/routes');
	authRoutes(authRouter)
}