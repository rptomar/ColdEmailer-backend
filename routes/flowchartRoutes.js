const express = require('express');
const router = express.Router();
const { saveFlowchart, getFlowcharts } = require('../controllers/flowchartController');

router.post('/save', saveFlowchart);
router.get('/get', getFlowcharts);

module.exports = router;
