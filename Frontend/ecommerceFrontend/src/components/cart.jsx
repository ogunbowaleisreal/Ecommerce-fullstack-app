import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import Cartitemcard from './cartitemcard';
import {useNavigate} from 'react-router-dom';
import { getcartslice } from '../../reduxfeatures/getcartsslicer';

export default function Cart({cart,toggleCart}){
  const [cartItems, setCartItems] = useState([])
  const dispatch = useDispatch()
  const items = useSelector((state)=> state.getcart.cartitems)
  const testloading = useSelector((state)=> state.getcart.loading)
  const newtotal = useSelector((state)=>state.getcart.total)
  const navigate = useNavigate()
  const token = useSelector((state)=>state.auth.token)
  const user_id = useSelector((state)=>state.getcart.user_id)
  
  useEffect(()=>{
        dispatch(getcartslice(token))
  },[])
  if(items == []){
    return <div className='w-full h-full bg-white flex justify-center items-center'> <p>oops nothing in cart yet</p></div>
  }

  return (
        <section>
            <div className="w-full h-full flex bg-black/50 inset-0 absolute z-60 ">
            <div onClick={()=>{toggleCart(!cart)}} className="md:w-full bg-transparent"></div>
            <aside className=" w-[90vw] text-blue-950 md:w-[60vw] lg:w-[40vw] h-full rounded-md bg-white p-2 overflow-y-auto">
                <div className='flex w-full'>
                <p className='font-bold text-md'>Cart</p>
                <p onClick={()=>{toggleCart(!cart)}} className='hover:bg-gray-300 ml-auto rounded-full '><i class="fa-solid fa-xmark p-1"></i></p>
                </div>
                {testloading == true ? <div className='flex h-full items-center justify-center '> <p className='animate-pulse'>Loading...</p></div> 
                : <div className='flex h-[calc(100%-29px)] overflow-y-auto flex-col gap-1'>
                  {items.map((items,index)=>{
                    return <Cartitemcard key={index} items={items}/>
                  })}
                  <div className='flex-col mt-auto w-full'>
                  <div className='flex mt-auto justify-between font-bold'>
                    <p>Total</p>
                    <p>${parseFloat(newtotal).toFixed(2)}</p>
                  </div>
                  <button onClick={()=>{navigate('checkout')
                    toggleCart(!cart)
                  }} className='bg-blue-950 w-full text-white mt-auto rounded-sm p-1'>Checkout</button>
                  </div>
            </div>}
            </aside>
            </div>
        </section>
  )
}
