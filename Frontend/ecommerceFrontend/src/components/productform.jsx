import React from 'react'
import { useState } from 'react'
import useAxios from '../api'; 
import { useDispatch, useSelector } from 'react-redux';
import { setmessage,clearmessage} from '../../reduxfeatures/errormessage';

export default function Productform({productForm,setproductForm,setProducts,products}){
      const [image, setImage] = useState(null)
    const [formData, setFormData] = useState({"product_name":"","Price":"","discounted_price":"",
    "category":"","quantity":"","description":""})
    const[error,setError]=useState(false)
    const [loading,setLoading] = useState(true)
    const dispatch = useDispatch()
    const api = useAxios()
  

      const handleChange = (e)=>{
        const {name,value,type,files} = e.target;
        if(type == 'file'){
          setImage(files[0])
        }else{
        setFormData((formData)=>(
          {...formData, [name]:value}
          
        ))
        console.log(formData)
        setTimeout(()=>{setError(null)},3000)
      }
    }

      const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(false)
        const data = new FormData();
        Object.entries(formData).forEach(([key,value])=>{
          data.append(key,value)  
        })

        if(image){
        data.append('image_url',image)
        }
        try{
            const response = await api.post('/admin',data)
            if(response.status == 200){
              console.log(response.data)
              const data = response.data.newProduct
              setProducts((prev)=>[data,...prev])
              setLoading(true)
              dispatch(setmessage(response.data.message))
              setTimeout(()=>{dispatch(clearmessage(response.data.message))},5000)
            }
        }catch(err){
                console.log(err)
        }
      }
  return(
          <div className='absolute inset-0 bg-black/50 z-50 flex'>
      <div onClick={()=>{setproductForm(!productForm)}}className='bg-transparent w-1/6 md:w-full h-full'>
      </div>
      <aside className='bg-white ml-auto md:w-3/5 lg:w-3/10 w-5/6 overflow-y-auto rounded-md flex flex-col p-3 gap-2 '>
      <div className='flex'>
        <p className='text-base font-bold text-blue-950 mb-auto'>Add New Product</p>
        <i onClick={()=>{setproductForm(!productForm)}} class="fa-solid fa-xmark ml-auto mb-auto rounded-full hover:bg-gray-200 p-3"></i>
        </div>
        <form onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col gap-2 text-sm justify-center h-full'>
          <label className='font-bold w-full'>
            Upload Image
          <input type='file' name='image_url' required onChange={handleChange} className='text-center border-1 border-gray-300 h-[70px] rounded-md w-full p-1'
            placeholder='Enter Product Pame'></input>
          </label>
          <label className='font-bold'>
            <p>Product Name</p>
            <input type='text' name='product_name' required onChange={handleChange} value={formData.product_name} 
             className='border-1 border-gray-300 rounded-md p-1 w-full'placeholder='Enter Title'></input>
          </label>
          <label className='font-bold'>
            <p>Description</p>
            <input type='text' name='description' required onChange={handleChange}  value={formData.description}  
             className='border-3 border-blue-950  rounded-sm p-1 w-full h-[70px]'placeholder='Enter description'></input>
          </label>
          <label className='font-bold'>
            <p>Category</p>
            <input type='select' name='category' required onChange={handleChange}  value={formData.category}   
            className='border-1 border-gray-300 rounded-sm p-1 w-full'placeholder='Enter Category'></input>
          </label>
            <label className='font-bold'>
            <p>Price</p>
            <input type='number' name='Price' required onChange={handleChange}  value={formData.Price}
             className='border-1 border-gray-300 rounded-sm p-1 w-full'placeholder='Enter price'></input>
          </label>
          <label className='font-bold'>
            <p>Discounted Price</p>
            <input type='text' name='discounted_price' required onChange={handleChange} value={formData.discounted_price}
             className='border-1 border-gray-300 rounded-sm p-1 w-full'placeholder='Enter Discounted Price'></input>
          </label>
          <label className='font-bold'>
            <p>Quantity</p>
            <input type='number' name='quantity' required onChange={handleChange} value={formData.quantity}
             className='border-1 border-gray-300 rounded-sm p-1 w-full text-blue-950 font-bold'placeholder='Enter Quantity'></input>
          </label>
          <button type='submit' className='bg-blue-950 ml-auto p-2 text-sm rounded-md text-white mt-auto min-w-[100px]'>
            {loading ? 'Add product':<i class="fa-solid fa-spinner animate-spin"></i>}
          </button>
        </form>
      </aside>
      </div>
  )
}
