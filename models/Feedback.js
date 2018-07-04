//models/Expense.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
  feedback: String,
  rating: String,
  month: String,

});

module.exports = mongoose.model('feedbackcomp', feedbackSchema,'feedbackcomp');
