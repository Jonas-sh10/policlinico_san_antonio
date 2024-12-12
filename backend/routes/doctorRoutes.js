import express from "express";
import { getDoctors, getDoctorByDni, getDoctorBySpecialty, createDoctor, updateDoctor, deleteDoctor } from "../controllers/doctorController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/specialty/:specialty", protect, getDoctorBySpecialty);
router.get("/dni/:dni", protect, getDoctorByDni);
router.get("/", protect, getDoctors);
router.post("/", protect, createDoctor);
router.put("/:dni", protect, updateDoctor);
router.delete("/:id", protect, deleteDoctor);
router.delete("/destroy/:id", protect, deleteDoctor);

export default router;
