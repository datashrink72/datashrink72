var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var API = require('./API_KEYS.js');
var passport = require('passport');
var ensureLogIn = require('connect-ensure-login');
var FacebookStrat = require('passport-facebook').Strategy;
var TwitterStrat = require('passport-twitter').Strategy;
var personalityHelper = require('./watson/personality-insights');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.set('view engine', 'ejs');

passport.use(new FacebookStrat({
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

passport.use(new TwitterStrat({
    consumerKey: API.twitterKey,
    consumerSecret: API.twitterSecret,
    callbackURL: 'http://127.0.0.1:3000/twitter/return'
  },
  function(token, tokenSecret, profile, cb) {
    console.log('TOKEN: ', token);
    console.log('SECRET: ', tokenSecret);
    console.log('PROFILE: ', profile);

    return cb(null, profile);
  }));

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
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret: 'keyboard cat', resave: true, saveUnitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  res.send('Hello world');
});

app.get('/facebook', passport.authenticate('facebook'));

app.get('/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/'}),
  function(req, res) {
    // TODO: redirect to data analysis - test page for now
    res.redirect('/facebookProfile');
  });

app.get('/facebookProfile', 
  ensureLogIn.ensureLoggedIn(),
  function(req, res) {
    res.render('testProfile', { user: req.user });
  });

app.get('/twitter', passport.authenticate('twitter'));

app.get('/twitter/return', 
  passport.authenticate('twitter', { failureRedirect: '/'}),
  function(req, res) {
    // TODO: redirect to data analysis
    res.redirect('/twitterProfile');
  });

app.get('/twitterProfile',
  ensureLogIn.ensureLoggedIn(),
  function(req, res) {
    res.render('testProfile', { user: req.user });
  });

// get request for testing purposes
app.get('/analysis/text', function(req, res, next) {
// app.post('/analysis/text', function(req, res, next) {
  var params = {
    text: require('./watson/speech'), // example text
    // all of the following settings can be turned on for json:
    // content_items: require('./profile.json').contentItems,
    // consumption_preferences: true,
    // raw_scores: true,
    headers: {
      // 'accept-language': 'en',
      // 'accept': 'application/json'
      'Content-type': 'text/plain'
    }
  };

  personalityHelper.profileFromText(params)
    .then(res.json.bind(res))
    .catch(next);
});


app.get('/*', function(req, res) {
  url = req.url.slice(1);
  //anticipating the url to be the id of an analysis that we can query the database for
  db.findOne({_id: url})
  .exec(function(err, analysis) {
    if (err) {
      console.log('there was an error looking up your analysis', err)
    } else {
      //use the id of the analysis to query for all rows of the analyses_traits table
        //then use the analyses_traits ids to look up all traits from the traits table
    }
  })
  res.send('hello world');
})

app.listen(3000, function() {
  console.log('Listening on port 3000.');
});
