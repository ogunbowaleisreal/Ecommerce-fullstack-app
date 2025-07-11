import React from 'react'
import { useState,useEffect } from 'react';
import api from '../api';


export default function Maincontent({productForm,setproductForm}) {
  const [products, setProducts] = useState()

  const getProducts = async()=>{
    try{
    const response = await api.get('/admin')
    const allproducts = response.data
    setProducts(allproducts)
  }catch(err){
    console.log(err)
  }
  }
  useEffect(()=>{getProducts()},[])

    if(products == null){
    return <div className='flex justify-center items-center w-full h-full animate-pulse'>
      <p>LOADING...</p>
    </div>
  }
      return (
        <section className='bg-gray-200 w-full h-full flex flex-col gap-2 p-2'>
        <div className='flex text-white'>
          <button onClick={()=>{setproductForm(!productForm)}} className='bg-blue-950 ml-auto p-2 rounded-md'><i class="fa-solid fa-plus"></i> Add new product</button>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 h-[calc(100vh-114px)] font-bold overflow-y-scroll'>
          {products.map((item)=>
            <div key={item._id} className='flex flex-col rounded-md bg-white text-blue-950 p-2'>
              <img className ="rounded-md object-cover h-auto w-full" src={item.image_url} alt={item.category}></img>
              <p className='text-sm md:text-lg'>{item.product_name}</p>
              <p className=' md:font-extrabold'>${item.Price}</p>
            </div>
            )}
        </div>
        </section>
  )
}
