const express = require('express');
const router = express.Router();
const { getTalentExpertise, createTalent, updateTalent } = require('../controllers/talentController');

router.get('/user/:userId', getTalentExpertise);
router.post('/user/:userId', createTalent);
router.put('/user/:userId', updateTalent);

module.exports = router;