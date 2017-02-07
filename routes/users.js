var express = require('express');
var router = express.Router();
var rootDir = require('app-root-path').path;
var User = require(rootDir + '/models/user');

// GET / used for retrieving all users
router.get('/', function(req, res, next) {
  User.find({}).exec(function(err, users) {
  	if(err) return next(err);
  	res.json(users);
  });
});

// POST /register
router.post('/register', function(req,res,next) {
	console.log(req.body);
	if (req.body.firstName && req.body.lastName && req.body.email && req.body.password && req.body.confirmPassword) {
		// Confirm that user typed same password twice
		if(req.body.password !== req.body.confirmPassword) {
			return res.status(400).send("Passwords do not match");
		}
		// create object with form input
		var userData = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password
		};
		// use schema's create method to insert document into Mongo
		User.create(userData, function(error, user) {
			if(error) {
				return next(error);
			} else {
				req.session.user = user;
				res.json({
					success: true, 
					data: {
						id: user._id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email
					} 
				});
			}
		});

	} else {
		return res.status(400).send("All fields required");
	}
});

// GET /id used for getting users by id
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
				return res.json({
					id: user._id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email
				});
			}
		});
	} else {
		return res.status(401).send("Email and password are required");
	}
});

// POST on /refresh used for getting user after page reloads
router.post('/refresh', function(req, res, next) {
	if (req.session.user) {
		res.json({id: req.session.user._id, email: req.session.user.email, firstName: req.session.user.firstName, lastName: req.session.user.lastName});
	} else {
		res.status(401).json({error: 'Not Authenticated'});
	}
});

// POST /logout
router.post('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
		if(err) return next(err);
		res.json({message: "Successfully destroyed session"});
	});
});

module.exports = router;
