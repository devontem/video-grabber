
var $ = require('jquery');
var http = require('http');

module.exports = function(){
	var options = {
		host: 'google.com'
	}

	return http.get(options);
}