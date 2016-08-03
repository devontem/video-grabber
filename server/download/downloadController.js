var request = require('request');
var fs = require('fs');
var youtubedl = require('youtube-dl');
var isUrlValid = require('./../helpers/downloadHelpers').isUrlValid;
var generateHash = require('./../helpers/downloadHelpers').generateHash;
var deleteExpired = require('./../helpers/downloadHelpers').deleteExpired;

module.exports.getDownload = function(req, res){
	var id = req.params.id;
	var path = 'server/temp/'+ id +'.mp4';
	console.log('path is ', path);

	// deletes expired videos in the server
	deleteExpired();

	if (fs.existsSync(path)) {

		res.download(path, id+'.mp4', function(err){
			if (!err){
				fs.unlink(path);
			}
		});
	}
}

module.exports.queryDownload = function(req, res){

	var videoLink = req.body.baseUrl
	var videoInfo;
	var hash = generateHash();
	
	var video = youtubedl(videoLink,
	  // Optional arguments passed to youtube-dl.
	  ['--format=18'],
	  // Additional options can be given for calling `child_process.execFile()`.
	  { cwd: __dirname });

	// Will be called when the download starts.
	video.on('info', function(info) {
	  videoInfo = info;
	  console.log('Download started');
	  console.log('filename: ' + info._filename);
	  console.log('size: ' + info.size);
	})

	video.on('error', function error(err) {
    console.log('error 2:', err);
    res.status(400).send({error: true, message: 'There was a problem converting this particular video. Please try another video or try again later.'})
  });

	// saves downloaded video to server under hash name
	video.pipe(fs.createWriteStream('server/temp/'+ hash +'.mp4'))

	video.on('complete', function complete(info) {
	  'use strict';
	  console.log('filename: ' + info._filename + ' already downloaded.');
	});

	video.on('end', function(err){
		console.log('Video Download Ended. Hash ID is: '+ hash);

		if (err) res.status(400).send({error: true, message: 'There was a problem converting this particular video. Please try another video or try again later.'})

		res.send({  error:false, 
					message: 'Your download is complete.. please wait to be redirected or navigate to /download/id/'+hash, 
					hash: hash, 
					videoInfo: videoInfo });
	})
	
}

module.exports.checkDownload = function(req, res){

	var id = req.params.id;
	var path = 'server/temp/'+ id +'.mp4';
	console.log('Checking if the following file exists: '+ path +'.mp4');

	if (fs.existsSync(path)) {

		res.send({status: true, message: 'Your video is ready to be downloaded!'});

	} else {

		res.send({status: false, message: 'This video has already been downloaded or has expired! Please try to convert again.'});

	}
}

