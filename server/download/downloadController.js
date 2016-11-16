var fs = require('fs');
var User = require('./../db/models/User');
var Archive = require('./../db/models/Archive');
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

	// if video exists (not expired or already downloaded)
	if (fs.existsSync(path)) {

		// find video information
		Archive.findOne({hash: id}, function(err, archive){
			if (err) throw err;
			var filename = archive.videoInfo.title + '.mp4';

			// trigger a download
			res.download(path, filename, function(err){
				if (!err){
					fs.unlink(path); // remove the file from our server
				}
			});
		});
	}
}

module.exports.queryDownload = function(req, res){

	var videoLink = req.body.baseUrl;
	var id = req.body.id || null;
	var videoInfo;
	var hash = generateHash();

	// deletes expired videos in the server
	deleteExpired();
	
	var video = youtubedl(videoLink,
	  // Optional arguments passed to youtube-dl.
	  ['--format=18'],
	  // Additional options can be given for calling `child_process.execFile()`.
	  { cwd: __dirname });

	// Will be called when the download starts.
	video.on('info', function(info) {
	  videoInfo = info;
	  videoInfo.hash = hash; // adding custom hash to videoInfo
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

	// when the video ends
	video.on('end', function(err){
		console.log('Video Download Ended. Hash ID is: '+ hash);

		if (err) res.status(400).send({error: true, message: 'There was a problem converting this particular video. Please try another video or try again later.'});

		// save a video in app archives
		Archive.create({
			hash: hash,
			videoInfo: videoInfo
		}, function(err, archive){
			if (err) res.status(404).send({message: 'Error: '+err });

			// if logged in user makes request, save their stats
			console.log('A user is downloading a video: ', id);
			if (id){
				User.findById(id, function(err, user){

					// check if video already exists in archives, deletes duplicates
					user.archives = user.archives.filter(function(item){
						return item.id !== videoInfo.id;
					});

					// removing redundant/unimportant fields
					var filteredVideo = filterVideo(videoInfo);

					// updating user credentials
					user.archives.push(filteredVideo);
					user.points += 10;

					// saving user
					user.save();

					res.send({
						user: user,
						download: { error: false, 
									message: 'Your conversion is complete!', 
									hash: hash, 
									videoInfo: videoInfo } });
				});

			// if a user is not logged in
			} else {
				res.send({
						user: null,
						download: { error:false, 
									message: 'Your conversion is complete!', 
									hash: hash, 
									videoInfo: videoInfo } });

			} // end of else statement
		}); // end of Archives.create
	}); // end of video.on('end')
} // end of function

module.exports.checkDownload = function(req, res){

	var id = req.params.id;
	var path = 'server/temp/'+ id +'.mp4';
	console.log('Checking if the following file exists: '+ path);

	// deletes expired videos in the server
	deleteExpired();

	Archive.findOne({hash: id}, function(err, archive){
		if (err) throw err;

		// checking if the path exists in storage, and archive data is available
		if (fs.existsSync(path) && archive) {
			var videoInfo, status;

			res.send({	status: true, 
						videoInfo: archive.videoInfo,
						message: 'Your video is ready to be downloaded!'});

		} else {

			// 1. If already downloaded, show videoInfo
			// 2. Error handling incase invalid URL, show no videoInfo
			var videoInfo = archive ? archive.videoInfo : null;

			res.send({	status: false, 
						videoInfo: videoInfo,
						message: 'This video has already been downloaded or has expired! Please try to convert again.'});

		}

	}); // end of archive query
}

function filterVideo(video){

	// returns a new object filtering out 'important' properties of the video object
	return {
		id: video.id,
		title: video.title,
		hash: video.hash,
		webpage_url: video.webpage_url,
		thumbnail: video.thumbnail
	}
}
