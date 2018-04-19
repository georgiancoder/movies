const express = require('express')
const path = require('path')
const config = require('./config');
const mainRouter = require('./routes/main');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

mongoose.connect(config.mongo);

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/',mainRouter);
 
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
