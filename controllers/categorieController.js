const categorie = require('../models/categories');

class Categorie {
  addCategorie(req,res){
    if(req.isAuthenticated()){
      req.checkBody('title','title is required').notEmpty();
      req.getValidationResult().then(result =>{
        if(!result.isEmpty()){
          res.json(result.array());
        }else{
          categorie.addNewCategorie(req.body,(err,data)=>{
            if(err) {
              console.log(err);
            }else{
              res.redirect('/admin/addcategorie');
            }
          });
        }
      })
    }
  }

  getCategories(cb){
    categorie.getCategories(cb);
  }

  removeCategory(req,res){
    req.checkBody('id','id is required').notEmpty();
    req.getValidationResult().then(result =>{
        if(!result.isEmpty()){
          res.json(result.array());
        }else{
          categorie.removeCategorie(req.body.id,(err,cat)=>{
            if(err){
              console.log(err);
            }else{
              res.json({success: true});
            }
          });
        }
      })
  }
}

module.exports = Categorie;
