const express = require('express');
const router = express.Router();
const categorie = require('../controllers/categorieController');
const Movies = require('../controllers/movieController');

const Categorie = new categorie();

router.get('/',(req,res)=>{
	let opt = {
		page: 'home'
	}
	Categorie.getCategories((err,categories)=>{
		opt.categories = categories;
		Movies.getMovies((err,movies)=>{
			opt.movies = movies;
			res.render('front/homepage',opt);
		});
	});

});

router.get('/movie/:id',(req,res)=>{
	let opt = {
		page: 'movie'
	}
	let id = req.params.id ? req.params.id : null;
	Categorie.getCategories((err,categories)=>{
		opt.categories = categories;
		Movies.getMovieContent(id,(err,data)=>{
			if(err){
				console.log(err);
			} else {
				opt.data = data;
				console.log(data);
				res.render('front/movie',opt);
			}
		});
	});

});

module.exports=router;
