import React from 'react'
import { useState, useEffect } from 'react';
import { clearmessage, setmessage } from '../../reduxfeatures/errormessage';
import { useSelector,useDispatch } from 'react-redux';
import useAxios from '../api';


export default function Cartitemcard({items,setCartItems,setTotal}) {
    const [quantityLoading , setQuantityLoading] = useState(true)
    const dispatch= useDispatch()
    const api = useAxios()

      const increaseQuantity = async(product_id,type)=>{
        
        try{
          const response = await api.patch('/cart',{product_id:product_id,"type":type})
          if(response.status == 200){
            console.log(response.data)
            setCartItems(response.data.cart.Products)
            setTotal(response.data.cart.total)
            dispatch(setmessage(response.data.message))
            setTimeout(()=>{dispatch(clearmessage())},5000)
            setQuantityLoading(true)
            return
          }
        }catch(err){
          console.log(err)
          if(err.status == 403){
            console.log(err.response.data.message)
            dispatch(setmessage(err.response.data.message))
            setTimeout(()=>{dispatch(clearmessage())},5000)
          }
        }
      }
  return (
    <div key={items._id} className='flex p-2 gap-2 text-lg font-bold'>
       <img className='md:w-[60px] w-[50px] h-[70px] object-cover rounded-md' src={items.product_id.image_url} alt={items.product_id.product_name}></img>
        <div className='flex-col flex gap-3 text-nowrap truncate'>
        <p className='text-lg font-bold text-nowrap truncate'>{items.product_id.product_name}</p>
        {quantityLoading ? <div className='flex gap-2 mt-auto items-center text-sm'>
        <i onClick={()=>{
            setQuantityLoading(false)
            increaseQuantity(items.product_id._id,"decrease")}}
            class="fa-solid fa-minus p-1 rounded-full hover:bg-gray-300"></i><p className='p-1 bg-gray-300 rounded-sm'>{items.quantity}</p>
            <i onClick={()=>{
            setQuantityLoading(false)
            increaseQuantity(items.product_id._id,"increase")}} class="fa-solid fa-plus p-1 rounded-full hover:bg-gray-300"></i>
            </div> : <i class="fa-solid fa-spinner self-start ml-5 animate-spin"></i>}
            </div>
            <div className='flex flex-col ml-auto'>
                <p className='ml-auto'>${items.product_id.Price}</p>
                <p className='ml-auto mt-auto'><i class="fa-solid fa-trash"></i></p>
            </div>
    </div>
  )
}
