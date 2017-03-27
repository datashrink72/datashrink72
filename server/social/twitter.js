var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var Twitter = require('twitter');
// var API = require('./API_KEYS.js');

var API = {
  twitterKey: process.env.S1_KEY,
  twitterSecret: process.env.S1_SECRET
}

var client = new Twitter({
  consumer_key: API.twitterKey,
  consumer_secret: API.twitterSecret,
  access_token_key: '845032805713141761-uugr3b0pI4Pskn6RbfJoIRloUAUzzEg',
  access_token_secret: 'qoQMqmYrTktGUhKR9WIfHb61JCqZH9Yx2b5DV4RyeOcju'
});

passport.use(new Strategy({
    consumerKey: API.twitterKey,
    consumerSecret: API.twitterSecret,
    callbackURL: 'https://datashrink72.herokuapp.com/twitter/return'
  },
  function(token, tokenSecret, profile, cb) {
    console.log(token, ' ', tokenSecret);
    client = populateClient(token, tokenSecret, profile.username);
    analyzeProfile(console.log);

    return cb(null, profile);
  })
);

var populateClient = (token, tokenSecret, username) => {
  var client = new Twitter({
    consumer_key: API.twitterKey,
    consumer_secret: API.twitterSecret,
    access_token_key: token,
    access_token_secret: tokenSecret
  });

  client.username = username;

  return client;
};

var analyzeProfile = (username) => {
  return new Promise(function(resolve, reject) {
    username = username || client.username;
    var params = {
      screen_name: username,
      count: 200,
      exclude_replies: true
    };

    var tweetStrings = [];
    client.get('/statuses/user_timeline.json', 
      params, function(err, tweets, res) {
        if (err) reject(err);
        else {
          tweets.forEach(function(tweet) {
            tweetStrings.push(tweet.text);
          });
          tweetStrings = tweetStrings.join(' ');
          resolve(JSON.stringify(tweetStrings));
        }
    });
  })
}

var testAnalysis = (req, res) => {
  var length = '/twitterProfile/'.length;
  var user = req.url.slice(length);
  analyzeProfile(function(tweets) {
    res.send(JSON.stringify(tweets));
  }, user);
}

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports.toAuth = passport.authenticate('twitter');
module.exports.fromAuth = passport.authenticate('twitter', { failureRedirect: '/'});
module.exports.analyzeProfile = analyzeProfile;
module.exports.testAnalysis = testAnalysis;
module.exports.toAnalysis = function(req, res, next) {
  req.body = {
    name: '@' + req.user.username,
    context: 'twitter',
    private: true
  };
  next();
};

module.exports.renderTest = function(req, res) {
  res.render('testProfile', { user: req.user });
};

