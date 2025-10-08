import React from "react";
import { configureStore } from '@reduxjs/toolkit';
import addtocartReducer from '../../reduxfeatures/addtocartslice'
import errorReducer from '../../reduxfeatures/errormessage'
import getproductReducer from '../../reduxfeatures/getproductslicer'
import getcartReducer from '../../reduxfeatures/getcartsslicer'
import  authReducer  from "../../reduxfeatures/authslicer";

export default configureStore({
    reducer:{
        cart:addtocartReducer,
        error:errorReducer,
        getproduct:getproductReducer,
        getcart:getcartReducer,
        auth: authReducer
    }
})