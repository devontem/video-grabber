var express = require('express');
var app = express();
var port = process.env.PORT || 3000;


// initializing all of the middleware for the application
var middlewareInit = require('./config/middleware.js');
middlewareInit(app, express);

// server listener
app.listen(port, function(){
	console.log('Listening on port: '+ port);
});

module.exports = app;