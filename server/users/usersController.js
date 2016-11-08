var jwt = require('jsonwebtoken');
var fs = require('fs');
var User = require('./../db/models/User');
var Archive = require('./../db/models/Archive');
var app = require('./../server');
var formatFriend;

// filters out unnecessary information for friend list
function formatFriend(friend){
	return {
		_id: friend._id,
		name: friend.name,
		email: friend.email
	}
}

// Removes archive from archive DB (cleanup purposes)
function removeArchiveFromDB(video, cb){

	Archive.findOne({
		hash: video.hash
	}, function(err, archive){
		if (err) throw err;

		archive.remove(function(err){
			if (err) throw err;

			console.log('The archive has been deleted.');

			// calling callback
			cb();
		});
	})
}

module.exports.createUser = function(req, res){

	User.find({ email: req.body.email }, function(err, user){
		if (err) throw err;

		// if user exists already send error message, otherwise create the user (note: user is returned in an array)
		if (user.length) 
			res.status(400).send({message: 'This username is already taken. Please try something else.'});
		else
			createUser();
	});

	// creating a user
	function createUser(){
		User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			points: 0
		}, function(err, user){
			if (err) throw err;

			if (err) res.status(404).send({message: 'Error: '+ err });

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
}

module.exports.updateUser = function(req, res){
	var id = req.params.id;
	var action = req.body.action;
	var friend = req.body.friend || null;
	var video = req.body.video || null;

	User.findById(id, function(err, user){
		if (err) throw err;

		// adding items
		if (action === 'ADD'){
			// checking to add FRIEND or VIDEO, if same video/friend is already present, delete it and add new instance of it
			if (friend && user.friends.every(function(item){return friend._id !== item._id})) user.friends.push(formatFriend(friend));
			if (video && user.archives.every(function(item){return video.id !== item.id})) user.archives.push(video);
		}

		// removing items 
		if (action === 'REMOVE'){
			if (friend) user.friends = user.friends.filter(function(item){ return friend._id !== item._id });
			if (video) user.archives = user.archives.filter(function(item){ return video.id !== item.id })
		}
		// if video is being removed from archives, delete from archives DB, then send response
		if (video && action === 'REMOVE'){
			removeArchiveFromDB(video, updateUser); // deletes archive info from DB

		// otherwise, send response
		} else {
			updateUser();
		}

		// saving changes function
		function updateUser(){
			user.save(function(err, updatedUser){
				if (err) throw err;

				// removing field so it's not sent to frontend
				delete updatedUser.password;
				
				// sending the updated user
				res.send(updatedUser);
			});
		}
	});
}

module.exports.getUser = function(req, res){
	var id = req.params.id;

	User.findOne({
		_id: id
	}, function(err, user){

		if (err) throw err;

		// removing field so it's not sent to frontend
		delete user.password;

		// sending user information
		res.send(user);
	});
}

module.exports.getFeed = function(req, res){
	var id = req.params.id;

	User.findOne({
		_id: id
	}, function(err, user){

		if (err) throw err;

		var feed = [];

		// mapping array to each friend's id
		var friends = users.friends.map(function(friend){
			return friend._id;
		})

		//
		for (var i = 0; i < friends.length; i++){

			// break loop if feed has enough data
			if (feed >= 5) break;

			User.findOne(friends[i], function(err, user){
				if (err) throw err;

				// add last 3 downloads to feed
				feed.push(user.archives.slice(user.archives.length-4));
			})
		}

		// sending user information
		res.send(user);
	});

}

module.exports.searchFriend = function(req, res){
	var username = req.body.username;

	// finds all users with that username somewhere in their email 
	User.find({ "email": { "$regex": username, "$options": "i" } }, function (err, friends){
		if (err) throw err;

		// removes unnecessary information from friend objects
		var filteredFriends = friends.map(function(friend){ return formatFriend(friend) });

		// response
		res.send({  success: true,
					friends: filteredFriends });
	});
}

module.exports.createTest = function(req, res){
	res.send('created test');
}