var db = require('../config');
var mongoose = require('mongoose');

var AnalysesTraitsSchema = mongoose.Schema({
	id: Number,
	analyses_id: Number,
	traits_id: Number,
	raw_score: Number,
	percentile: Number
});

var analysis_trait = mongoose.model('analysis_trait', AnalysesTraitsSchema);

module.exports = analysis_trait;