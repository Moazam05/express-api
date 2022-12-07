const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
// Custom Imports
const logger = require('./logger');

const courses = [
  { id: 1, name: 'courses 1' },
  { id: 2, name: 'courses 2' },
  { id: 3, name: 'courses 3' },
];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));

app.use(logger);

app.use(function (req, res, next) {
  console.log('Authentication');

  next();
});

// todo REST Api Home Page
app.get('/', function (req, res) {
  res.send('Hello World');
});

// todo Getting all courses
app.get('/api/courses', function (req, res) {
  res.send(courses);
});

// todo Create new Course
app.post('/api/courses', function (req, res) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);

  if (result.error)
    // 400 Bad Request
    return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

// todo Getting Single Course
// /api/courses/1
app.get('/api/courses/:id', function (req, res) {
  const course = courses.find((c) => c.id === +req.params.id);

  if (!course)
    return res.status(404).send('The course with the given ID was not found.');

  res.send(course);
});

// todo Update Single Course
app.put('/api/courses/:id', function (req, res) {
  // Look up the course
  const course = courses.find((c) => c.id === +req.params.id);

  // If not existing, return 404
  if (!course)
    return res.status(404).send('The course with the given ID was not found.');

  // Validate
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);

  // If invalid, return 400 - Bad request
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  // Update course
  course.name = req.body.name;

  // Return the update course
  res.send(course);
});

// todo Delete Course
app.delete('/api/courses/:id', function (req, res) {
  // Look up the course
  const course = courses.find((c) => c.id === +req.params.id);

  // Not existing, return 404
  if (!course)
    return res.status(400).send('The course with the given ID was not found.');

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Return the same course
  res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Listening on PORT ${port}...`);
});
