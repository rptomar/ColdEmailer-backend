const Email = require('../models/Email');
const { agenda } = require('../config/agenda');

// Schedule Email
exports.scheduleEmail = async (req, res) => {
  try {
    const { to, subject, body, scheduledTime } = req.body;

    const email = new Email({ to, subject, body, scheduledTime });
    await email.save();

    // Schedule email using Agenda
    await agenda.schedule(new Date(scheduledTime), 'send-email', {
      emailId: email._id,
    });

    res.status(201).json({ message: 'Email scheduled successfully!', email });
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling email', error });
  }
};
