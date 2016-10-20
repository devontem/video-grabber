var jwt = require('jsonwebtoken');
var User = require('./../db/models/User');
var app = require('./../server');

module.exports.login = function(req, res){

	User.findOne({
		email: req.body.email
	}, function(err, user){

		if (err) throw err;
		var password = req.body.password || undefined;

		// FAILED: if user doesn't exist
		if (!user) { 
			res.status(403).send({ success: false, message: 'User is not found.' });
		} 

		// FAILED: check if user has wrong password
		else if (!user.comparePasswords(password)){
			res.status(403).send({
				success: false,
				message: 'Passwords do not match.'
			});
		} 

		// SUCCESS: creating a token and "logging in" the user
		else {
			var token = jwt.sign(user._id, 'v-grab');

			res.send({
				message: 'User logged in.',
				token: token,
				user: user
			});
		}
	});
}