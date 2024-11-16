const express = require("express");
const router = express.Router();
const EmailSchedule = require("../models/emailSchedule");
const agenda = require("../agenda");
const nodemailer = require("nodemailer");

// Schedule an email
router.post("/schedule-email", async (req, res) => {
  const { email, subject, body, scheduleTime } = req.body;

  try {
    const newSchedule = await EmailSchedule.create({ email, subject, body, scheduleTime });

    agenda.define("send-email", async (job) => {
      const { email, subject, body } = job.attrs.data;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
      });

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject,
        text: body,
      });
    });

    agenda.schedule(new Date(scheduleTime), "send-email", {
      email,
      subject,
      body,
    });

    res.status(200).json({ message: "Email scheduled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
