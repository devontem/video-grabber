var mongoose = require('./../../config/db');

var archiveSchema = mongoose.Schema({
	hash: String,
	videoInfo: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Archive', archiveSchema);