const express = require('express');
const router = express.Router();

// todo REST Api Home Page
router.get('/', function (req, res) {
  // res.send('Hello World');
  res.render('index', {
    title: 'My Express App',
    message: 'Hello',
  });
});

module.exports = router;
