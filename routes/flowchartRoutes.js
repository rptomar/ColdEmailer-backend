import express from "express";
import { saveFlowchart, scheduleEmail } from "../controllers/flowchartController.js";

const router = express.Router();

// Save Flowchart
router.post("/save", saveFlowchart);

// Schedule Email
router.post("/schedule-email", scheduleEmail);

export default router;
