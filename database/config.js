var mongoose = require('mongoose');
var sampledata = require('./sampledata.js');
var Analysis = require('./models/analyses.js');
var User = require('./models/users.js');
var AnalysisTrait = require('./models/analyses_traits.js');

dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/datashrink72';

mongoose.connect(dbUrl);

var db = mongoose.connection;

db.on('error', function(error) {
	console.log('there was an error with the database: ', error);
})

db.once('open', function(status) {
	console.log('the connection to mongodb was successful', dbUrl);
  User.populateTestData();
  Analysis.populateTestData(sampledata[0]);
  Analysis.populateTestData(sampledata[1]);
  Analysis.populateTestData(sampledata[2]);
  // Ensure that the analysis has been added before
  // Querying for analysis id to associate with the
  // analysis
  setTimeout(function() {
    AnalysisTrait.populateTestData(sampledata[0]);
    AnalysisTrait.populateTestData(sampledata[1]);
    AnalysisTrait.populateTestData(sampledata[2]);
  }, 2000);
});

module.exports = db;