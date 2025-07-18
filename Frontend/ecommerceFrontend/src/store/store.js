import React from "react";
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../reduxfeatures/addtocartslice'
import errorReducer from '../../reduxfeatures/errormessage'
import getproductReducer from '../../reduxfeatures/getcartslicer'

export default configureStore({
    reducer:{
        cart:cartReducer,
        error:errorReducer,
        getproduct:getproductReducer
    }
})