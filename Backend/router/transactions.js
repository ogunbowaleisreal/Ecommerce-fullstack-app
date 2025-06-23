const express = require('express')
const router = express.Router()
const {getallProducts,getallfeaturedProducts,getProductDetails, updateReview, deleteReview, getbyFilter} = require('../controller/product_functions')
const jwtVerify = require('../middleware/verifyJwt')
const ROLES_LIST = require('../config/rolesList')
const verifyRoles= require('../middleware/verifyRoles')

router.route('/')
     .get(jwtVerify,verifyRoles,getallProducts)
     .post(jwtVerify,verifyRoles(ROLES_LIST.User),getbyFilter)

router.route('/:id')
     .get(jwtVerify,getProductDetails)
     .patch(jwtVerify,updateReview)
     .delete(jwtVerify,deleteReview)

router.route('/products')
      .get(jwtVerify,getallfeaturedProducts)


module.exports = router