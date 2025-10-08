import React from 'react';
import { useState} from 'react';
import { clearmessage, setmessage } from '../../reduxfeatures/errormessage';
import {useDispatch } from 'react-redux';
import { setTotal,setCart ,deletecartItem,decreaseCount} from '../../reduxfeatures/getcartsslicer';
import axiosInstance from '../axiosinstance';

export default function Checkoutcart({items}) {
    const [quantityLoading , setQuantityLoading] = useState(true)
    const [deletionLoader, setDeletionLoader] = useState(true)
    const dispatch= useDispatch()
    const api = axiosInstance

    const deleteCartItem = async(id)=>{
    try{
      setDeletionLoader(false)
      const res = await api.delete(`/cart/${id}`)
      
      if(res.status == 200){
        dispatch(deletecartItem(id))
        dispatch(decreaseCount())
        dispatch(setTotal(res.data.total))
        dispatch(setmessage(res.data.message))
        setDeletionLoader(true)
        setTimeout(()=>{dispatch(clearmessage())},1000)
      } 
    }catch(err){
      console.log(err)
    }
  }

      const increaseQuantity = async(product_id,type)=>{
        try{
          const response = await api.patch('/cart',{product_id:product_id,"type":type})
          if(response.status == 200){
            dispatch(setCart({product_id,type}))
            dispatch(setTotal(response.data.cart.total))
            dispatch(setmessage(response.data.message))
            setTimeout(()=>{dispatch(clearmessage())},1000)
            setQuantityLoading(true)
            return
          }
        }catch(err){
          console.log(err)
          if(err.status == 403){
            console.log(err.response.data.message)
            dispatch(setmessage(err.response.data.message))
            setTimeout(()=>{dispatch(clearmessage())},1000)
            setQuantityLoading(true)
          }
        }
      }
  return (
    <div key={items._id} className='flex items-center rounded-md justify-between p-2 gap-2 md:mt-2 text-lg font-bold hover:bg-gray-200 hover:shadow-md'>
       <img className='md:w-[60px] w-[50px] h-[40px] object-cover rounded-md' src={items.product_id.image_url} alt={items.product_id.product_name}></img>
        <div className='flex-col text-sm flex gap-1 text-nowrap truncate'>
        <p className='font-bold text-nowrap truncate capitalize'>{items.product_id.product_name}</p>
        <p>{items.quantity}</p>
            </div>
            <div className='flex flex-col ml-auto'>
              <p className='ml-auto text-sm md:text-md'>${items.product_id.Price}</p>
            </div>
    </div>
  )
}
