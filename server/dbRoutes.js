var express = require('express');

var db = require('../database/config');
var dbHelpers = require('../database/helpers/request_helpers');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello world');
});

app.post('/signup', function(req, res) {
	dbHelpers.signup(req, res);
});

app.get('/login', function(req, res) {
	req.body = {};
	req.body.username = 'theBest';
	req.body.password = 'piano';
	dbHelpers.loginUser(req, res);	
})	


module.exports = app;