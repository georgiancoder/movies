const directors = require('../models/directors');
var multer = require('multer');
const { check, validationResult } = require('express-validator/check');
const path = require('path');
const fs = require('fs');

class directorsController {
    addDirector(req, res) {
        this.uploadAvatar(req,res,(err)=>{
          if (err) {
              res.json(err);
          } else {
              if (req.file) {
                  req.body.avatar = '/uploads/directors/' + req.file.filename;
              } else {
                  req.body.avatar = '';
              }
              const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
                  return `${location}[${param}]: ${msg}`;
              };
              req.checkBody('name', 'name required').notEmpty();
              req.checkBody('lastname', 'lastname required').notEmpty();
              req.checkBody('url', 'url must be specified').notEmpty();
              const result = validationResult(req).formatWith(errorFormatter);
              if (!result.isEmpty()) {
                  // { errors: [ "body[password]: must be at least 10 chars long" ] }
                  return res.json({ errors: result.array() });
              } else {
                  directors.addDirector(req.body, (err, data) => {
                    if(err){
                      console.log(err);
                    }else{
                      res.redirect('/admin/adddirector');
                    }
                  });
              }
          }
        });
    }

    editDirector(req,res){
      this.uploadAvatar(req,res,(err)=>{
        if (err) {
            res.json(err);
        } else {
            if (req.file) {
                req.body.avatar = '/uploads/directors/' + req.file.filename;
            } else {
                req.body.avatar = '';
            }
            const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
                return `${location}[${param}]: ${msg}`;
            };
            req.checkBody('id','id must me required').notEmpty();
            req.checkBody('name', 'name required').notEmpty();
            req.checkBody('lastname', 'lastname required').notEmpty();
            req.checkBody('url', 'url must be specified').notEmpty();
            const result = validationResult(req).formatWith(errorFormatter);
            if (!result.isEmpty()) {
                // { errors: [ "body[password]: must be at least 10 chars long" ] }
                return res.json({ errors: result.array() });
            } else {
                directors.editDirector(req.body,(err,data)=>{
                  if(err){
                    console.log(err);
                  }else{
                    res.redirect(`/admin/editdirector/${data._id}`);
                  }
                });
            }
        }
      });
    }

    uploadAvatar(req,res,cb){
      let dir = './public/uploads/directors';
      if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
      }
      let storage = multer.diskStorage({
          destination: function(req, file, callback) {
              callback(null, dir);
          },
          filename: function(req, file, callback) {
              callback(null, file.fieldname + '-' + Date.now() + file.originalname);
          }
      });

      let upload = multer({
          storage: storage,
          limits: { fileSize: 2 * 1024 * 1024 },
          fileFilter: function(req, file, cb) {
              if (path.extname(file.originalname) !== ".png" && path.extname(file.originalname) !== ".jpg" && path.extname(file.originalname) !== ".jpeg") {
                  return cb(new Error('only png or jpg'));
              }

              cb(null, true);
          }
      }).single('avatar');

      upload(req, res, (err) => {
        cb(err);
      });

    }

    getDirectorPageData(id,cb){
      if(id){
        directors.getDirectorPageData(id,cb);
      }
    }

    getDirectors(cb){
        directors.getDirectors(cb);
    }

    getDirectorById(id,cb){
        directors.getDirectorById(id,cb);
    }

    deleteAvatar(data,cb){
      if(data && data.id){
        directors.deleteAvatar(data.id,(err,data)=>{
          if(err){
            console.log(err);
          }else{
            if(data.avatar.length > 0 &&  fs.existsSync(`public${data.avatar}`)){
              fs.unlink(`public${data.avatar}`,cb);
            }else{
              cb(null);
            }
          }
        });
      }else{
        console.log('no data to delete');
      }
    }

    deleteDirector(data,cb){
      if(data && data.id){
        directors.removeDirector(data.id,(err,director)=>{
          if(err){
            console.log(err);
          }else {
            if(director.avatar.length > 0 && fs.existsSync(`public${director.avatar}`)){
              fs.unlink(`public${director.avatar}`,cb);
            }else{
              cb(null);
            }

          }
        });
      }
    }
}

module.exports = directorsController;
