const Routine = require("../../models/routine");

module.exports = {
  getAllRoutines,
  getRoutineDetails,
  createRoutine,
  updateRoutine,
  deleteRoutine
};

// Get all routines
async function getAllRoutines(req, res) {
  try {
    const routines = await Routine.find();
    res.json(routines);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

// Get details of a specific routine
async function getRoutineDetails(req, res) {
  try {
    const { routineId } = req.params;
    const routine = await Routine.findById(routineId);
    if (!routine) {
      return res.status(404).send("Routine not found");
    }
    res.json(routine);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

// Create a new routine
async function createRoutine(req, res) {
  try {
    const routine = new Routine(req.body);
    await routine.save();
    res.json(routine);
  } catch (err) {
    console.error(err);
    res.status(400).send("Failed to create routine");
  }
}

// Update an existing routine
async function updateRoutine(req, res) {
  try {
    const { routineId } = req.params;
    const routine = await Routine.findByIdAndUpdate(routineId, req.body, { new: true, runValidators: true });
    if (!routine) {
      return res.status(404).send("Routine not found");
    }
    res.json(routine);
  } catch (err) {
    console.error(err);
    res.status(400).send("Failed to update routine");
  }
}

// Delete a routine
async function deleteRoutine(req, res) {
  try {
    const { routineId } = req.params;
    const routine = await Routine.findByIdAndDelete(routineId);
    if (!routine) {
      return res.status(404).send("Routine not found");
    }
    res.send("Routine deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
