var db = require('../config');
var mongoose = require('mongoose');

var AnalysesSchema = mongoose.schema({
	id: Number,
	person: String,
	context: String,
	user_id: Number
})

var analysis = mongoose.model('analysis', AnalysesSchema);

module.exports = analysis;