import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cleardetails,addReview } from '../../reduxfeatures/getproductslicer';
import { addtocartslice} from '../../reduxfeatures/addtocartslice';
import { setmessage ,clearmessage} from '../../reduxfeatures/errormessage';
import axiosInstance from '../axiosinstance';
export default function Productview(){

    const dispatch = useDispatch();
    const api = axiosInstance
    const loading = useSelector((state)=> state.getproduct.loading)
    const items = useSelector((state)=>state.getproduct.items)
    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')
    const [stars, setStars] = useState(
      [{"type":false},{"type":false},
      {"type":false},{"type":false},
      {"type":false}])


    const handleDispatch=(id)=>{
      console.log(id)
      dispatch(addtocartslice({"product_id":id}))
    }

    const createReview = async(id)=>{
      console.log(id)
      try{
        const response = await api.post(`/shop/${id}`,{"review":rating,"comment":review})
        console.log(response)
        dispatch(addReview(response.data.review))
        dispatch(setmessage(response.data.message))
        setTimeout(()=>{dispatch(clearmessage())},1000)
      }catch(err){
        console.log(err)
        dispatch(setmessage(err.response.data.message))
      }

    }

    const ratingChange=(index,e)=>{
      
      const mutatedStars = [...stars]
      for(const item of mutatedStars){
        if(mutatedStars.indexOf(item) <= index){
      item.type = true
      }else{
      item.type = false
      }
    }
      setStars(mutatedStars)
      setRating(parseInt(e.target.dataset.name) + 1)
      return
    }

    const showReview = (rating)=>{

    }

  return (
    (<div className='absolute inset-0 bg-black/50 flex md:justify-center items-center z-50'>
      <div className='bg-white md:w-[60vw] w-5/6 md:rounded-md md:h-[70vh] h-full md:p-4 p-2'>
        {loading ?<div className='w-full h-full md:flex-row flex flex-col gap-3 relative overflow-y-auto'>
      <i onClick={()=>{dispatch(cleardetails())}}  class="fa-solid fa-xmark absolute top-0 right-0 hover:bg-gray-400 rounded-full p-1"></i>
      <h2 className='font-extrabold text-blue-950 md:hidden'>Product Details</h2>
          <img src={items.product.image_url} className='w-full md:w-1/2 md:h-[70%] h-[30%] object-cover rounded-sm'></img>
          <div className='w-full h-full flex flex-col gap-2 p-2'>
            <div className='h-1/2 flex flex-col w-full'>
                  <p className='md:text-xl text-lg font-bold text-blue-950 capitalize'>{items.product.product_name}</p>
                  <p className='font-semibold text-base text-gray-700 capitalize'>{items.product.product_name}</p>
                  <p className='text-lg font-bold text-blue-950 mt-auto'>${items.product.Price}</p>
                  <div className='w-full flex flex-col md:mt-auto'>
                    <p>Choose a Rating</p>
                    <div className='flex p-1'>
                    {stars.map((item,index)=>{ return item.type ? 
                    <i onClick={(e)=>{ratingChange(index,e)}} data-name={index} class="fa-solid fa-star fa-2x"></i>:
                    <i onClick={(e)=>{ratingChange(index,e)}} data-name={index} class="fa-regular fa-star fa-2x"></i>
                  })}
                    </div>
                    <div className='flex gap-2 items-center p-1'>
                    <input onChange={(e)=>{
                      setReview(e.target.value)
                    }} type='text' placeholder='write a review' className='border-2 md:w-[60%] w-[55%] rounded-sm mb-1'/>
                    <button onClick={()=>{createReview(items.product._id)
                      console.log(items)
                    }} className='text-white bg-blue-950 rounded-sm p-1'>Send Review</button>
                    </div>
                    <button onClick={()=>{handleDispatch(items.product._id)}} className='bg-indigo-950 text-white rounded-sm p-1'>Add To Cart</button>
                  </div>
                  </div>
            <div className='md:h-1/2 md:overflow-y-scroll'>
              <p className='font-bold text-blue-950 text-lg'>Reviews</p>
              {items.reviews.length > 0 ? items.reviews.map((item)=>{
                return <div className='flex-col flex'>
                <div className='flex w-full items-center gap-2'>
                  <p className='text-lg p-2 rounded-md bg-gray-300'>{item.user_id.username[0]}</p> 
                 <p className='text-sm font-bold capitalize'>{item.user_id.username}</p>
                 <p>{showReview(item.review)}</p>
                 </div>
                  <p className='text-gray-700 lowercase ml-4'>{item.comment}</p>

                </div> 
              }) : <div className='flex flex-col items-center justify-center '><p>No reviews yet</p></div>}
            </div>
            </div>
        </div>:<div className='h-full w-full animate-pulse flex items-center justify-center'><p>Loading...</p></div>}
        </div>
        <div onClick={()=>{dispatch(cleardetails())}} className='bg-transparent w-1/5 h-full md:hidden'></div> 
    </div>)
  )
}
