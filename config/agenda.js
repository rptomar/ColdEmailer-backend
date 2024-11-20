const Agenda = require('agenda');
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

agenda.define('send-email', async (job) => {
  console.log('Job is running:', job.attrs.data);
});

module.exports = { agenda };
