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

module.exports = router;
