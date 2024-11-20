const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  to: String,
  subject: String,
  body: String,
  scheduledTime: Date,
  status: { type: String, enum: ['Pending', 'Sent'], default: 'Pending' },
});

module.exports = mongoose.model('Email', emailSchema);
