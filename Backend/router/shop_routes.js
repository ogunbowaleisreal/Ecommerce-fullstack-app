const express = require('express')
const router = express.Router()
const {getallfeaturedProducts,updateReview, deleteReview, getbyFilter,createOrder,getuserOrders,createReviews} = require('../controller/product_functions')
const {productDetails,getallProducts} = require('../controller/admin_functions')
const jwtVerify = require('../middleware/verifyJwt')
const ROLES_LIST = require('../config/rolesList')
const verifyRoles= require('../middleware/verifyRoles')

router.route('/products')
      .get(jwtVerify,getallfeaturedProducts)

router.route('/order')
      .post(jwtVerify,createOrder)
      .get(jwtVerify,getuserOrders)
router.route('/')
     .get(jwtVerify,verifyRoles(ROLES_LIST.Admin,ROLES_LIST.User),getallProducts)
     .post(jwtVerify,verifyRoles(ROLES_LIST.User,ROLES_LIST.Admin),getbyFilter)

router.route('/:id')
     .get(jwtVerify,productDetails)
     .patch(jwtVerify,updateReview)
     .delete(jwtVerify,deleteReview)
     .post(jwtVerify,createReviews)

module.exports = router