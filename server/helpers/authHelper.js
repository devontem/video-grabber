var jwt = require('jsonwebtoken');
var User = require('./../db/models/User');

var checkAuth = function(req, res, next){

	// finds the token from the request, query, or header
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	console.log('TOKEN: ', token)

	if (token){

		jwt.verify(token, 'v-grab', function(err, decoded){

			// if there is an error decoding the token
			if (err) { 
				res.status(403).send({
					message: 'Failed to authenticate token.', success: false
				}); 
			} else {
				console.log('user inside checkauth: ', decoded)
				// First, fetch user information (decoded is user's ID)
				// User.findById(decoded, function(err, user){
				// 	if (err) throw err;

				// 	// if there is no error send the information to the next middleware
				// 	req.user = decoded;
				// 	next();
				// });

				req.user = decoded;
				next();

			}

		});
	} else {

		// if there is no token provided
		res.status(403).send({
			success: false,
			message: 'No token was provided. Failed to authenticate.'
		});

	}
}

module.exports = checkAuth;