const express = require('express')
const router = express.Router()
const {createProduct,createUser,updateOrder,updateProduct,deleteProduct,getOrders,getallProducts} = require('../controller/admin_functions')
const jwtVerify = require('../middleware/verifyJwt')
const ROLES_LIST = require('../config/rolesList')
const verifyRoles= require('../middleware/verifyRoles')

router.route('/')
      .get(jwtVerify,verifyRoles(ROLES_LIST.Admin),getallProducts)
      .post(jwtVerify,verifyRoles(ROLES_LIST.Admin),createProduct)

router.route('/:id')
      .patch(jwtVerify,verifyRoles(ROLES_LIST.Admin),updateProduct)
      .delete(jwtVerify,verifyRoles(ROLES_LIST.Admin),deleteProduct)

router.route('/order/:id')
      .patch()
      .delete()      

router.route('/order')
      .get(getOrders)
      .patch(updateOrder)


router.route('/users')
module.exports= router