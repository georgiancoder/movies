const mongoose = require('mongoose');
const moviesSchema=mongoose.Schema({
	title: {
		en: String,
		ka: String
	},
	description: String,
	poster: String,
	videoStream: String,
	subTitles: [],
	releaseYear: Number,
	country: String,
	categorieIds: [],
	actors: [],
	length: String,
	budget: String,
	income: String,
	directors: []
});

module.exports=mongoose.model('movies',moviesSchema);