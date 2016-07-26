var convertLink = require('./../helpers/convertLink');
var request = require('request');

module.exports.convertLink = function(req, res){
	var baseUrl = req.body.baseUrl;
	var downloadUrl = 'http://vid-grab.'+baseUrl+'/28392.downlad';

	res.send({ baseUrl: baseUrl, downloadUrl: downloadUrl });
}

module.exports.getDownload = function(req, res){
	var id = req.params.id;

	res.send('User ID queried: '+ id);
}

module.exports.queryDownload = function(req, res){
	res.send('queryDownload');
}