const express = require('express');
const { searchUsers, searchJobs } = require('../controllers/searchController');
const router = express.Router();

router.get('/users', searchUsers);
router.get('/jobs', searchJobs);

module.exports = router;