var jwt = require('jsonwebtoken');

var checkAuth = function(req, res, next){

	// finds the token from the request, query, or header
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	console.log('token ', token, req.body);

	if (token){

		jwt.verify(token, 'v-grab', function(err, decoded){

			// if there is an error decoding the token
			if (err) { 
				res.status(403).send({
					message: 'Failed to authenticate token.', success: false
				}); 
			} else {

				// if there is no error send the information to the next middleware
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