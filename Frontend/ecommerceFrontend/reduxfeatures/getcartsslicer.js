import React from 'react';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../src/axiosinstance';

export const getcartslice=
createAsyncThunk(
    'cart/items',
    async (item,{rejectWithValue,dispatch})=>{
        try{
            const res = await axiosInstance.get(`/cart`)
            const data = res.data
            return data
        }catch(err){
            if(err.response.status == 403 && err.response.data.message == 'refreshtokenexpired'){
                window.location.href = '/login'
               return 
            }
          return rejectWithValue(err.response.data.message)
        }
    }
);

const getCart = createSlice({
    name:'getcart',
    initialState:{
    cartitems:[],
    count:0,
    total:null,
    loading:false,
    toggle:false,
    error:null,
    user_id:null,
    },
    reducers:{
        setTotal:(state,action)=>{
            state.total = action.payload
        },
        setCart:(state,action)=>{
                for(const item of state.cartitems){
                    if(item.product_id._id == action.payload.product_id){
                        action.payload.type == 'increase' ? 
                        item.quantity += 1: 
                        item.quantity -=1
                    }
                }
        },
        deletecartItem:(state,action)=>{
            state.cartitems = state.cartitems.filter((item)=>{
                return item.product_id._id !== action.payload
            })
        },
        increaseCount:(state)=>{
            state.count += 1
        },
        decreaseCount:(state)=>{
            state.count -= 1
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getcartslice.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.toggle = true
        })
        .addCase(getcartslice.fulfilled,(state,action)=>{
            state.loading = false;
            state.cartitems = action.payload.cart.Products;
            state.total = action.payload.totalPrice;
            state.user_id = action.payload.user_id
            state.count = action.payload.cart.Products.length
        }) 
        .addCase(getcartslice.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        }) 
    }
})
export const {setTotal,setCart,deletecartItem,increaseCount,decreaseCount} = getCart.actions
export default getCart.reducer;