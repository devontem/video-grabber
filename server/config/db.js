var promise = require('bluebird');
var mongoose = require('mongoose');

mongoose.Promise = promise;
var URI = process.env.MONGODB_URI || 'mongodb://localhost/test';

mongoose.connect(URI);

module.exports = mongoose;