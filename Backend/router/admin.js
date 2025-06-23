const express = require('express')
const router = express.Router()
const {createProduct,createUser,updateOrder,updateProduct,deleteProduct,getOrders,getallProducts, productDetails,orderDetails} = require('../controller/admin_functions')
const jwtVerify = require('../middleware/verifyJwt')
const ROLES_LIST = require('../config/rolesList')
const verifyRoles= require('../middleware/verifyRoles')

router.route('/')
      .get(jwtVerify,verifyRoles(ROLES_LIST.Admin),getallProducts)
      .post(jwtVerify,verifyRoles(ROLES_LIST.Admin),createProduct)

router.route('/:id')
      .get(jwtVerify,verifyRoles(ROLES_LIST.Admin),productDetails)
      .patch(jwtVerify,verifyRoles(ROLES_LIST.Admin),updateProduct)
      .delete(jwtVerify,verifyRoles(ROLES_LIST.Admin),deleteProduct)
      
router.route('/order')
      .get(jwtVerify,verifyRoles(ROLES_LIST.Admin),getOrders)

router.route('/order/:id')
      .get(jwtVerify,verifyRoles(ROLES_LIST.Admin),orderDetails)
      .patch(jwtVerify,verifyRoles(ROLES_LIST.Admin),updateOrder)      

router.route('/users')
      .post(jwtVerify,verifyRoles(ROLES_LIST.Admin),createUser)


module.exports= router