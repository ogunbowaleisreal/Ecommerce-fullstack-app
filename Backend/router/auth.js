const express = require('express')
const router = express.Router()
const authController = require('../controller/auth/authController')

router.route('/')
      .post(authController)
      
module.exports = router