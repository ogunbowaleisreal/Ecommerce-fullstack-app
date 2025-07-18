const express = require('express')
const router = express.Router()
const registerController = require('../controller/auth/register')

router.route('/')
      .post(registerController)


module.exports = router