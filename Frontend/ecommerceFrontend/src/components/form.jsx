import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import useAxios from '../api.js'
import useAuth from "../useAuth.js";


function Form({route,method}){
  const api = useAxios()
    const { accessToken, setAccessToken } = useAuth();
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [error, seterror]= useState(false)
  const navigate = useNavigate();
  const name = method == 'Login' ? 'Login': 'Register'

  const formSubmission = async(e)=>{
    e.preventDefault()
    try{
      if(!username || !password){
        seterror(true)
        navigate("/login")
        return
      }
        const response = await api.post(route,{"username": username,
        "password": password })
        
    if(name == 'Login'){  
    if(response.status== 200){
      console.log(response)
      const data = response.data.access_token
      console.log(data)
      setAccessToken(data)
      navigate("/")
      return
    }
    seterror(true)
    navigate("/login")
    return
    }
    navigate("/login")
  }catch(err){
    seterror(true)
    console.log(err)

  }
}

  return (
    <div class= "min-h-screen flex w-full">
      <div class = "flex bg-blue-400 min-h-screen w-full justify-center items-center relative">
      {error && <div class="absolute top-0 font-bold text-4xl bg-red-600 w-full text-center p-1" >Error</div>}
    <form class= "flex p-10  w-md" onSubmit={formSubmission}>
      <div class= "grid w-full text-center">  
      <h1 class="text-4xl font-bold mb-5"><i class="fa-solid fa-cart-shopping fa-4x"></i></h1>
      <input type="text" class="w-full font-bold mb-5 p-1 border-2 border-white rounded-sm focus:border-white focus:outline-none" onChange={(e)=>{setusername(e.target.value)}}
       value={username} placeholder='username'/>
      <input  type="password" class="w-full font-bold mb-10 p-1 border-2 border-white rounded-sm focus:border-white focus:outline-none" onChange={(e)=>{setpassword(e.target.value)}} 
      value={password}  placeholder= "Enter password" />
      <button class = "bg-white p-2 text-blue-500 rounded-sm" type='submit'> {name.toUpperCase()}</button>
      {name == "Login" ? <p class = "text-white hover:cursor-default mt-2" onClick={()=>{navigate("/register")}} >Register</p>
       : <p class= "text-blue-400 hover:cursor-default" onClick={()=>{navigate("/login")}}>Already have an account ? Login instead </p>} 
      </div>
    </form>
    </div>
    </div>

  )
}

export default Form