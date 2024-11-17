import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import flowchartRoutes from "./routes/flowchartRoutes.js";
import { agenda } from "./config/agenda.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/flowchart", flowchartRoutes);

// Database Connection
import connectDB from "./config/db.js";
connectDB();

// Agenda Startup
agenda.start().then(() => {
  console.log("Agenda is ready!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
