import React, { useState } from 'react'
import { useEffect } from 'react'
import api from '../api'
import { useSelector,useDispatch } from 'react-redux';
import { clearmessage, setmessage } from '../../reduxfeatures/errormessage';
import Cartitemcard from './cartitemcard';
import useAxios from '../api';

export default function Cart({cart,toggleCart}){
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [total,setTotal] = useState('-')
  const dispatch = useDispatch()
  const [quantityLoading ,setQuantityLoading] = useState(true)
  const api = useAxios()

  useEffect(()=>{getCart()
  },[])
  const getCart = async()=>{
    try{
      setLoading(true)
    const response = await api.get('/cart')
    if(response.status == 200){
      const data = response.data
      console.log(data.cart)
      setTotal(data.totalPrice)
      setCartItems(data.cart.Products)
      setLoading(false)
    }
    }catch(err){
      console.log(err)
    }
  }

  const deleteCartItem = async()=>{

    try{
      const res = await api.delete('/cart',)
    }catch(err){
      console.log(err)
    }
  }
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
        <section>
            <div className="w-full h-full flex bg-black/50 inset-0 absolute z-60 ">
            <div onClick={()=>{toggleCart(!cart)}} className="md:w-full bg-transparent"></div>
            <aside className=" w-full text-blue-950 md:w-[60vw] lg:w-[40vw] h-full rounded-md bg-white p-2 overflow-y-auto">
                <div className='flex w-full'>
                <p className='font-bold text-lg'>Your Cart</p>
                <p onClick={()=>{toggleCart(!cart)}} className='hover:bg-gray-300 ml-auto rounded-full '><i class="fa-solid fa-xmark p-1"></i></p>
                </div>
                {loading == true ? <div className='flex h-full items-center justify-center '> <p className='animate-pulse'>Loading...</p></div> 
                : <div className='flex h-[calc(100%-29px)] overflow-y-auto flex-col gap-2'>
                  {cartItems.map((items)=>{
                    return <Cartitemcard items={items} setTotal={setTotal} setCartItems={setCartItems}/>
                  })}
                  <div className='flex justify-between font-bold'>
                    <p>Total</p>
                    <p>${parseFloat(total).toFixed(2)}</p>
                  </div>
                  <button className='bg-blue-950 text-white rounded-sm p-1'>Checkout</button>
            </div>}
            </aside>
            </div>
        </section>
  )
}
