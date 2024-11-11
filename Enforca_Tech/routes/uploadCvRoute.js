const express = require('express');
const uploadCv = require('../middleware/uploadCv');
const router = express.Router();

router.post('/upload-cv', uploadCv); // Handle the POST request to upload CV

module.exports = router;