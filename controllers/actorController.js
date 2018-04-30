const actors = require('../models/actors');
var multer = require('multer');
const { check, validationResult } = require('express-validator/check');
const path = require('path');
const fs = require('fs');

class ActorController {
  AddActor(req,res){
    let dir = './public/uploads/actors';
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
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return `${location}[${param}]: ${msg}`;
    };

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
        if (err) {
            res.json(err);
        } else {
            if (req.file) {
                req.body.avatar = '/uploads/actors/' + req.file.filename;
            } else {
                req.body.avatar = '';
            }

            req.checkBody('name', 'name required').notEmpty();
            req.checkBody('lastname', 'lastname required').notEmpty();
            const result = validationResult(req).formatWith(errorFormatter);
            if (!result.isEmpty()) {
                // { errors: [ "body[password]: must be at least 10 chars long" ] }
                return res.json({ errors: result.array() });
            } else {
                actors.addActor(req.body, (err, data) => {
                    if(err){
                      console.log(err);
                    }else{
                      res.redirect('/admin/addactor');
                    }
                });
            }
        }
    });
  }
  getActors(cb){
    actors.getAllActor(cb);
  }
}

module.exports = ActorController;