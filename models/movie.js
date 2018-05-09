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


module.exports.addNewMovie = function(data,cb){
	let movie = this;
	let newMovie = new movie();

	newMovie.title.en = data.titleen;
	newMovie.title.ka = data.title;
	newMovie.releaseYear = data.releaseYear;
	newMovie.country = data.country;
	newMovie.length = data.length;
	newMovie.budget = data.budget;
	newMovie.income = data.income;
	newMovie.description = data.description;
	newMovie.poster = data.poster;
}
