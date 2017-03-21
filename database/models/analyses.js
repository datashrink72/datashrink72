var db = require('../config');
var mongoose = require('mongoose');

var AnalysesSchema = mongoose.Schema({
	person: String,
	context: String,
  word_count: Number,
	user_id: String
})

var analysis = mongoose.model('analysis', AnalysesSchema);



module.exports = analysis;