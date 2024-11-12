const express = require('express');
const router = express.Router();
const {
    applyForJob,
    getTotalApplications,
    getTotalPendingApplications,
    getTotalRejectedApplications,
    getTotalAcceptedApplications } = require('../controllers/applicationController');
    const { validation } = require('../middleware/auth');

// User applies for a job
router.post('/apply', validation, applyForJob);
router.get('/total', validation, getTotalApplications)
router.get('/pending', validation, getTotalPendingApplications);
router.get('/rejected', validation, getTotalRejectedApplications);
router.get('/accepted', validation, getTotalAcceptedApplications);

module.exports = router;