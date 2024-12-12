import express from "express";
import { getClinicHistory, getClinicHistoryByDni, getClinicHistoryByDate, createClinicHistory, updateClinicHistory, deleteClinicHistory } from "../controllers/clinicHistoryController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dates/date", protect,  getClinicHistoryByDate);
router.get("/", protect, getClinicHistory);
router.get("/:dni", protect,  getClinicHistoryByDni);
router.post("/", protect,  createClinicHistory);
router.put("/:id", protect,  updateClinicHistory);
router.delete("/:id", protect,  deleteClinicHistory);

export default router;
