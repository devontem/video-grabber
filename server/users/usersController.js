var jwt = require('jsonwebtoken');
var User = require('./../db/models/User');
var app = require('./../server');

module.exports.createUser = function(req, res){

	// creating a user
	User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		points: 0
	}, function(err, user){
		if (err) res.status(404).send({message: 'Error: '+err });

		// creating a token and logging in the user
		var token = jwt.sign(user, 'v-grab');

		// sending information on response
		res.send({
			message: 'User created.',
			token: token,
			user: user
		});
	});
}

module.exports.updateUser = function(req, res){
	res.send('update user');
}

module.exports.getUser = function(req, res){
	var id = req.params.id;

	User.findOne({
		_id: id
	}, function(err, user){

		if (err) throw err;

		// sending user information
		res.send(user);
	});
}

module.exports.createTest = function(req, res){
	res.send('created test');
}