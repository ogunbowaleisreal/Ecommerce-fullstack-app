const express = require('express')
const router = express.Router()
const {getallProducts, createTransactions, gettodo, deletetodo,updateTodo} = require('../controller/product_functions')
const jwtVerify = require('../middleware/verifyJwt')
const ROLES_LIST = require('../config/rolesList')
const verifyRoles= require('../middleware/verifyRoles')

router.route('/')
     .get(jwtVerify,verifyRoles,getallProducts)
     .post(jwtVerify,verifyRoles(ROLES_LIST.User),createTransactions)
     .patch(jwtVerify,updateTodo)
     .delete(jwtVerify,deletetodo)
router.route('/:id')
     .get(gettodo)

module.exports = router 