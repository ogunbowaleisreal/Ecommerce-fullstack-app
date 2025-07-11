import React, { useState } from 'react'
import api from '../api'

export default function Productview() {

    const[productDetails, setProductDetails] = useState([])
    const [loading,setLoading] = useState(false)

    const getProductDetails =async(product_id)=>{
        try{
            setLoading(true)
            const response = await api.get(`/products/${product_id}`)
            if(response.status == 200){
                setProductDetails(response.data)
                setLoading(false)
            }
        }catch(err){
            console.log(err)

        }
    }
  return (
    (loading && <div className='absolute inset-0 bg-black/50 flex justify-center items-center z-50'>
      <div className='bg-white md:w-[60vw] w-full md:h-[60vh] h-full p-2'>
        <img src='' className='w-1/2 md:h-1/2 h-[70%]'></img>
        <div>
            {productDetails}
        </div>
        </div>  
    </div>)
  )
}
