const express = require("express");
const router = express.Router();
const routinesCtrl = require("../../controllers/api/routines");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// All paths start with /api/routines

// GET /api/routines (get all routines)
router.get("/", ensureLoggedIn, routinesCtrl.getAllRoutines);

// GET /api/routines/:routineId (get details of a specific routine)
router.get("/:routineId", ensureLoggedIn, routinesCtrl.getRoutineDetails);

// POST /api/routines (create a new routine)
router.post("/", ensureLoggedIn, routinesCtrl.createRoutine);

// PUT /api/routines/:routineId (update an existing routine)
router.put("/:routineId", ensureLoggedIn, routinesCtrl.updateRoutine);

// DELETE /api/routines/:routineId (delete a routine)
router.delete("/:routineId", ensureLoggedIn, routinesCtrl.deleteRoutine);

module.exports = router;
