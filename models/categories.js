const mongoose = require('mongoose');

const categorieSchema = mongoose.Schema({
	title: String,
	order: {type: Number, default: 0}
});

module.exports = mongoose.model('categories',categorieSchema);