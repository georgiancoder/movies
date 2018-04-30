const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminUserController');
const categorie = require('../controllers/categorieController');
const directos = require('../controllers/directorsController');
const actors = require('../controllers/actorController');

const adminUser = new admin();
const Categorie = new categorie();
const Directors = new directos();
const Actors = new actors();

// get requests
router.get('/', (req, res) => {
    let opt = {
        page: 'login'
    };
    res.render('admin/login', opt);
});

router.get('/dashboard', adminUser.checkAuth, (req, res) => {
    let opt = {
        page: 'dashboard',
        user: req.user
    };
    res.render('admin/dashboard', opt);
});

router.get('/categories', adminUser.checkAuth, (req, res) => {
    let opt = {
        page: 'categories',
        user: req.user
    };
    Categorie.getCategories((err, data) => {
        if (err) {
            console.log(err);
        } else {
            opt.categories = data;
            res.render('admin/categories', opt);
        }
    });

});

router.get('/addcategorie', adminUser.checkAuth, (req, res) => {
    let opt = {
        page: 'addcategorie',
        user: req.user
    };
    res.render('admin/addcategorie', opt);
});

router.get('/movies', adminUser.checkAuth, (req, res) => {
    let opt = {
        page: 'movies',
        user: req.user
    };
    res.render('admin/movies', opt);
});

router.get('/addmovie', adminUser.checkAuth, (req, res) => {
    let opt = {
        page: 'addmovie',
        user: req.user
    };
    res.render('admin/addmovie', opt);
});

router.get('/directors', adminUser.checkAuth, (req, res) => {
    let opt = {
        page: 'directors',
        user: req.user
    };
    Directors.getDirectors((err,data)=>{
        if(err){
            console.log(err);
        }else{
            opt.directors = data;
            res.render('admin/directors', opt);
        }
    });
});

router.get('/adddirector', adminUser.checkAuth, (req, res) => {
    let opt = {
        page: 'adddirector',
        user: req.user
    };
    res.render('admin/adddirector', opt);
});

router.get('/editdirector/:id',adminUser.checkAuth,(req,res)=>{
    let opt = {
        page: 'editdirector',
        user: req.user
    };
    let id = req.params.id ? req.params.id : null;
    Directors.getDirectorById(id,(err, data) => {
        if(err){
            console.log(err);
        }else{
            opt.director = data;
            res.render('admin/adddirector', opt);
        }
    });

})

router.get('/actors', adminUser.checkAuth, (req, res) => {
    let opt = {
        page: 'actors',
        user: req.user
    };
    Actors.getActors((err,data)=>{
      if(err){
        console.log(err);
      }else{
        opt.actors = data;
        res.render('admin/actors', opt);
      }
    });

});

router.get('/addactor', adminUser.checkAuth, (req, res) => {
    let opt = {
        page: 'addactor',
        user: req.user
    };
    res.render('admin/addactor', opt);
});


router.get('/logout', adminUser.logOut);

// post requests
router.post('/login', adminUser.login);
router.post('/addcategorie', adminUser.checkAuth, Categorie.addCategorie);

router.post('/adddirector', adminUser.checkAuth, (req,res,next)=>{
  Directors.addDirector(req,res,next);
});

router.post('/addactor', adminUser.checkAuth, Actors.AddActor);

router.post('/editdirector',adminUser.checkAuth,(req,res,next)=>{
  Directors.editDirector(req,res,next);
});

//put requests
router.put('/removediravatar',adminUser.checkAuth,(req,res)=>{
  Directors.deleteAvatar(req.body,(err)=>{
    if(err){
      console.log(err);
    }else{
      res.json({success: true, id: req.body.id});
    }
  });
});

//delete requests
router.delete('/deldirector',adminUser.checkAuth,(req,res)=>{
  Directors.deleteDirector(req.body,(err)=>{
    if(err){
      console.log(err);
    }else{
      res.json({success: true});
    }
  });
})


module.exports = router;
