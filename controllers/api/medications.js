const Medication = require("../../models/medication");

module.exports = {
  getAllMedications,
  getMedicationDetails,
  createMedication,
  updateMedication,
  deleteMedication
};

// Get all medications
async function getAllMedications(req, res) {
  try {
    const medications = await Medication.find({user: req.user._id});
    res.json(medications);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

// Get details of a specific medication
async function getMedicationDetails(req, res) {
  try {
    const { medicationId } = req.params;
    const medication = await Medication.findById(medicationId);
    if (!medication) {
      return res.status(404).send("Medication not found");
    }
    res.json(medication);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

// Create a new medication
async function createMedication(req, res) {
  req.body.user = req.user._id;
  try {
    const medication = new Medication(req.body);
    await medication.save();
    res.json(medication);
  } catch (err) {
    console.error(err);
    res.status(400).send("Failed to create medication");
  }
}

// Update an existing medication
async function updateMedication(req, res) {
  try {
    const { medicationId } = req.params;
    const medication = await Medication.findByIdAndUpdate(medicationId, req.body, { new: true, runValidators: true });
    if (!medication) {
      return res.status(404).send("Medication not found");
    }
    res.json(medication);
  } catch (err) {
    console.error(err);
    res.status(400).send("Failed to update medication");
  }
}

// Delete a medication
async function deleteMedication(req, res) {
  try {
    const { medicationId } = req.params;
    const medication = await Medication.findByIdAndDelete(medicationId);
    if (!medication) {
      return res.status(404).send("Medication not found");
    }
    res.send("Medication deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
