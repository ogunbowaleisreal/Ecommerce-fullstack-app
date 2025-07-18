import React, { useEffect, useState } from 'react'
import useAxios from '../api';
import { useSelector, useDispatch } from 'react-redux';
import { cleardetails } from '../../reduxfeatures/getcartslicer';

export default function Productview() {

    const[productDetails, setProductDetails] = useState([])
    const dispatch = useDispatch();
    const loading = useSelector((state)=> state.getproduct.loading)
    const items = useSelector((state)=>state.getproduct.items)
    const api = useAxios()

    const getProductDetails =async(product_id)=>{
        try{
            const response = await api.get(`/products/${product_id}`)
            if(response.status == 200){
                setProductDetails(response.data)
            }
        }catch(err){
            console.log(err)

        }
    }
  return (
    (<div className='absolute inset-0 bg-black/50 flex md:justify-center items-center z-50'>
      <div className='bg-white md:w-[50vw] w-4/5 md:rounded-md md:h-[60vh] h-full md:p-4 p-2'>
        {loading ?<div className='w-full h-full md:flex-row flex flex-col gap-3 relative overflow-y-auto'>
      <i onClick={()=>{dispatch(cleardetails())}}  class="fa-solid fa-xmark absolute top-0 right-0"></i>
      <h2 className='font-extrabold text-blue-950 md:hidden'>Product Details</h2>
          <img src={items.product.image_url} className='w-full md:w-1/2 md:h-[70%] h-[30%] object-cover rounded-sm'></img>
          <div className='w-full h-full flex flex-col gap-2'>
            <div className='h-1/2 flex flex-col w-full'>
                  <p className='md:text-xl text-lg font-bold text-blue-950 capitalize'>{items.product.product_name}</p>
                  <p className='font-semibold text-base text-gray-700 capitalize'>{items.product.product_name}</p>
                  <p className='text-lg font-bold text-blue-950'>${items.product.Price}</p>
                  <div className='w-full flex flex-col md:mt-auto'>
                    <p>star section</p>
                    <button className='bg-indigo-950 text-white rounded-sm p-1'>Add To Cart</button>
                  </div>
                  </div>
            <div className='md:h-1/2 md:overflow-y-scroll'>
              <p className='font-bold text-blue-950 text-lg'>Reviews</p>
              <p>Reviews</p>
              <p>Reviews</p>
              <p>Reviews</p>
              <p>Reviews</p>
              <p>Reviews</p>
              <p>Reviews</p>
              <p>Reviews</p>
              <p>Reviews</p>
              <p>Reviews</p>
              <p>Reviews</p>
              <p>Reviews</p>
            </div>
            </div>
        </div>:<div className='h-full w-full animate-pulse flex items-center justify-center'><p>Loading...</p></div>}
        </div>
        <div onClick={()=>{dispatch(cleardetails())}} className='bg-transparent w-1/5 h-full md:hidden'></div> 
    </div>)
  )
}
