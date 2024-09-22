const express = require('express');
const mongoose = require('mongoose');
const Evaluation = require('./Evaluation'); // Adjust path as necessary
const User = require('./user'); // Adjust path as necessary


const app = express();
app.use(express.json()); // To parse JSON bodies
const cors = require('cors');
app.use(cors());

mongoose.connect('mongodb+srv://hardwar:CoLjUuf540o5m5Lh@clusterevaluation.jkgieqv.mongodb.net/?retryWrites=true&w=majority&appName=ClusterEvaluation}', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Route to get evaluations by team name
app.get('/api/evaluations/:teamName', async (req, res) => {
  const teamName = req.params.teamName;

  try {
    const evaluations = await Evaluation.find({ teamName }).populate('evaluatedBy', 'username'); // Populate with username
    res.json(evaluations);
  } catch (error) {
    console.error('Error fetching evaluations for team:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Additional route to get all evaluations with aggregations (if needed)
app.get('/api/evaluations', async (req, res) => {
    try {
      const evaluations = await Evaluation.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'evaluatedBy',
            foreignField: '_id',
            as: 'evaluator',
          }
        },
        {
          $unwind: '$evaluator'
        },
        {
          $group: {
            _id: "$teamName",
            totalScore: { $sum: "$totalScore" },
            numberOfEvaluations: { $sum: 1 },
            evaluators: {
              $push: {
                username: '$evaluator.username',
                scores: '$scores' // Include individual scores
              }
            }
          }
        }
      ]);
  
      res.json(evaluations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  