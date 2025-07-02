import React from 'react';
import api from "../api.js";
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Maincontent from '../components/Maincontent.jsx';

export default function Admindashboard() {
  const [products, setProducts] = useState(null)
  const [productForm, setproductForm] = useState(true)
  const [sideBar,setsideBar] = useState(true)
  const [error, seterror] = useState(null)

  const getProducts = async()=>{
    try{
    const response = await api.get("/admin");
    const data = response.data
    if(response.status == 200){
    setProducts(data)
    }
  }catch(err){
    seterror(err.response.data.message)
  }}
  
  useEffect(()=>{getProducts()
  },[])
  if(products== null && error == null){
    return <div>
      LOADING...
    </div>
  }
  return (
    <main className='flex flex-col bg-gray-100 h-screen relative'>
      {productForm && <div className='absolute inset-0 bg-black/50 z-50 flex'>
      <div onClick={()=>{setproductForm(!productForm)}}className='bg-transparent w-0 md:w-full h-full'>
      </div>
      <aside className='bg-white ml-auto md:w-3/5 lg:w-3/10 w-full rounded-md flex flex-col p-2'>
        <i onClick={()=>{setproductForm(!productForm)}} class="fa-solid fa-xmark ml-auto rounded-full hover:bg-gray-200 p-1"></i>
        <form>
          <label>
            Product name
          <input type='text' className='border border-black' placeholder='input product name'></input>
          </label>
        </form>
      </aside>

      </div>}
        <div className='flex h-full'>
      <div className={`md:flex md:flex-col h-full md:w-2/5 lg:w-2/10  w-full gap-4 absolute md:relative flex bg-black/50 ${sideBar? "hidden":""}`}>
      <div className='bg-white relative flex flex-col w-full gap-4 h-full'>
        <div className='h-[50px] flex font-bold text-lg text-blue-950'>
          <p className='mt-auto flex gap-1 items-center pl-2'><i onClick={()=>{setsideBar(!sideBar)}} class="fa-solid fa-xmark md:!hidden absolute top-1 left-1" ></i>
          <i class="fa-solid fa-signal"></i> Admin panel</p>
          </div>
          <div className='flex flex-col gap-2 justify-center w-full pl-1 pr-1 text-lg text-blue-950'>
        <p className='hover:bg-gray-300 rounded-md h-[35px] py-1 px-2'><i class="fa-solid fa-gauge"></i> Dash board</p>
        <p className='hover:bg-gray-300 rounded-md h-[35px] py-1 px-2'><i class=" fa-solid fa-basket-shopping"></i> Products</p>
        <p className='hover:bg-gray-300 rounded-md h-[35px] py-1 px-2'><i class="fa-solid fa-truck"></i> Orders</p>
          </div>
          </div>
            <div onClick={()=>{setsideBar(!sideBar)}} className='z-50 h-full md:hidden ml-auto bg-transparent w-[100px]'>
          </div>
        </div>
        <div className='flex flex-col w-full'>
            <nav className='w-full h-[50px] p-2 bg-white flex items-center'>
              <p className='md:hidden'><i onClick={()=>{setsideBar(!sideBar)}} class="fa-solid fa-bars md:!hidden"></i> Admin panel</p>
              <button className='bg-blue-950 text-white ml-auto mr-2 rounded-sm p-2'><i class="fa-solid fa-arrow-left"></i>  Logout</button>
            </nav>
            <Maincontent productForm={productForm} setproductForm={setproductForm}></Maincontent>
      </div>
      </div>
    </main>
  )
};
