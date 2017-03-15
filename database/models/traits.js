var db = require('../config');
var mongoose = require('mongoose');

var TraitsSchema = mongoose.Schema({
	id: Number,
	name: String,
	category: String
})

var trait = mongoose.model('trait', TraitsSchema);

module.exports = trait;