const express = require('express')
const router = express.Router()
const logoutController = require('../controller/auth/logoutcontroller')

router.route('/')
         .get(logoutController)

module.exports = router