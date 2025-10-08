const express = require('express')
const router = express.Router()
const jwtVerify = require('../middleware/verifyJwt')
const {create_checkout_session,payment_webhook} = require('../controller/payment_gateway')
const body_parser = require('body-parser')

router.route("/")
    .post(jwtVerify,create_checkout_session)
router.route("/webhook")
    .post(body_parser.raw({type:'application/json'}),payment_webhook)

module.exports = router