const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

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
	categorieIds: [ObjectId],
	actors: [ObjectId],
	directors: [ObjectId]
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

module.exports.updateMovie = function(data,cb){
	console.log(data);
	let movie = this;

	let actors = [];
	let directors = [];
	let categorieIds = [];

	actors = actors.concat(data.actors);
	directors = directors.concat(data.directors);
	categorieIds = categorieIds.concat(data.categories);

	movie.findByIdAndUpdate(data.id,{
		title:{
			ka: data.title,
			en: data.titleen
		},
		releaseYear: data.releaseYear,
		country: data.country,
		length: data.length,
		budget: data.budget,
		income: data.income,
		description: data.desciption,
		poster: data.poster,
		videoStream: data.movie,
		"subTitles.ka": data.subtitleka,
		"subTitles.en": data.subtitleen,
		"subTitles.ru": data.subtitleru,
		categorieIds: categorieIds,
		actors: actors,
		directors: directors
	},cb);
}

module.exports.getByCategorieId = function(id,cb){
	let movie = this;

	movie.find({categorieIds: id},cb);
}

module.exports.getMovieContent = function(id,cb){
	let movie = this;

	movie.aggregate([
		{
			$match: {
				_id: mongoose.Types.ObjectId(id)
			}
		},
		{
			$lookup: {
				from: 'actors',
				localField: 'actors',
				foreignField: '_id',
				as: 'actorsInfo'
			}
		},
		{
			$lookup: {
				from: 'directors',
				localField: 'directors',
				foreignField: '_id',
				as: 'directorsInfo'
			}
		},
		{
			$lookup: {
				from: 'categories',
				localField: 'categorieIds',
				foreignField: '_id',
				as: 'categorieInfo'
			}
		}
	], cb);
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
	let sss = "subTitles.ka";
	switch (data.lng) {
		case "ka":
			movie.findByIdAndUpdate(data.id,{$set: {"subTitles.ka": '' }},cb);
			break;
		case "en":
			movie.findByIdAndUpdate(data.id,{$set: {"subTitles.en": '' }},cb);
			break;
		case "ru":
			movie.findByIdAndUpdate(data.id,{$set: {"subTitles.ru": '' }},cb);
			break;
	}

}
