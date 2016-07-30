var convertLink = require('./../helpers/convertLink');
var request = require('request');
var fs = require('fs');
var youtubedl = require('youtube-dl');

module.exports.convertLink = function(req, res){
	var baseUrl = req.body.baseUrl;
	var downloadUrl = 'http://vid-grab.'+baseUrl+'/28392.downlad';

	res.send({ baseUrl: baseUrl, downloadUrl: downloadUrl });
}

module.exports.getDownload = function(req, res){
	var id = req.params.id;
	var path = 'server/temp/'+ id +'.mp4';
	console.log('path is ', path);

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

	console.log('are equal? ', videoLink === 'http://www.youtube.com/watch?v=90AiXO1pAiA')

	// console.log(req.body.baseUrl+'-------'+videoLink)

	// if (!isUrlValid(videoLink)) res.send({error: true, message: 'Your link entered was invalid! Make sure you entered it in correctly.'});

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

	video.pipe(fs.createWriteStream('server/temp/'+ hash +'.mp4'))

	video.on('complete', function complete(info) {
	  'use strict';
	  console.log('filename: ' + info._filename + ' already downloaded.');
	});

	video.on('end', function(err){
		console.log('Video Download Ended')
		if (err) res.status(400).send({error: true, message: 'There was a problem converting this particular video. Please try another video or try again later.'})
		console.log('The video hash is...'+ hash)
		res.send({error:false, message: 'Your download is complete.. please wait to be redirected or navigate to /download/id/'+hash, hash: hash, videoInfo: videoInfo})
	})
	
}

module.exports.checkDownload = function(req, res){

	var id = req.params.id;
	var path = 'server/temp/'+ id +'.mp4';
	console.log('path is ', path);

	if (fs.existsSync(path)) {

		res.send({status: true, message: 'Your video is ready to be downloaded!'});

	} else {

		res.send({status: false, message: 'This video has already been downloaded or has expired! Please try to convert again.'})
	}
}

function deleteExpired(){
	var now = Date.now();

	// Loop through all the files in the temp directory
	fs.readdir( 'server/temp', function( err, files ) {
	        if( err ) {
	            console.error( "Could not list the directory.", err );
	            process.exit( 1 );
	        } 

	        files.forEach( function( file, index ) {
	                // Make one pass and make the file complete
	                var fromPath = 'server/temp/' + file;

	                fs.stat( fromPath, function( error, stat ) {
	                    if( error ) {
	                        console.error( "Error stating file.", error );
	                        return;
	                    }

	                    var fileModified = stat.mtime;

	                    if (now - fileModified >= 20*60*1000) {
						    fs.unlink(fromPath)
						}
	                } );
	        });
	});

	console.log('Expired Files Deleted: DONE')

}

function generateHash(){
	return Math.random().toString(36).substring(7);
}

function isUrlValid(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}


