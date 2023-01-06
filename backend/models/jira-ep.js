const mongoose = require('mongoose');

const jiraEp = new mongoose.Schema({
  attribution: {type: String },
  regime: {type: String },
  creation: {type: Date },
  resolue: {type: Date },
  dernier: {type: String },
  langue: {type: String},
  operation: {type: String },
  prise: {type: Date},
  raison: {type: String },
  tache: {type: String },
})

module.exports = mongoose.model('Jiraep', jiraEp)
