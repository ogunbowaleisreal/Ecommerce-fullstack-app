import React from 'react';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../src/axiosinstance';
import { setToken } from './authslicer';

export const getproductslice=
createAsyncThunk(
    'product/details',
    async (item,{rejectWithValue,dispatch,getState})=>{
        try{
            const token = getState().auth.token
            const res = await axiosInstance.get(`/shop/${item.product_id}`,
            )
            return res.data
        }catch(err){
            if(err.response.status == 401){
                try{
                const response = await axiosInstance.get('/refresh')
                const newAccess = response.data.access_token
                dispatch(setToken(newAccess))
                    const res = await axiosInstance.get(`/shop/${item.product_id}`,
                {headers:{ 
                    Authorization:`Bearer ${newAccess}`
                }
            }
            )
            return res.data 
                }catch(err){
                    console.log(err)
                    if(err.response.status == 403 && err.response.data.message == 'refreshtokenexpired'){
                window.location.href = '/login'
               return 
                }
                return rejectWithValue(err.response.data.message)
                }
            }else if(err.response.status == 403 && err.response.data.message == 'refreshtokenexpired'){
                window.location.href = '/login'
               return 
            }
          return rejectWithValue(err.response.data.message)
        }
    }
);

const getProductDetails = createSlice({
    name:'getProductDetails',
    initialState:{
    items:[],
    loading:false,
    toggle:false,
    error:null,
    },
    reducers:{
        cleardetails:(state)=>{
            state.toggle = false;
        },
        addReview:(state,action)=>{
            console.log(action.payload)
            state.items.reviews.unshift(action.payload)
            console.group(state.items)
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getproductslice.pending,(state)=>{
            state.loading = false;
            state.error = null;
            state.toggle = true
        })
        .addCase(getproductslice.fulfilled,(state,action)=>{
            state.loading = true;
            state.items = action.payload;
        }) 
        .addCase(getproductslice.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        }) 
    }
})
export const {cleardetails,addReview} = getProductDetails.actions
export default getProductDetails.reducer;