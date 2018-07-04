//models/Expense.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var expenseSchema = new Schema({
  Candidate_Name: String,
  Designation: String,
  Primary_Skill: String,
  Secondary_Skill: String,
  Job_Role:String,
  Job_Location:String
});
module.exports = mongoose.model('candidate', expenseSchema,'candidate');
