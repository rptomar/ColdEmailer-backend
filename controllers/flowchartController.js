import Flowchart from "../models/Flowchart.js";
import { agenda } from "../config/agenda.js";

export const saveFlowchart = async (req, res) => {
  try {
    const { nodes, edges } = req.body;
    const flowchart = new Flowchart({ nodes, edges });
    await flowchart.save();
    res.status(201).json({ message: "Flowchart saved successfully", flowchart });
  } catch (error) {
    res.status(500).json({ message: "Error saving flowchart", error });
  }
};

export const scheduleEmail = async (req, res) => {
  try {
    const { to, subject, body, delayInMinutes } = req.body;

    await agenda.schedule(`${delayInMinutes} minutes`, "sendEmail", {
      to,
      subject,
      body,
    });

    res.status(200).json({ message: "Email scheduled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error scheduling email", error });
  }
};
