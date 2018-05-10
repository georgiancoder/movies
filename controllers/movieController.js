const movie = require('../models/movie');
var multer = require('multer');
const { check, validationResult } = require('express-validator/check');
const path = require('path');
const fs = require('fs');

class MovieController {
    addMovie(req, res) {
        this.uploadPoster(req, res, (err) => {
            if (err) {
                res.json(err);
            } else {
                if (req.files) {
                    req.files.forEach(file => {
                        req.body[file.fieldname] = `/uploads/movies/${file.filename}`;
                    });
                }
                const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
                    return `${location}[${param}]: ${msg}`;
                };
                req.checkBody('title', 'movie title is required').notEmpty();
                req.checkBody('movie', 'movie url is required').notEmpty();
                const result = validationResult(req).formatWith(errorFormatter);
                if (!result.isEmpty()) {
                    // { errors: [ "body[password]: must be at least 10 chars long" ] }
                    return res.json({ errors: result.array() });
                } else {
                    movie.addNewMovie(req.body, (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('/admin/addmovie');
                        }
                    });
                }
            }
        })
    }

    uploadPoster(req, res, cb) {
        let dir = './public/uploads/movies';
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
            limits: { fileSize: 15 * 1024 * 1024 },
            fileFilter: function(req, file, cb) {
                if (path.extname(file.originalname) !== ".png" && path.extname(file.originalname) !== ".jpg" && path.extname(file.originalname) !== ".jpeg" && path.extname(file.originalname) !== ".vtt") {
                    return cb(new Error('only png or jpg'));
                }

                cb(null, true);
            }
        }).any();

        upload(req, res, (err) => {
            cb(err);
        });
    }

    getMovies(cb) {
        movie.getMovies(cb);
    }

    deleteMovie(req, res) {
        if (req.body.id) {
            movie.deleteMovie(req.body.id, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    if (data.poster && data.poster.length > 0 && fs.existsSync(`public${data.poster}`)) {
                        fs.unlinkSync(`public${data.poster}`, );
                    }
                    if (data.subTitles && data.subTitles.en && data.subTitles.en.length > 0 && fs.existsSync(`public${data.subTitles.en}`)) {
                        fs.unlinkSync(`public${data.subTitles.en}`);
                    }
                    if (data.subTitles && data.subTitles.ka && data.subTitles.ka.length > 0 && fs.existsSync(`public${data.subTitles.ka}`)) {
                        fs.unlinkSync(`public${data.subTitles.ka}`);
                    }
                    if (data.subTitles && data.subTitles.ru && data.subTitles.ru.length > 0 && fs.existsSync(`public${data.subTitles.ru}`)) {
                        fs.unlinkSync(`public${data.subTitles.ru}`);
                    }
                    res.json({ success: true });
                }
            });
        }
    }

    deletePoster(id, cb) {
        if (id) {
            movie.updatePoster(id,(err,data)=>{
                if (err) {
                    console.log(err);
                } else {
                    if (data.poster.length > 0 && fs.existsSync(`public${data.poster}`)) {
                        fs.unlink(`public${data.poster}`, cb);
                    } else {
                        cb(null);
                    }
                }
            });
        } else {
            console.log('no data to delete');
        }
    }

    deleteSubtitle(data,cb){
        if(data && data.id && data.lng){
            movie.updateSubTitle(data,(err,movie)=>{
                if(err){
                    console.log(err);
                } else {
                    console.log(movie);
                    if (movie.subTitles[data.lng].length > 0 && fs.existsSync(`public${movie.subTitles[data.lng]}`)) {
                        fs.unlink(`public${movie.subTitles[data.lng]}`, cb);
                    } else {
                        cb(null);
                    }
                }
            });
        } else {
            console.log('no data to delete');
        }
    }

    getMovieById(id, cb) {
        movie.getMovieById(id, cb);
    }

    editMovie(req,res){
      this.uploadPoster(req, res, (err) => {
          if (err) {
              res.json(err);
          } else {
              if (req.files) {
                  req.files.forEach(file => {
                      req.body[file.fieldname] = `/uploads/movies/${file.filename}`;
                  });
              }
              const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
                  return `${location}[${param}]: ${msg}`;
              };
              req.checkBody('id', 'movie id is required').notEmpty();
              req.checkBody('title', 'movie title is required').notEmpty();
              req.checkBody('movie', 'movie url is required').notEmpty();
              const result = validationResult(req).formatWith(errorFormatter);
              if (!result.isEmpty()) {
                  // { errors: [ "body[password]: must be at least 10 chars long" ] }
                  return res.json({ errors: result.array() });
              } else {
                 movie.updateMovie(req.body,(err,data)=>{
                   if(err) {
                     console.log(err);
                   } else {
                     res.redirect(`/admin/editmovie/${data._id}`);
                   }
                 });
              }
          }
      })
    }

}

module.exports = new MovieController();
