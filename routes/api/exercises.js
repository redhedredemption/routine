const express = require("express");
const router = express.Router();
const exercisesCtrl = require("../../controllers/api/exercises");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// All paths start with /api/exercises

// GET /api/exercises (get all exercises)
router.get("/", ensureLoggedIn, exercisesCtrl.getAllExercises);

// GET /api/exercises/:exerciseId (get details of a specific exercise)
router.get("/:exerciseId", ensureLoggedIn, exercisesCtrl.getExerciseDetails);

// POST /api/exercises (create a new exercise)
router.post("/", ensureLoggedIn, exercisesCtrl.createExercise);

// PUT /api/exercises/:exerciseId (update an existing exercise)
router.put("/:exerciseId", ensureLoggedIn, exercisesCtrl.updateExercise);

// DELETE /api/exercises/:exerciseId (delete a exercise)
router.delete("/:exerciseId", ensureLoggedIn, exercisesCtrl.deleteExercise);

module.exports = router;
