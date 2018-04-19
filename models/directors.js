const mongoose = require('mongoose');

const directorsSchema = mongoose.Schema({
	name: String,
	lastName: String,
	moreInfo: String,
	avatar: String
});

module.exports = mongoose.model('directors',directorsSchema);