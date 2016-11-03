var mongoose = require('./../../config/db');
var bcrypt = require('bcrypt');
var saltRounds = 10;

var userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email:  {
		type: String,
		index: true,
		unique: true,
		required: true
	},
	password: String,
	points: Number,
	archives: [mongoose.Schema.Types.Mixed],
	friends: [mongoose.Schema.Types.Mixed]
});

// creating an encrypted password on saving a new user
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a generic salt, return hash
    var hash = bcrypt.hashSync(user.password, saltRounds);
    user.password = hash;
    next();

});

// adding a function to compare if passwords match
userSchema.methods.comparePasswords = function(pass, cb){
	return bcrypt.compareSync(pass, this.password);
}


module.exports = mongoose.model('User', userSchema);