
module.exports.getDownload = function(req, res){
	var id = req.params.id;

	res.send('User ID queried: '+ id);
}

module.exports.queryDownload = function(req, res){
	res.send('queryDownload');
}