const express = require('express');
const router = express.Router();
const categorie = require('../controllers/categorieController');
const Movies = require('../controllers/movieController');
const directors = require('../controllers/directorsController');

const Categorie = new categorie();
const Director = new directors();

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
				res.render('front/movie',opt);
			}
		});
	});

});

router.get('/categories/:id',(req,res)=>{
	let opt = {
		page: 'movie'
	}
	let id = req.params.id ? req.params.id : null;
	Categorie.getCategories((err,categories)=>{
		opt.categories = categories;
		Movies.getMoviesByCategorie(id,(err,data)=>{
			if(err){
				console.log(err);
			} else {
				opt.movies = data;
				res.render('front/categorie',opt);
			}
		});
	});
});

router.get('/director/:id',(req,res)=>{
	let opt = {
		page: 'director'
	}
	let id = req.params.id ? req.params.id : null;
	Categorie.getCategories((err,categories)=>{
		opt.categories = categories;
		Director.getDirectorPageData(id,(err,data)=>{
			if(err){
				console.log(err);
			} else {
				opt.data = data;
				res.render('front/director',opt);
			}
		});
	});
});

router.get('/regauth',(req,res)=>{
	let opt = {
		page: 'movie'
	}
	Categorie.getCategories((err,categories)=>{
		opt.categories = categories;
		res.render('front/regauth',opt);
	});
});

module.exports=router;
