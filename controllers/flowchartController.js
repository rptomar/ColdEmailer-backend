const Flowchart = require('../models/Flowchart');

// Save Flowchart
exports.saveFlowchart = async (req, res) => {
  try {
    const { name, nodes, edges } = req.body;
    const flowchart = new Flowchart({ name, nodes, edges });
    await flowchart.save();
    res.status(201).json({ message: 'Flowchart saved successfully!', flowchart });
  } catch (error) {
    res.status(500).json({ message: 'Error saving flowchart', error });
  }
};

// Get Flowcharts
exports.getFlowcharts = async (req, res) => {
  try {
    const flowcharts = await Flowchart.find();
    res.status(200).json(flowcharts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flowcharts', error });
  }
};
