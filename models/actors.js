const mongoose = require('mongoose');

const actorsSchema = mongoose.Schema({
	name: String,
	lastName: String,
	avatar: String
});

module.exports = mongoose.model('actors',actorsSchema);