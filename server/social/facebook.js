var API = require('./API_KEYS.js');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: API.facebookID,
    clientSecret: API.facebookSecret,
    callbackURL: 'http://localhost:3000/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('ACCESS: ', accessToken);
    console.log('REFRESH: ', refreshToken);
    console.log('PROFILE: ', profile);
    return cb(null, profile);
  }
));

//TODO: 
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.

passport.serializeUser(function(user, cb) {
  console.log(user);
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  console.log(obj);
  cb(null, obj);
});

module.exports.toAuth = passport.authenticate('facebook');
module.exports.afterAuth = passport.authenticate('facebook', { failureRedirect: '/'});
module.exports.toAnalysis = function(req, res) {
  res.redirect('/facebookProfile');
}

module.exports.renderTest = function(req, res) {
  res.render('testProfile', { user: req.user });
};
