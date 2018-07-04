var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var candidateSchema= new Schema({
  Candidate_id: Number,
  Candidate_Name:String,
  Job_Id_Applied:Number,
  Interview_Date:String,
  Interview_Time:String,
  Interview_Venue:String,
  Interview_Feedback:String,
  Candidate_Documents:String,
  Hiring_Manager:String,
  Hiring_Feedback:String,
  Interview_Status:String,
  Interview_Remarks:String
});

var collectionName = 'candidate';
module.exports = mongoose.model('Candidate', candidateSchema,collectionName);