var fs = require('fs');

module.exports.deleteExpired = function(){
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

	                    // expires after 20 minutes
	                    if (now - fileModified >= 20*60*1000) {
						    fs.unlink(fromPath)
						}
	                } );
	        });
	});

	console.log('Expired Files Deleted: DONE')

}

module.exports.generateHash = function(){
	return Math.random().toString(36).substring(7);
}

module.exports.isUrlValid = function(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}
