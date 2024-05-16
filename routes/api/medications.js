const express = require("express");
const router = express.Router();
const medicationsCtrl = require("../../controllers/api/medications");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// All paths start with /api/medications

// GET /api/medications (get all medications)
router.get("/", ensureLoggedIn, medicationsCtrl.getAllMedications);

// GET /api/medications/:medicationId (get details of a specific medication)
router.get("/:medicationId", ensureLoggedIn, medicationsCtrl.getMedicationDetails);

// POST /api/medications (create a new medication)
router.post("/", ensureLoggedIn, medicationsCtrl.createMedication);

// PUT /api/medications/:medicationId (update an existing medication)
router.put("/:medicationId", ensureLoggedIn, medicationsCtrl.updateMedication);

// DELETE /api/medications/:medicationId (delete a medication)
router.delete("/:medicationId", ensureLoggedIn, medicationsCtrl.deleteMedication);

module.exports = router;
