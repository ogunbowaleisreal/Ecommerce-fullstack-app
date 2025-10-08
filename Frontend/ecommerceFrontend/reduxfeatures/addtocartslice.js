import React from 'react';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../src/axiosinstance';
import {setmessage,clearmessage } from './errormessage';
import { increaseCount } from './getcartsslicer';


export const addtocartslice=
createAsyncThunk(
    'cart/addtocart',
    async (item,{rejectWithValue,dispatch})=>{
        try{
            console.log(item)
            const res = await axiosInstance.post('/cart',{"product_id":item.product_id},
            )
            console.log(item)
            if(res.status== 200 && res.data.message !== 'quantity increased'){
                dispatch(increaseCount())
                console.log(res.data)
            }
            dispatch(setmessage(res.data.message))
            setTimeout(()=>{dispatch(clearmessage())},1000)
            console.log(res.data)
            return res.data
        }catch(err){
            if(err.response.status == 403 && err.response.data.message == 'refreshtokenexpired'){
                window.location.href = '/login'
                return rejectWithValue(err.response.data.message)
            }
            else if(err.response.status== 403 && err.response.data.message == 'quantity exceeds available stock'){
                console.log(err)
            dispatch(setmessage(err.response.data.message))
            setTimeout(()=>{dispatch(clearmessage())},1000)
            return rejectWithValue(err.response.data.message)
            }
            else if(err.response.status== 403){
                console.log(err)
            dispatch(setmessage(err.response.data.message))
            setTimeout(()=>{dispatch(clearmessage())},1000)
            return  
            }
          return rejectWithValue(err.response.data.message)
        }
    }
);

const cartSlice = createSlice({
    name:'cart',
    initialState:{
    items:[],
    loading:{},
    error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(addtocartslice.pending,(state,action)=>{
            const id = action.meta.arg.product_id
            state.loading[id] = true;
            state.error = null;
        })
        .addCase(addtocartslice.fulfilled,(state,action)=>{
            const id = action.meta.arg.product_id
            console.log(id)
            state.loading[id] = false;
            state.items = action.payload.cart;
        }) 
        .addCase(addtocartslice.rejected,(state,action)=>{
            const id = action.meta.arg.product_id
            state.loading[id] = false;
            state.error = action.payload;
        }) 
    }
})
export default cartSlice.reducer;