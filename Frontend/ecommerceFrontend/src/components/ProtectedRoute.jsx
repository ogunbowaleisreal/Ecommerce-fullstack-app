import {Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import axiosInstance from '../axiosinstance';
import { setAccessToken } from '../tokenService';


function ProtectedRoute({children}){
    const api = axiosInstance
    const [authorized, setauthorized] = useState(null)

    const auth= async ()=>{
        try{
        const response = await api.get('/verify')
            if(response.status == 200){
                setauthorized(true)
                return
            }
            setauthorized(false)
    }catch(err){
        console.log(err)
        setauthorized(false)    
    }
    }
    useEffect(()=>{auth()},[])

        if(authorized == null){
        return <div class= "min-h-screen justify-center items-center flex">
            <div className='animate-pulse'>
            LOADING TRANSACTIONS...
            </div>
            </div>
    }
    return( authorized ? children : <Navigate to ='/login'/>)
}

export default ProtectedRoute