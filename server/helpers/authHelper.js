var jwt = require('jsonwebtoken');
var User = require('./../db/models/User');

var checkAuth = function(req, res, next){

	// finds the token from the request, query, or header
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token){

		jwt.verify(token, 'v-grab', function(err, decoded){

			// if there is an error decoding the token
			if (err) { 
				res.status(403).send({
					message: 'Failed to authenticate token.', success: false
				}); 
			} else {

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