import React from 'react'
import { useEffect, useState } from 'react'
import axiosInstance from '../axiosinstance'

export default function Orders({}){
  const [orders, setOrders] = useState(null)
  const api = axiosInstance

  const getorders =async ()=>{
    try{
      const response = await api.get('/orders')
      if(response.status == 200){
      const data = response.data
      console.log(data)
      setOrders(data)
      }

    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getorders()
  },[])

  if(orders == null){
    return <div className='flex justify-center items-center w-full h-full animate-pulse'>
      <p>LOADING...</p>
    </div>
  }
  return (
    <div className='flex flex-col bg-white md:bg-gray-300 text-xs md:text-sm text-blue-950 md:p-3 p-2 h-full rounded-md'> 
      <div className='flex flex-col bg-white h-full rounded-md gap-1.5 font-bold overflow-x-auto w-full'>
        <p className='font-bold'>ORDERS</p>
        <div className='w-full border-spacing-2 md:p-2 flex flex-col border-separate gap-3'>
          <div className='w-full hidden md:grid md:grid-cols-5 gap-3 items-center justify-items-center mb-1 '>
            <p className=''>Order Id</p>
            <p>Date</p>
            <p>Status</p>
            <p>Price</p>
            <p>Details</p>
          </div>
      {orders.map((item)=>
         <div key={item._id} className='bg-blue-200 md:bg-inherit p-1 rounded-sm gap-1 flex flex-col md:grid md:grid-cols-5 md:gap-3 md:items-center md:justify-items-center w-full'>
          <div className='w-full flex'><p className='md:hidden'>Order Id: </p> <p className='md:truncate md:w-[150px] ml-auto'>{item._id}</p></div>
          <div className='text-nowrap flex'><p className='md:hidden'>Date:</p> <p className='ml-auto'>{new Date(item.createdAt).toDateString()}</p></div>
          <div className='flex items-center'><p className='md:hidden'>Status:</p><p className={`rounded-lg p-1 text-white ml-auto ${item.status == 'Ordered' ? "bg-blue-950": "bg-green-500"}`}>{item.status}</p></div>
          <div className='flex'><p className='md:hidden'>Price: </p><p className='ml-auto'>${parseInt(item.totalAmount)}</p></div>
          <div className='flex'><button className='bg-blue-950 rounded-md text-white p-1 ml-auto'> View Details</button></div>
         </div>
      )}
      </div>
      </div>
    </div>
  )
}
