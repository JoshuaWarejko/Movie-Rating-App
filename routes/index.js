var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Movie Rating App',
    env: req.app.get('env')
  });
});

router.get('/login', function(req, res, next) {
  res.render('index', {
  	title: 'Login | Movie Rating App',
    env: req.app.get('env')
  });
});

router.get('/profile', function(req, res, next) {
  res.render('index', {
    title: 'Profile | Movie Rating App',
    env: req.app.get('env')
  });
});

router.get('/register', function(req, res, next) {
  res.render('index', {
  	title: 'Register | Movie Rating App',
    env: req.app.get('env')
  });
});

router.get('/movies', function(req, res, next) {
  res.render('index', {
    title: 'Movies | Movie Rating App',
    env: req.app.get('env')
  });
});

router.get('/movies/:movieId', function(req, res, next) {
  res.render('index', {
    title: 'Movie | Movie Rating App',
    env: req.app.get('env')
  });
});

router.get('/person', function(req, res, next) {
  res.render('index', {
    title: 'Person | Movie Rating App',
    env: req.app.get('env')
  });
});

router.get('/person/:personId', function(req, res, next) {
  res.render('index', {
    title: 'Person | Movie Rating App',
    env: req.app.get('env')
  });
});

module.exports = router;
