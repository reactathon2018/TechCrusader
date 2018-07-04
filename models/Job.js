//models/Job.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema= new Schema({
  Job_id: Number,
  Designation:String,
  Experience:String,
  Primary_Skills:String,
  Secondary_Skills:String,
  Job_Role:String,
  Job_Location:String
});
var collectionName = 'job';
module.exports = mongoose.model('Job', jobSchema,collectionName);