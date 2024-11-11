const express = require('express')
const router = express.Router()
const {testApiHandler} = require('../controllers/test')

router.get('/', testApiHandler)
module.exports = router