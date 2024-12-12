import express from "express";
import { getVisits, getVisitById, createVisit, updateVisit, deleteVisit } from "../controllers/visitController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getVisits);
router.get("/:id", protect, getVisitById);
router.post("/", protect, createVisit);
router.put("/:id", protect, updateVisit);
router.delete("/:id", protect, deleteVisit);

export default router;
