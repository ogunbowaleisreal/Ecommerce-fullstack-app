const express = require('express');
const router = express.Router();
const {createProduct,createUser,updateOrder,updateProduct,deleteProduct,getOrders,getallProducts, productDetails,orderDetails,getallUsers} = require('../controller/admin_functions');
const {createOrder} = require('../controller/product_functions');
const jwtVerify = require('../middleware/verifyJwt');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles= require('../middleware/verifyRoles');

router.route('/')
      .get(jwtVerify,verifyRoles(ROLES_LIST.Admin),getOrders)
      .post(jwtVerify,verifyRoles(ROLES_LIST.Admin,ROLES_LIST.User),createOrder)

router.route('/order/:id')
      .get(jwtVerify,verifyRoles(ROLES_LIST.Admin),orderDetails)
      .patch(jwtVerify,verifyRoles(ROLES_LIST.Admin),updateOrder)


module.exports = router