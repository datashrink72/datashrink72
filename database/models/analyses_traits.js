var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
var Analysis = require('./analyses.js');

var AnalysesTraitsSchema = mongoose.Schema({
	analysis_id: String,
  trait_id: String,
  name: String,
  category: String,
	percentile: SchemaTypes.Double,
  raw_score: SchemaTypes.Double
});

var AnalysisTrait = mongoose.model('AnalysisTrait', AnalysesTraitsSchema);

AnalysisTrait.populateTestData = function(sampledata) {
  // Find matching analysis id
  Analysis.findOne({person: sampledata.name}, function(err, found) {
    if (err) { console.error(err); }
    if (found) {
      var  analysisId = found._id;
      // Ensure that test data hasnot been populated yet
      AnalysisTrait.findOne({analysis_id: analysisId}, function(err, found) {
        if (err) { console.error(err); }
        if (!found) {
          for (var i = 0; i < sampledata.traits.length; i++) {
            var newTrait = new AnalysisTrait({
              analysis_id: analysisId,
              trait_id: sampledata.traits[i].trait_id,
              name: sampledata.traits[i].name,
              category: sampledata.traits[i].category,
              percentile: sampledata.traits[i].percentile,
              raw_score: sampledata.traits[i].raw_score
            });
            newTrait.save(function(err, newTrait) {
              if (err) { console.error(err); }
            });
          }
        }
      });
    }
  });
};

module.exports = AnalysisTrait;