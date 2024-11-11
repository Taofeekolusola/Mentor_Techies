// routes/taskRoute.js
const express = require('express');
const { createTask, getDailyTasksCount } = require('../controllers/taskController');
const { validation } = require('../middleware/auth'); // Assuming you have authentication middleware

const router = express.Router();

router.post('/', validation, createTask);
router.get('/daily', validation, getDailyTasksCount);

module.exports = router;