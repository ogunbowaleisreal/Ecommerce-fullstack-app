import React from 'react'
import axiosInstance from '../axiosinstance';
import { useEffect } from 'react';
import { getcartslice } from '../../reduxfeatures/getcartsslicer';
import { useSelector, useDispatch } from 'react-redux';
import Checkoutcart from './CheckoutCart';


export default function Checkout() {
  const dispatch= useDispatch()
  const axios = axiosInstance
  const items = useSelector((state)=>state.getcart.cartitems)
  const newtotal = useSelector((state)=>state.getcart.total) 
  const testloading = useSelector((state)=> state.getcart.loading)
  const user_id = useSelector((state)=>state.auth.user_id)
  
  console.log(items)
  const handlePayment = async()=>{
    try{
      console.log(items)
      const res = await axios.post("/checkout",{user_id: user_id})
      if(res.status == 200){
        const payment_url= res.data.url
        window.location.href = payment_url
      }
      
    }catch(err){
      console.log(err)
    }
   }

  return (
    <div className='w-full h-full overflow-y-auto'>
      <img src="/deyan-sight-OhjG66NrPqk-unsplash.jpg" className='object-cover h-[20vh] md:h-[40vh] w-full'></img>
      <div className='w-full flex md:flex-row flex-col'>
        <div className='md:w-[50vw]  bg-white font-bold text-blue-950 p-2'>
          ADDRESS
          <div>

          </div>
          <div className='flex flex-col gap-2'>
            <label className='flex flex-col'>
              Address
              <input className='border-2 border-gray-400 p-1 rounded-md ml-2 h-[32px]' type='text' id='address' placeholder='enter street address'></input>
            </label>
            <label className='flex flex-col gap-2'>
              City
              <input className='border-2 border-gray-400 p-1 rounded-md h-[32px] ml-2' type='text' id='city' placeholder='enter city'></input>
            </label>
          </div>
        </div>
        <div className='md:w-[50vw] md:shadow-[-4px_0_6px_rgba(0,0,0,0.1)] bg-white md:min-h-[60vh]'>
                      <aside className=" w-full text-blue-950 md:w-full lg:w-full h-full md:h-full rounded-md bg-white md:p-1 p-1 overflow-y-auto">   
                          {testloading == true ? <div className='flex h-full items-center justify-center '> <p className='animate-pulse'>Loading...</p></div> 
                          : <div className='flex md:p-2 flex-col gap-2'>
                            {items.map((items,index)=>{
                              return <Checkoutcart key={index} items={items}/>
                            })}
                            <div className='flex-col mt-auto w-full'>
                            <div className='flex mt-auto justify-between font-bold'>
                              <p>Total</p>
                              <p>${parseFloat(newtotal).toFixed(2)}</p>
                            </div>
                            </div>
                      </div>}
                      <button onClick={()=>{handlePayment()}} className='bg-blue-950 w-full text-white mt-auto rounded-sm p-1'>Proceed to payment</button>               
                      </aside>
        </div>
      </div>
    </div>
  )
}
