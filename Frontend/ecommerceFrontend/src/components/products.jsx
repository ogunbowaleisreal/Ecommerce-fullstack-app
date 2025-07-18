import React from 'react';
import useAxios from '../api';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addtocartslice } from '../../reduxfeatures/addtocartslice';
import { getproductslice } from '../../reduxfeatures/getcartslicer';

export default function AllProducts(){

  const [products,setProducts] = useState([])
  const [Loading, setLoading] = useState(false)
  const [toggle,setToggle] = useState(false)
  const [filter,setFilter] = useState({"Men":false,"Women":false,"Kids":false,"Accessories":false,"Footwear":false})
  const dispatch = useDispatch()
    const loading = useSelector((state)=> state.getproduct.loading)
    const items = useSelector((state)=>{state.getproduct.items})
    const api = useAxios()

  const handleDispatch=(item)=>{
    dispatch(addtocartslice(item))
  }

  const handleChange =async(e)=>{

    const {checked,name} = e.target
    const newFilter = {...filter,[name]:checked}
    console.log(newFilter)
    setFilter(newFilter)
    try{
      const res = await api.post('/shop',{newFilter})
      setProducts(res.data)
      console.log(res)
    }catch(err){
      console.log(err)
    }
  }

  const getProducts=async()=>{
    try {
      setLoading(true)
      const res = await api.get('/shop')
      const data = res.data
      setProducts(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const showDetails=(product_id)=>{
    dispatch(getproductslice(product_id))
  }

  const Category = [
    {"link":"Men","to":"allproducts"}
    ,{"link":"Women","to":"men"},
    {"link":"Kids","to":"women"},
    {"link":"Accessories","to":"kids"}
    ,{"link":"Footwear","to":"footwear"}]

    useEffect(()=>{getProducts()},[])
  return (
    <section className='w-full h-full md:flex '>
      <div className={`bg-black/50 absolute inset-0 flex md:flex md:relative md:h-full md:w-1/5 md:bg-transparent ${toggle ? '':'hidden'}`}>
      <div className='bg-white h-full w-1/2 md:w-full p-2 md:border-r-1'>
        <p className='text-lg font-bold'>Filter</p>
        <div className='flex flex-col text-base font-semibold'>
          {Category.map((item,index)=>{
            return <div key={index}>
              <label>
                <input onChange={handleChange} type='checkbox' value={item.link} name={item.link}></input>
                {item.link}
              </label>
               </div>
          })}
        </div>
      </div>
      <div onClick={()=>{setToggle(!toggle)}} className={`bg-transparent w-1/2 h-full md:hidden`}></div>
      </div>
      <div className='w-full h-full text-lg font-bold bg-white p-2'>
        <div className='flex justify-between items-center p-2'>
          <p><i onClick={()=>[setToggle(!toggle)]} class="fa-solid fa-filter md:!hidden"></i> All Products</p>
          <p><i class="fa-solid fa-sort"></i> sort by</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 h-[calc(100vh-114px)] overflow-y-auto font-bold capitalize'>
          {products.map((item)=>
            <div key={item._id} onClick={()=>{showDetails(item._id)}} className='flex flex-col rounded-md gap-1 md:h-[320px] bg-white text-blue-950 p-2'>
              <img className ="rounded-md object-cover h-[200px] w-full" src={item.image_url} alt={item.category}></img>
              <p className='text-base md:text-lg text-wrap'>{item.product_name}</p>
              <div className='flex flex-col mt-auto'>
              <div className='flex justify-between'>
              <p className='text-sm md:text-lg md:font-bold'>${item.Price}</p>
              <p className='text-sm md:text-lg md:font-bold'>{item.discounted_price !== item.Price && item.discounted_price !== undefined ? `$${item.discounted_price}`:""}</p>
              </div>
              <button onClick={()=>{handleDispatch({product_id: item._id})}} className='text-white bg-blue-950 text-base rounded-md p-1 mt-auto'>{Loading ==true ? "Loading":"Add to cart"}</button>
              </div>
            </div>
            )}
        </div>
      </div>
    </section>
  )
}
