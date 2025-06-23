import {Navigate, useNavigate} from 'react-router-dom';
import api from '../api';
import { useState, useEffect } from 'react';
import React from 'react';

function ProtectedRoute({route,children}){

    const [authorized, setauthorized] = useState(null)
    console.log(route)
    const auth= async ()=>{
        try{
            if(route=="home"){               
        const response = await api.get('/verify')
            if(response.status == 200){
                setauthorized(true)
                return
            }else{
                console.log(response.status == 200)
                setauthorized(false)
                return
            }
        }else{
        const response = await api.get('/verifyadmin')
            if(response.status == 200){
                setauthorized(true)
                return
            }else{
                console.log(response.status == 200)
                setauthorized(false)
                return
            }  
        }
    }catch(err){
        console.log(err)
        setauthorized(false)
    }
    }
    useEffect(()=>{auth()},[])

        if(authorized == null){
        return <div class= "min-h-screen justify-center items-center flex">
            <div>
                ......loading Transactions
            </div>
            </div>
    }
    return( authorized ? children : <Navigate to ='/login'/>)
}

export default ProtectedRoute