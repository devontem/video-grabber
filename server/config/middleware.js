var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express){

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

	// routes
	app.use('/api/download', downloadRouter);
	app.use('/api/users', userRouter);

	// initializing routers
	var downloadRoutes = require('../download/routes');
	downloadRoutes(downloadRouter);

	var userRoutes = require('../users/routes');
	userRoutes(userRouter);
}