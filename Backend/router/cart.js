const express = require('express')
const router = express.Router()
const jwtVerify = require('../middleware/verifyJwt')
const ROLES_LIST = require('../config/rolesList')
const verifyRoles= require('../middleware/verifyRoles')
const {getcartItems,deletecartItem,createoraddCart,increaseproductQuantity} = require('../controller/product_functions')

router.route("/")
    .get(jwtVerify,getcartItems)
    .post(jwtVerify,createoraddCart)
    .patch(jwtVerify,increaseproductQuantity)
    

router.route("/:id")
      .get(jwtVerify)
      .delete(jwtVerify,deletecartItem)

module.exports = router