import React from 'react';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import useAxios from '../src/api';
import { useDispatch } from 'react-redux';

export const getproductslice=
createAsyncThunk(
    'product/details',
    async (item,{rejectWithValue})=>{
        try{
            const api = useAxios()
            const res = await api.get(`/shop/${item}`)
            console.log(res.data)
            return res.data
        }catch(err){
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
            console.log(state.items)
        }) 
        .addCase(getproductslice.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        }) 
    }
})
export const {cleardetails} = getProductDetails.actions
export default getProductDetails.reducer;