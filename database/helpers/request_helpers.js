var db = require('../config');
var User = require('../models/users');
var Analysis = require('../models/analyses');
var AnalysisTrait = require('../models/analyses_traits');
var crypto = require('crypto');

var sessions = {};

// var checkIfUserIsLoggedin = function(session) {
// 	if (!session) {
// 		return false;
// 	} else {
// 		if (sessions[session.username] === session.sessionID) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	}
// };


module.exports = {
	loginUser: function(req, res) {
		username = req.body.username;
		password = req.body.password;
		//var boolean = checkIfUserIsLoggedin(req.cookies.session);
		// if (boolean) {
		// 	res.send('you\'re already logged in');
		// } else {
			User.findOne({username: username})
			.exec(function(err, user) {
				if (err) {
					console.log('there was an error in looking up the username in the database', err);
					res.send(err);
				} else if (user) {
					if (User.comparePassword(password, user.salt, user.password)) {
						//send a response that the user has successfully logged in
						//create a new session for the user
						crypto.randomBytes(40, function(err, session) {
							if (err) {
								console.log(err);
							} else {
								var newSession = {
									username: username,
									sessionID: session.toString()
								}
								res.cookie('session', newSession);
								sessions[username] = newSession.sessionID;
								res.send('you are successfully logged in');
							}
						})
					} else {
						console.log('attempted password does not equal actual password');
						res.send('login in failed');
					}
				} else {
					res.send('login failed');
				}
			})
		// }
	},

	signup: function(req, res) {
		username = req.body.username;
		email = req.body.email;
		password = req.body.password;

		// if (checkIfUserIsLoggedin(req.cookies.session)) {
		// 	res.send('you are already logged in!');
		// } else {
			if (validateEmail(email)) {
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
			} else {
				res.send('not a valid email address');
			}
		// }
	},

	findAllDataFromAnAnalysis: function(req, res) {
	  var routeLength = '/analyze/'.length
	  var url = req.url.slice(routeLength);
	  console.log(url)
	  Analysis.findOne({_id: url})
	  .exec(function(err, analysis) {
	    if (err) {
	      console.log('error1 there was an error looking up your analysis', err)
	    } else if (analysis) {
	    	//response is the bundle of data that will be sent back
	    	//formatting the way the sample data is formatted
	      var response = {
	      	name: analysis.person,
	      	context: analysis.context,
	      	word_count: analysis.word_count,
	      	user_id: analysis.user_id
	      };

	      //use the id of the analysis to query for all rows of the analyses_traits table 
	      AnalysisTrait.find({analysis_id: url})
	      .exec(function(err, analysisTraits) {
	      	if (err) {
	      		console.log('error2 there was an error looking up the analysisTrait', err);
	    		// res.send('No analysis found.');
	      	
	      	} else {
	      		response.traits = analysisTraits.slice();
	      		res.send(JSON.stringify(response));
	      	}
	      });
	    } else {
	    	res.send('No analysis found.');
	    }
	  });
	},

	logoutUser: function(req, res) {
		req.session.destroy(function() {
		    cookie = req.cookies;
			for (var prop in cookie) {
	    		if (!cookie.hasOwnProperty(prop)) {
	        		continue;
	    		}    
	    		res.cookie(prop, '', {expires: new Date(0)});
	    	}
			res.redirect('/');
		}
	)},

	getPublicAnalyses: function(req, res) {
		Analysis.find({context: 'global'}, function(err, publicArray) {
			if (err) { res.status(500).send('Databases failed to query'); }
			console.log(publicArray);
			res.send(JSON.stringify(publicArray));
		});
	},

	checkIfUserIsLoggedin: function(session) {
		if (!session) {
			return false;
		} else {
			if (sessions[session.username] === session.sessionID) {
				return true;
			} else {
				return false;
			}
		}
	}

}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
