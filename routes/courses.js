const express = require('express');
const Joi = require('joi');

const router = express.Router();

const courses = [
  { id: 1, name: 'courses 1' },
  { id: 2, name: 'courses 2' },
  { id: 3, name: 'courses 3' },
];

// todo Getting all courses
router.get('/', function (req, res) {
  res.send(courses);
});

// todo Create new Course
router.post('/', function (req, res) {
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
router.get('/:id', function (req, res) {
  const course = courses.find((c) => c.id === +req.params.id);

  if (!course)
    return res.status(404).send('The course with the given ID was not found.');

  res.send(course);
});

// todo Update Single Course
router.put('/:id', function (req, res) {
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
router.delete('/:id', function (req, res) {
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

module.exports = router;
