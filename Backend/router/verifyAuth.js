const express = require('express')
const router = express.Router()
const  verifyAuthController= require('../controller/auth/verifylogin')

router.route('/')
         .get(verifyAuthController)

module.exports = router