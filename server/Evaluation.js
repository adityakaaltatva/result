const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  projectName: { type: String, required: true },
  scores: { type: [Number], required: true },
  totalScore: { type: Number, required: true },
  evaluatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the evaluator
}, {
  timestamps: true
});

module.exports = mongoose.model('Evaluation', evaluationSchema);
