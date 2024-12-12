import express from "express";
import { getPatients, getPatientByDni, createPatient, updatePatient, deletePatient } from "../controllers/patientController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getPatients);
router.get("/:dni", protect, getPatientByDni);
router.post("/", protect, createPatient);
router.put("/:id", protect, updatePatient);
router.delete("/:id", protect, deletePatient);

export default router;
