const express = require('express');
const router = express.Router();
const { scheduleEmail } = require('../controllers/emailController');

router.post('/schedule', scheduleEmail);

module.exports = router;
