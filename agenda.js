const Agenda = require("agenda");
const mongoose = require("mongoose");

const mongoConnectionString = "mongodb://localhost:27017/emailScheduler";

mongoose.connect(mongoConnectionString);

const agenda = new Agenda({ db: { address: mongoConnectionString, collection: "agendaJobs" } });

agenda.start();

module.exports = agenda;
