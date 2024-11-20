const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  id: String,
  type: String,
  data: Object,
  position: Object,
});

const edgeSchema = new mongoose.Schema({
  id: String,
  source: String,
  target: String,
  animated: Boolean,
  label: String,
});

const flowchartSchema = new mongoose.Schema({
  name: String,
  nodes: [nodeSchema],
  edges: [edgeSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Flowchart', flowchartSchema);
