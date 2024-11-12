const express = require('express');
const { createJob, updateJob, deleteJob, getJobs } = require('../controllers/jobController');
const {validation} = require('../middleware/auth');

const router = express.Router();
router.post('/', validation, createJob);
router.get('/', validation, getJobs);
router.put('/update/:id', validation, updateJob);
router.delete('/delete/:id', validation, deleteJob);

module.exports = router;