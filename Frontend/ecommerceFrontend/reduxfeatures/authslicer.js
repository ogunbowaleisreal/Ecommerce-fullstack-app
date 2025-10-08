import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    
    name:'auth',
    initialState:{
        token:'',
        toggle:false,
        user_id:'',
        username:''
    },
    reducers:{
        setToken:(state,action)=>{
            state.token = action.payload;
        },
        setUser:(state,action)=>{
            state.user_id = action.payload.user_id;
            state.username = action.payload.username
        }
    }
})
export const {setToken,setUser} = authSlice.actions
export default authSlice.reducer