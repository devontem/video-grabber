// Altering test env variable during testing
process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var User = require('./../db/models/User');
var Archive = require('./../db/models/Archive');

// Dev dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./../server');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

// Parent section
describe('Users: No Auth Required', function(){

	// Empties DB before each test
	beforeEach(function(done){

		// Empties DB before each test
		User.remove({}, function(err){
			
			// Adds one test user
			User.create({ 	name: 'Sarah', 
							email: 'sarah@me.com', 
							password: 'test123'}, 
							function(err, user){
								done();
							});
		});


	});

	/*
	*  Test the /POST Route
	*/
	it('it should create a NEW user', function(done){
		chai.request(server)
			.post('/api/users/')
			.send({name: 'Daniel', email: 'dan@me.com', password: 'ilovecats'}) //adding form fields
			.end(function(err, res){
				var user = res.body.user;
				res.should.have.status(200);

				expect(user.name).to.equal('Daniel');
				expect(user.email).to.equal('dan@me.com');
				expect(user.points).to.equal(0);
				done();
			});
	});

	/*
	 *  Test the /POST Route for unique users
	 */
	it('it should create a only UNIQUE users', function(done){
		chai.request(server)
			.post('/api/users/')
			.send({name: 'Sarah Von', email: 'sarah@me.com', password: 'sar232323'}) //adding form fields
			.end(function(err, res){
				res.should.have.status(400);
				done();
			});
	});

	/*
	 *  Test the /api/authenticate/login POST Route for login
	 */
	it('it should allow a user to login', function(done){
			chai.request(server)
				.post('/api/authenticate/login')
				.send({email: 'sarah@me.com', password: 'test123'})
				.end(function(err, res){

						expect(res).to.have.status(200);
						done();
					});
	});
});

// Parent section
describe('Users: Auth Required', function(){
	// declaring variables
	var token, id;

	/*
	 * BEFORE Function: removes all previous users, creates a new user, logs in & captures token
	 */
	before(function(done){

		// clear users from DB
		User.remove({}, function(err){

			// Adds one test user
			User.create({ name: 'Sarah', email: 'sarah@me.com', password: 'test123'}, function(err, user){

				// logging in user to get token
				chai.request(server)
					.post('/api/authenticate/login')
					.send({email: 'sarah@me.com', password: 'test123'})
					.end(function(err, res){

						// saving the token
						token = res.body.token;
						id = res.body.user._id;
						done();
					});
			});
		});
	});

	/*
	 * Test the /api/users/{id} GET 
	 */
	it('it should get a user by their ID', function(done){

		chai.request(server)
			.get('/api/users/'+id)
			.set('x-access-token', token)
			.end(function(err, res){

				expect(res).to.have.status(200);
				expect(res.body.name).to.equal('Sarah');
				expect(res.body.email).to.equal('sarah@me.com');
				done();
			});
	});

	/*
	 * Test the /api/users/{id} PUT for adding a friend
	 */
	it('it should add a friend to user', function(done){
		chai.request(server)
			.put('/api/users/'+id)
			.send({action: 'ADD', friend: { _id: '1sde234', name: 'Jeff', email: 'jeff@me.com' }})
			.set('x-access-token', token)
			.end(function(err, res){

				expect(res).to.have.status(200);
				expect(res.body.friends).to.include({ _id: '1sde234', name: 'Jeff', email: 'jeff@me.com' });
				done();
			});
	});

	/*
	 * Test the /api/users/{id} PUT for removing a friend 
	 */
	it('it should remove a friend from a user', function(done){
		chai.request(server)
			.put('/api/users/'+id)
			.send({action: 'REMOVE', friend: { _id: '1sde234', name: 'Jeff', email: 'jeff@me.com' }})
			.set('x-access-token', token)
			.end(function(err, res){

				expect(res).to.have.status(200);
				expect(res.body.friends).to.not.include({ _id: '1sde234', name: 'Jeff', email: 'jeff@me.com' });
				done();
			});
	});

	/*
	 * Test the /api/users/{id} PUT for adding a video to archives 
	 */
	it('it should add an archive to a user', function(done){
		// Mimicking a download query, saves video info to Archive model
		Archive.create({ hash: '22de', videoInfo: {} }, function(err, archive){

			//beginning the test
			chai.request(server)
			.put('/api/users/'+id)
			.send({action: 'ADD', video: { id: '7j2827', title: 'Dancing cats', hash: '22de'}})
			.set('x-access-token', token)
			.end(function(err, res){

				expect(res).to.have.status(200);
				expect(res.body.archives).to.include({ id: '7j2827', title: 'Dancing cats', hash: '22de'});
				done();
			});
		});
	});

	/*
	 * Test the /api/users/{id} PUT for removing a video to archives 
	 */
	it('it should remove an archive from a user', function(done){
		chai.request(server)
			.put('/api/users/'+id)
			.send({action: 'REMOVE', video: { id: '7j2827', title: 'Dancing cats', hash: '22de' }})
			.set('x-access-token', token)
			.end(function(err, res){

				expect(res).to.have.status(200);
				expect(res.body.archives).to.not.include({ id: '7j2827', title: 'Dancing cats', hash: '22de'});
				done();
			});
	});

	/*
	 * Test the /api/users/{id} POST for findingg users
	 */
	it('it should search find a user from a friend search', function(done){

		// populating DB with more users with similar names
		User.create( { name: 'Sara Van', email: 'sarav@gmail.com', password: 'test2323' },
					 { name: 'Sarmando B', email: 'sarmando@me.com', password: 'test2323' },
					 function(err, user1, user2){
					 	if (err) throw err;

					 	// Running the test
					 	chai.request(server)
							.post('/api/users/search')
							.send({ username: 'sar' })
							.end(function(err, res){

								expect(res).to.have.status(200);
								expect(res.body.friends).to.have.lengthOf(3);
								done();
							});
					 });
	});
});




