const express = require('express')
const router = express.Router()
const refreshTokenController = require('../controller/auth/refreshToken')

router.route('/')
         .get(refreshTokenController)

module.exports = router