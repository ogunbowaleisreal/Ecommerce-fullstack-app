import {Navigate, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAxios from '../api';
import useAuth from '../useAuth';
import React from 'react';


function ProtectedRoute({route,children}){
    const api = useAxios()
  const { accessToken, setAccessToken } = useAuth();
    const [authorized, setauthorized] = useState(null)

    const auth= async ()=>{
        try{
        const response = await api.get('/verify')
            if(response.status == 200){
                setauthorized(true)
                return
            }else{
                console.log(response.status == 200)
                setauthorized(false)
                return
            }  
    }catch(err){
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