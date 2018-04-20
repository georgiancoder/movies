const mongoose = require('mongoose');
const moviesSchema=mongoose.Schema({
	title: {
		en: String,
		ka: String
	},
	releaseYear: Number,
	country: String,
	length: String,
	budget: String,
	income: String,
	description: String,
	poster: String,
	videoStream: String,
	subTitles: {
		en: String,
		ka: String,
		ru: String
	},
	categorieIds: [],
	actors: [],
	directors: []
});

module.exports=mongoose.model('movies',moviesSchema);