const express = require('express')
const router = express.Router()
const {getallTransactions, createTransactions, gettodo, deletetodo,updateTodo} = require('../controller/Transaction-functions')
const jwtVerify = require('../middleware/verifyJwt')
const ROLES_LIST = require('../config/rolesList')

router.route('/')
     .get(jwtVerify,getallTransactions)
     .post(jwtVerify,createTransactions)
     .patch(jwtVerify,updateTodo)
     .delete(jwtVerify,deletetodo)
router.route('/:id')
     .get(gettodo)

module.exports = router 