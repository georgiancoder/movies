const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminUserController');

const adminUser = new admin();

// get requests
router.get('/',(req,res)=>{
	let opt = {
		page: 'login'
	};
	res.render('admin/login',opt);
});

router.get('/dashboard',adminUser.checkAuth,(req,res)=>{
	let opt = {
		page: 'dashboard',
		user: req.user
	};
	res.render('admin/dashboard',opt);
});

router.get('/categories',adminUser.checkAuth,(req,res)=>{
	let opt = {
		page: 'categories',
		user: req.user
	};
	res.render('admin/categories',opt);
});

router.get('/addcategorie',adminUser.checkAuth,(req,res)=>{
	let opt = {
		page: 'addcategorie',
		user: req.user
	};
	res.render('admin/addcategorie',opt);
});

router.get('/movies',adminUser.checkAuth,(req,res)=>{
	let opt = {
		page: 'movies',
		user: req.user
	};
	res.render('admin/movies',opt);
});

router.get('/addmovie',adminUser.checkAuth,(req,res)=>{
	let opt = {
		page: 'addmovie',
		user: req.user
	};
	res.render('admin/addmovie',opt);
});

router.get('/directors',adminUser.checkAuth,(req,res)=>{
	let opt = {
		page: 'directors',
		user: req.user
	};
	res.render('admin/directors',opt);
});

router.get('/adddirector',adminUser.checkAuth,(req,res)=>{
	let opt = {
		page: 'adddirector',
		user: req.user
	};
	res.render('admin/adddirector',opt);
});

router.get('/actors',adminUser.checkAuth,(req,res)=>{
	let opt = {
		page: 'actors',
		user: req.user
	};
	res.render('admin/actors',opt);
});

router.get('/addactor',adminUser.checkAuth,(req,res)=>{
	let opt = {
		page: 'addactor',
		user: req.user
	};
	res.render('admin/addactor',opt);
});


router.get('/logout',adminUser.logOut);

// post requests
router.post('/login',adminUser.login);



module.exports = router;
