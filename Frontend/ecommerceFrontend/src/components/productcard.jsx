import React from 'react'
import {useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { addtocartslice } from '../../reduxfeatures/addtocartslice'
import { getproductslice } from '../../reduxfeatures/getproductslicer'
import Loadbutton from './loadbutton'

export default function Productcard({products}) {
    const [loading , setLoading] = useState(false)
    const dispatch = useDispatch()
    const token = useSelector((state)=> state.auth.token)
    const addtocartloading = useSelector((state)=>state.cart.loading)

      const handleDispatch=(item,e)=>{
    e.stopPropagation()
    dispatch(addtocartslice(item))
  }

  const showDetails=(product_id)=>{
    dispatch(getproductslice({product_id}))
  }
  return (
   <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 h-[calc(100vh-114px)] overflow-y-auto font-bold capitalize'>
          {products.map((item)=>
            <div key={item._id} onClick={()=>{showDetails(item._id)}} className='flex flex-col h-[200px] rounded-md gap-1 md:h-[280px] bg-white text-blue-950 p-2'>
              <img className ="rounded-md object-cover h-[100px] md:h-[180px] xlg:h-[400px] w-full" src={item.image_url} alt={item.category}></img>
              <div className='flex flex-col mt-auto'>
              <p className='text-sm md:text-md text-nowrap truncate'>{item.product_name}</p>
              <div className='flex justify-between'>
              <p className='text-xs md:text-md md:font-bold'>${item.Price}</p>
              <p className='text-xs md:text-md md:font-bold'>{item.discounted_price !== item.Price && item.discounted_price !== undefined ? `$${item.discounted_price}`:""}</p>
              </div>
              <p className='text-xs text-wrap text-black'>{item.quantity} items left</p>
              <Loadbutton item={item}/>
              </div>
            </div>
            )}
        </div> 
  )
}
