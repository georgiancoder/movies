const directors = require('../models/directors');
var multer = require('multer');
const { check, validationResult } = require('express-validator/check');
const path = require('path');
const fs = require('fs');


class directorsController {
    addDirector(req, res) {
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
        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            // Build your resulting errors however you want! String, object, whatever - it works!
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
                    req.body.avatar = '/uploads/directors/' + req.file.filename;
                } else {
                    req.body.avatar = '';
                }

                req.checkBody('name', 'name required').notEmpty();
                req.checkBody('lastname', 'lastname required').notEmpty();
                req.checkBody('url', 'url must be specified').notEmpty();
                const result = validationResult(req).formatWith(errorFormatter);
                if (!result.isEmpty()) {
                    // { errors: [ "body[password]: must be at least 10 chars long" ] }
                    return res.json({ errors: result.array() });
                } else {
                    directors.addDirector(req.body, (err, data) => {
                        res.redirect('/admin/adddirector');
                    });
                }
            }
        });

    }
}

module.exports = directorsController;