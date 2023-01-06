const mongoose = require('mongoose');

const taskEpSchema = mongoose.Schema({
  Attribution: {type: String },
  Régime: {type: String },
  Création: {type: Date },
  Résolue: {type: Date },
  Dernier: {type: String },
  Langue: {type: String},
  Opération: {type: String },
  Prise: {type: Date},
  Raison: {type: String },
  Tâche: {type: String },
})

module.exports = mongoose.model('Taskep', taskEpSchema)
