import React from 'react';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import api from '../src/api'
import { useDispatch } from 'react-redux';
import { errorSlice, setmessage,clearmessage } from './errormessage';

export const addtocartslice=
createAsyncThunk(
    'cart/addtocart',
    async (item,{rejectWithValue,dispatch})=>{
        try{
            const res = await api.post('/cart',item)
            dispatch(setmessage(res.data.message))
            setTimeout(()=>{dispatch(clearmessage())},5000)
            return res.data
        }catch(err){
          return rejectWithValue(err.response.data.message)
        }
    }
);

const cartSlice = createSlice({
    name:'cart',
    initialState:{
    items:[],
    loading:false,
    error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(addtocartslice.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(addtocartslice.fulfilled,(state,action)=>{
            state.loading = false;
            state.items = action.payload.cart;
        }) 
        .addCase(addtocartslice.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        }) 
    }
})
export default cartSlice.reducer;