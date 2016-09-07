var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  date : { type Date, default: Date.now },
  cards: Array
});

var Hand = mongoose.model('Hand', schema);

module.exports = Hand