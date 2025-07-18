import React from 'react';
import api from "../api.js";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Navigate, useNavigate,Outlet} from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx';
import Maincontent from '../components/Maincontent.jsx';
import Productform from '../components/productform.jsx';
import Success from '../components/error/success.jsx';
import Orders from '../components/orders.jsx';
import { useDispatch, useSelector } from 'react-redux';

export default function Admindashboard({productForm, setproductForm,products,setProducts}) {
  const navigate = useNavigate()
  const [sideBar,setsideBar] = useState(false)
  const [content, setContent] = useState('dashboard')
  const [error, seterror] = useState(false)
  const toggle = useSelector((state)=>state.error.toggle)
  const value= useSelector((state)=>state.error.value)
 
    const logout=async()=>{
        try{
            const response = await api.get("/logout")
            if(response.status== 200){
                navigate("/login")
            }
        }catch(err){
            navigate('/login')
        }
    }

  const getProducts = async()=>{

    try{

    const response = await api.get("/admin");
    const data = response.data
    if(response.status == 200){
    setProducts(data)
    }
  }catch(err){
    seterror(err.response.data.message)
    navigate("/error")
  }}

  
  useEffect(()=>{getProducts()
    setTimeout(()=>{seterror(null)},5000)
  },[])
  if(products== null && error == null){
    return <div>
      LOADING...
    </div>
  }
  return (
    <main className='flex flex-col bg-gray-100 h-screen relative'>
      {toggle && <Success error={value}></Success>}
      {productForm && <Productform productForm={productForm} setproductForm = {setproductForm}
       setProducts={setProducts} products={products} ></Productform>}
        <div className='flex h-full'>
          <Sidebar sideBar={sideBar} setsideBar={setsideBar}></Sidebar>
        <div className='flex flex-col w-full'>
            <nav className='w-full h-[50px] p-2 bg-white flex items-center'>
              <p className='md:hidden text-lg font-bold'><i onClick={()=>{setsideBar(!sideBar)}} class="fa-solid fa-bars md:!hidden"></i> Admin panel</p>
              <button onClick={()=>{logout()}} className='bg-blue-950 text-white ml-auto mr-2 rounded-sm p-2'><i class="fa-solid fa-arrow-left"></i> Logout</button>
            </nav>
            <Outlet/>
      </div>
      </div>
    </main>
  )
};
