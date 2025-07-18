const express = require('express')
const router = express.Router()
const {createProduct,createUser,updateOrder,updateProduct,deleteProduct,getOrders,getallProducts, productDetails,orderDetails,getallUsers} = require('../controller/admin_functions')
const jwtVerify = require('../middleware/verifyJwt')
const ROLES_LIST = require('../config/rolesList')
const verifyRoles= require('../middleware/verifyRoles')
const upload = require('../config/multerconfig');

router.route('/')
      .get(jwtVerify,verifyRoles(ROLES_LIST.Admin),getallProducts)
      .post(jwtVerify,verifyRoles(ROLES_LIST.Admin),upload.single('image_url'),createProduct)

router.route('/users')
      .get(jwtVerify,verifyRoles(ROLES_LIST.Admin),getallUsers)
      .post(jwtVerify,verifyRoles(ROLES_LIST.Admin),createUser)
     
router.route('/:id')
      .get(jwtVerify,verifyRoles(ROLES_LIST.Admin),productDetails)
      .patch(jwtVerify,verifyRoles(ROLES_LIST.Admin),updateProduct)
      .delete(jwtVerify,verifyRoles(ROLES_LIST.Admin),deleteProduct)      



module.exports= router