

var db = require('../config');
var User = require('../models/users');
var Analysis = require('../models/analyses');
var Trait = require('../models/traits');
var AnalysisTrait = require('../models/analyses_traits');

module.exports = {
	loginUser: function(req, res) {
		username = req.body.username;
		password = req.body.password;

		User.findOne({username: username})
		.exec(function(err, user) {
			if (err) {
				console.log('there was an error in looking up the username in the database', err);
				res.send(err);
			} else {
				if (User.comparePassword(password, user.salt, user.password)) {
					//send a response that the user has successfully logged in
					//create a new session for the user
					res.send('you are successfully logged in');
				} else {
					console.log('attempted password does not equal actual password');
					res.send('login in failed');
				}
			}
		})
	},

	signup: function(req, res) {
		username = req.body.username;
		email = req.body.email;
		password = req.body.password;

		User.findOne({username: username})
		.exec(function(err, user) {
			if(!user) {
				var newUser = new User({
					username: username,
					password: password, //password should automatically hash on save
					email: email,
					salt: undefined //salt should be automatically generated on save
				});
				newUser.save(function(err, newUser) {
					if (err) {
						console.log('there was an error in creating a new user', err);
						res.send(err);
					} else {
						//need to create a new session for the new user
						res.send('account created')
					}
				})
			} else {
				//account already exists redirect them back to the login page
				res.send('user already exists');
				//res.redirect('whatever the login route is');
			}
		})
	},

	checkIfAnalysisExists: function(req, res) {
		//pull the person and the context out of the req
			//check if there is an analysis for the person and the context
				//if so pull all relavent data and send 
	}

}