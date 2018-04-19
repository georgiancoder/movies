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
	res.send('hi')
});

router.get('/addcategorie',adminUser.checkAuth,(req,res)=>{
	res.send('hello');
});

router.get('/movies',adminUser.checkAuth,(req,res)=>{
	res.send('hi')
});

router.get('/addmovie',adminUser.checkAuth,(req,res)=>{
	res.send('hello');
});

router.get('/directors',adminUser.checkAuth,(req,res)=>{
	res.send('hi')
});

router.get('/adddirector',adminUser.checkAuth,(req,res)=>{
	res.send('hello');
});

router.get('/actors',adminUser.checkAuth,(req,res)=>{
	res.send('hi')
});

router.get('/addactor',adminUser.checkAuth,(req,res)=>{
	res.send('hello');
});


router.get('/logout',adminUser.logOut);

// post requests
router.post('/login',adminUser.login);



module.exports = router;
