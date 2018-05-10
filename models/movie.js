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

	let actors = [];
	let directors = [];
	let categorieIds = [];

	actors = actors.concat(data.actors);
	directors = directors.concat(data.directors);
	categorieIds = categorieIds.concat(data.categories);

	newMovie.title.en = data.titleen;
	newMovie.title.ka = data.title;
	newMovie.releaseYear = data.releaseYear;
	newMovie.country = data.country;
	newMovie.length = data.length;
	newMovie.budget = data.budget;
	newMovie.income = data.income;
	newMovie.description = data.desciption;
	newMovie.poster = data.poster;
	newMovie.videoStream = data.movie;
	newMovie.subTitles.en = data.subtitleen;
	newMovie.subTitles.ka = data.subtitleka;
	newMovie.subTitles.ru = data.subtitleru;
	newMovie.categorieIds = categorieIds;
	newMovie.actors = actors;
	newMovie.directors = directors;

	newMovie.save(cb);
}

module.exports.getMovies = function(cb){
	let movie = this;

	movie.find(cb);
}

module.exports.deleteMovie = function(id,cb){
	let movie = this;

	movie.findByIdAndRemove(id,cb);
}


module.exports.getMovieById = function(id,cb){
	let movie = this;

	movie.findById(id,cb);
}

module.exports.updatePoster = function(id,cb){
	let movie = this;

	movie.findByIdAndUpdate(id,{poster: ''},cb);
}

module.exports.updateSubTitle = function(data,cb){
	let movie = this;
	
	let subTitles = {};
	subTitles[data.lng] = '';

	movie.findByIdAndUpdate(data.id,{subTitles: {
		$set: {
			ka: ''
		}
	}},cb);
}