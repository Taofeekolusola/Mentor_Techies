const express = require('express');
const { createJob, getJobs } = require('../controllers/jobController');
const {validation} = require('../middleware/auth');

const router = express.Router();
router.post('/', validation, createJob);
router.get('/', validation, getJobs);

module.exports = router;