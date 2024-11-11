const express = require('express');
const { validation } = require('../middleware/auth');
const { login, updateUserProfile, deleteUser, register, requestPasswordReset, resetPassword } = require('../controllers/authController');

const router = express.Router();
router.post('/register', register);
router.post('/login', validation, login);
router.post('/request', validation, requestPasswordReset);
router.post('/reset/token', validation, resetPassword);
router.delete('/delete/:id', validation, deleteUser);
router.put('/update/:id', validation, updateUserProfile);

module.exports = router;