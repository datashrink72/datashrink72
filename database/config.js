var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/datashrink72');

var db = mongoose.connection;

db.on('error', function(error) {
	console.log('there was an error with the database: ', error);
})

db.once('open', function(status) {
	console.log('the connection to mongodb was successful');
})

module.exports = db;