const express = require('express')
const router = express.Router()
const logoutController = require('../controller/logoutcontroller')

router.route('/')
         .get(logoutController)

module.exports = router