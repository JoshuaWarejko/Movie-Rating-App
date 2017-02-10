var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({}, {strict: false});

var Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;