const Agenda = require('agenda');
const nodemailer = require('nodemailer'); // Import Nodemailer
require('dotenv').config();

const agenda = new Agenda({
  db: {
    address: process.env.MONGO_URI,  // Use the updated Mongo URI from .env
    collection: 'agendaJobs',        // Collection to store jobs
    options: { useUnifiedTopology: true },
  },
  ensureIndex: false,  // Disable automatic index creation
});

agenda.on('ready', async () => {
  console.log('Agenda is ready!');
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Example: using Gmail SMTP
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Define the email-sending job
agenda.define('send-email', async (job) => {
  const { to, subject, body } = job.attrs.data; // Extract email details from the job

  try {
    // Use Nodemailer to send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender's email address
      to,                          // Recipient's email address
      subject,                     // Email subject
      text: body,                  // Email body
    });

    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
});

module.exports = { agenda };
