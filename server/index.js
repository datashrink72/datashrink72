var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var watsonHelpers = require('./watson/watson-helpers');
var passport = require('passport');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn();
var tw = require('./social/twitter.js');
var db = require('../database/config');
var dbHelpers = require('../database/helpers/request_helpers');
var path = require('path')
var secret = require('./secrets');
//-------------------------------------------------------------//

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.set('view engine', 'ejs');

app.use(cookieParser(secret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret: secret, resave: true, saveUnitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

/**********************/
/**** SOCIAL MEDIA ****/
/**********************/

app.get('/twitter', tw.toAuth);
app.get('/twitter/return', tw.fromAuth, tw.toAnalysis, 
  watsonHelpers.analyzeProfile);
app.get('/twitterProfile/*', tw.testAnalysis);

/****************/
/**** WATSON ****/
/****************/

app.post('/analysis', watsonHelpers.analyzeProfile);

/****************/
/**** NATIVE ****/
/****************/

app.get('/hasSession', dbHelpers.hasSession);
app.post('/signup', dbHelpers.signup);
app.post('/login', dbHelpers.loginUser);     
app.get('/logout', dbHelpers.logoutUser);  
app.get('/analyze/*', dbHelpers.findAllDataFromAnAnalysis); 
app.get('/publicanalyses', dbHelpers.getPublicAnalyses);
app.get('/useranalyses', dbHelpers.getUserAnalyses);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port 3000.');
});
