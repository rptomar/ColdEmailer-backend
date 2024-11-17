import mongoose from "mongoose";

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
  label: String,
});

const flowchartSchema = new mongoose.Schema({
  nodes: [nodeSchema],
  edges: [edgeSchema],
  createdAt: { type: Date, default: Date.now },
});

const Flowchart = mongoose.model("Flowchart", flowchartSchema);

export default Flowchart;
