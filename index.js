const config = require('config');
const debug = require('debug')('app:startup');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
// Custom Imports
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// todo Pug for generating HTML Markup for Client
app.set('view engine', 'pug');
app.set('views', './views'); // default

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));

  debug('Morgan enabled...'); // console.log()
}

// Configuration
// console.log('Application name : ' + config.get('name'));
// console.log('Mail server : ' + config.get('mail.host'));

// todo Custom middle ware
// app.use(logger);

// app.use(function (req, res, next) {
//   console.log('Authentication');

//   next();
// });

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Listening on PORT ${port}...`);
});
