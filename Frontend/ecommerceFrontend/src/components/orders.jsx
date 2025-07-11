import React from 'react'
import { useEffect, useState } from 'react'
import api from '../api'

export default function Orders({}){
  const [orders, setOrders] = useState(null)

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
    <div className='flex flex-col bg-gray-300 text-xs md:text-sm text-blue-950 md:p-6 p-2 h-full rounded-md'> 
      <div className='flex flex-col bg-white h-full rounded-md font-bold p-2 overflow-x-auto w-full'>
        <table className='w-full border-spacing-2 border-separate'>
          <tr className='w-full mb-1'>
            <td>Order Id</td>
            <td>Date</td>
            <td>Status</td>
            <td>Price</td>
            <td>Details</td>
          </tr>
      {orders.map((item)=>
         <tr key={item._id} className=''>
          <td>{item._id}</td>
          <td className='text-nowrap'>{new Date(item.createdAt).toDateString()}</td>
          <td> <p className={`rounded-lg p-1 text-white  ${item.status == 'Ordered' ? "bg-blue-950": "bg-green-500"}`}>{item.status}</p></td>
          <td>${parseInt(item.totalAmount)}</td>
          <td><button className='bg-blue-950 rounded-md text-white p-1'> View Details</button></td>
         </tr>
      )}
      </table>
      </div>
    </div>
  )
}
