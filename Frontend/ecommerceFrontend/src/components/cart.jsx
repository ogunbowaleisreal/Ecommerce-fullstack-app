import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api'

export default function Cart({cart,toggleCart}){
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [total,setTotal] = useState('-')

  useEffect(()=>{getCart()
  },[])
  const getCart = async()=>{
    try{
    const response = await api.get('/cart')
    if(response.status == 200){
      const data = response.data
      console.log(data.cart.Products)
      setTotal(data.totalPrice)
      setCartItems(data.cart.Products)
    }
    }catch(err){
      console.log(err)
    }
  }

  const increaseQuantity = async(product_id,type)=>{
    try{
      const response = await api.patch('/cart',{product_id:product_id,"type":type})
      if(response.status == 200){
        await getCart()
        return
      }
    }catch(err){
      console.log(err)
      if(err.status == 403){
        console.log(err.response.data.message)
      }
    }
  }

  return (
        <section>
            <div className="w-full h-full flex bg-black/50 inset-0 absolute z-60 ">
            <div onClick={()=>{toggleCart(!cart)}} className="md:w-full bg-transparent"></div>
            <aside className=" w-full text-blue-950 md:w-[50vw] lg:w-[40vw] h-full rounded-md bg-white p-2">
              {loading && 
              <div className='flex items-center self-center bg-amber-300'>
                Loading...</div>}
                <p className='font-bold text-lg'>Your Cart</p>
                <div className='flex flex-col gap-2'>
                  {cartItems.map((items)=>{
                    return <div key={items._id} className='flex p-2 gap-2 text-lg font-bold'>
                      <img className='w-[80px] h-[80px] self-start rounded-md' src={items.product_id.image_url} alt={items.product_id.product_name}></img>
                      <div className='self-start flex-col gap-3'>
                        <p className='text-lg font-bold'>{items.product_id.product_name}</p>
                        <div className='flex gap-2 items-center text-sm'>
                          <i onClick={()=>{increaseQuantity(items.product_id._id,"reduce")}}
                         class="fa-solid fa-minus p-1 rounded-full hover:bg-gray-300"></i><p className='p-1 bg-gray-300 rounded-sm'>{items.quantity}</p>
                         <i onClick={()=>{increaseQuantity(items.product_id._id,"increase")}} class="fa-solid fa-plus p-1 rounded-full hover:bg-gray-300"></i>
                         </div>
                        </div>
                      <p className='ml-auto'>{items.product_id.Price}</p>
                    </div>
                  })}
                  <div className='flex justify-between font-bold'>
                    <p>Total</p>
                    <p>{total}</p>
                  </div>
                  <button className='bg-blue-950 text-white rounded-sm p-1'>Checkout</button>
            </div>
            </aside>
            </div>
        </section>
  )
}
