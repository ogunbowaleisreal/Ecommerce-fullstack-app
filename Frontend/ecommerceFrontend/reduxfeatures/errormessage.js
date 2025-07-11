import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
    
    name:'error',
    initialState:{
        value:'',
        toggle:false
    },
    reducers:{
        setmessage:(state,action)=>{
            state.value = action.payload;
            state.toggle = true
        },
        clearmessage:(state)=>{
            state.value = '';
            state.toggle = false;
        }
    }
})
export const {setmessage,clearmessage} = errorSlice.actions
export default errorSlice.reducer