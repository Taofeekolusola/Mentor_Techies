const express = require('express');
const { createInterview, getUserInterviewCount } = require('../controllers/interviewController');
const router = express.Router();
const {validation} = require('../middleware/auth')

router.post('/', validation, createInterview);
router.get('/count/:userId', validation, getUserInterviewCount);

module.exports = router;