const express = require('express')
const path = require('path')
const config = require('./config');
const mainRouter = require('./routes/main');
const adminRouter = require('./routes/admin');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(config.mongo);

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/',mainRouter);
app.use('/admin',adminRouter);
 
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
