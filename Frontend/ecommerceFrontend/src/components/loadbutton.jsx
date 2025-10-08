import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addtocartslice } from '../../reduxfeatures/addtocartslice'
import { useState ,useEffect} from 'react'

export default function Loadbutton({item}) {
    const dispatch = useDispatch()
    const token = useSelector((state)=> state.auth.token)
    const [loading , setLoading] = useState(false)
    
    const addtocartloading = useSelector((state)=>state.cart.loading)

    const handleDispatch=async(item,e)=>{
    e.stopPropagation()
    dispatch(addtocartslice(item))
  }

  return (
    <button disabled={addtocartloading[item._id]} onClick={(e)=>{handleDispatch({product_id: item._id,token},e)
        }} className='text-white bg-blue-950 text-sm md:text-base rounded-md p-1 mt-auto disabled:bg-gray-500'>
            {addtocartloading[item._id] ? <i class="fa-solid fa-spinner animate-spin"></i>:"Add to cart"}
    </button>

  )
}
