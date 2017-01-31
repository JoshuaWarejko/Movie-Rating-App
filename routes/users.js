var express = require('express');
var router = express.Router();
var rootDir = require('app-root-path').path;
var User = require(rootDir + '/models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST /register
router.post('/register', function(req,res,next) {
	if (req.body.email && req.body.password && req.body.confirmPassword) {
		// Confirm that user typed same password twice
		if(req.body.password !== req.body.confirmPassword) {
			return res.status(400).send("Passwords do not match");
		}
		// create object with form input
		var userData = {
			email: req.body.email,
			password: req.body.password
		};
		// use schema's create method to insert document into Mongo
		User.create(userData, function(error, user) {
			if(error) {
				return next(error);
			} else {
				res.json({success: true, user: user});
			}
		});

	} else {
		return res.status(400).send("All fields required");
	}
});

/* GET users by id. */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id).exec(function(err, user) {
  	if(err) return next(err);
  	console.log(user);
  	return res.json({id: user._id, email: user.email});
  });
});

// POST /login
router.post('/login', function(req,res,next) {
	if(req.body.email && req.body.password) {
		User.authenticate(req.body.email, req.body.password, function(error, user) {
			if(error || !user) {
				return res.status(401).send("Wrong email or password");
			} else {
				req.session.user = user;
				console.log("The user: ", user);
				return res.json({ id: user._id, email: user.email });
			}
		});
	} else {
		return res.status(401).send("Email and password are required");
	}
});

router.post('/refresh', function(req, res, next) {
	if (req.session.user) {
		res.json({id: req.session.user._id, email: req.session.user.email});
	} else {
		res.status(401).json({error: 'Not Authenticated'});
	}
});

router.post('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
		if(err) return next(err);
		res.json({message: "Successfully destroyed session"});
	});
});

module.exports = router;
