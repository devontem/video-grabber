// Altering test env variable during testing
process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var User = require('./../db/models/User');

// Dev dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./../server');
var should = chai.should();

chai.use(chaiHttp);

// Parent section
describe('Users', function(){
	beforeEach(function(done){

		User.remove({}, function(err){
			done();
		})
	});
});