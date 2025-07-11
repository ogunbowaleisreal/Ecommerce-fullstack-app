import React from 'react'
import { useState } from 'react'
import api from "../api"


export default function Productform({productForm,setproductForm}){
    const[category,setCategory]=useState("")
    const[Amount,setAmount] = useState("")
      const [image, setImage] = useState(null)
    const [formData, setFormData] = useState({"product_name":"","price":"","discounted_price":"",
    "category":"","quantity":"","description":"",'image_url': image})
    const[error,setError]=useState(false)
  

      const handleChange = (e)=>{
        const {name,value,type,files} = e.target;
        if(type == 'file'){
          setImage(files[0])
        }else{
        setFormData((formData)=>(
          {...formData, [name]:value}
        ))
        setTimeout(()=>{setError(null)},3000)
      }
    }
      const handleSubmit=async()=>{
        try{
            const response = await api.post('/admin',formData)
            if(response.status == 200){
                setError(response.data)
                setTimeout(()=>{setError(null)},3000)
            }
        }catch(err){
                console.log(err)
                setError(err.response.data.message)
                setTimeout(()=>{setError(null)},3000)
        }
      }
  return (
           <div className='absolute inset-0 bg-black/50 z-50 flex'>
      <div onClick={()=>{setproductForm(!productForm)}}className='bg-transparent w-1/6 md:w-full h-full'>
      </div>

      <aside className='bg-white ml-auto md:w-3/5 lg:w-3/10 w-5/6 overflow-y-auto rounded-md flex flex-col p-3 gap-2 '>
      <div className='flex'>
        <p className='text-base font-bold text-blue-950 mb-auto'>Add new product</p>
        <i onClick={()=>{setproductForm(!productForm)}} class="fa-solid fa-xmark ml-auto mb-auto rounded-full hover:bg-gray-200 p-3"></i>
        </div>
        <form onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col gap-2 text-sm justify-center h-full'>
          <label className='font-bold w-full'>
            Upload Image
          <input type='file' name='image_url' onChange={handleChange} className='border-1 h-[80px] rounded-md w-full p-1'
            placeholder='input product name'></input>
          </label>
          <label className='font-bold'>
            <p>Product Name</p>
            <input type='text' name='product_name' onChange={handleChange} value={formData.product_name} 
             className='border-1 rounded-md p-1 w-full'placeholder='Enter title'></input>
          </label>
          <label className='font-bold'>
            <p>Description</p>
            <input type='text' name='description' onChange={handleChange}  value={formData.description}  
             className='border-3 border-blue-950  rounded-sm p-1 w-full h-[80px]'placeholder='Write a description'></input>
          </label>
          <label className='font-bold'>
            <p>Category</p>
            <input type='select' name='category' onChange={handleChange}  value={formData.category}   
            className='border-1 rounded-sm p-1 w-full'placeholder='Write a description'></input>

          </label>
                    <label className='font-bold'>
            <p>Price</p>
            <input type='number' name='price' onChange={handleChange}  value={formData.price}
             className='border-1 rounded-sm p-1 w-full'placeholder='Input price'></input>
          </label>
          <label className='font-bold'>
            <p>Discounted Price</p>
            <input type='text' name='discounted_price' onChange={handleChange} value={formData.discounted_price}
             className='border-1 rounded-sm p-1 w-full'placeholder='input discounted price'></input>
          </label>
          <label className='font-bold'>
            <p>Quantity</p>
            <input type='number' name='quantity' onChange={handleChange} value={formData.quantity}
             className='border-1 rounded-sm p-1 w-full'placeholder='Input stock quantity'></input>
          </label>
          <button type='submit' className='bg-blue-950 ml-auto p-2 text-sm rounded-md text-white mt-auto'>Add product</button>
        </form>
      </aside>
      </div>
  )
}
