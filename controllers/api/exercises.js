const Exercise = require("../../models/exercise");

module.exports = {
  getAllExercises,
  getExerciseDetails,
  createExercise,
  updateExercise,
  deleteExercise
};

// Get all exercises
async function getAllExercises(req, res) {
  try {
    const exercises = await Exercise.find({user: req.user._id});
    res.json(exercises);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

// Get details of a specific exercise
async function getExerciseDetails(req, res) {
  try {
    const { exerciseId } = req.params;
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).send("Exercise not found");
    }
    res.json(exercise);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

// Create a new exercise
async function createExercise(req, res) {
  req.body.user = req.user._id;
  try {
    const exercise = new Exercise(req.body);
    await exercise.save();
    res.json(exercise);
  } catch (err) {
    console.error(err);
    res.status(400).send("Failed to create exercise");
  }
}

// Update an existing exercise
async function updateExercise(req, res) {
  try {
    const { exerciseId } = req.params;
    const exercise = await Exercise.findByIdAndUpdate(exerciseId, req.body, { new: true, runValidators: true });
    if (!exercise) {
      return res.status(404).send("Exercise not found");
    }
    res.json(exercise);
  } catch (err) {
    console.error(err);
    res.status(400).send("Failed to update exercise");
  }
}

// Delete a exercise
async function deleteExercise(req, res) {
  try {
    const { exerciseId } = req.params;
    const exercise = await Exercise.findByIdAndDelete(exerciseId);
    if (!exercise) {
      return res.status(404).send("Exercise not found");
    }
    res.send("Exercise deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
