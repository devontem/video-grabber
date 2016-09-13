var promise = require('bluebird');
var mongoose = require('mongoose');

mongoose.Promise = promise;
mongoose.connect('mongodb://localhost/test');

module.exports = mongoose;