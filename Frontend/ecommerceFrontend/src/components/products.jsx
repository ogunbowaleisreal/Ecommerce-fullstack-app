import React from 'react';
import axiosInstance from '../axiosinstance';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { addtocartslice } from '../../reduxfeatures/addtocartslice';
import { getproductslice } from '../../reduxfeatures/getproductslicer';
import Productcard from './productcard';

export default function AllProducts(){

  const [products,setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [toggle,setToggle] = useState(false)
  const [filter,setFilter] = useState({"Men":false,"Women":false,"Kids":false,"Accessories":false,"Footwear":false})
  const dispatch = useDispatch()
  const api = axiosInstance
  const token = useSelector((state)=>state.auth.token)



  const handleChange =async(e)=>{

    const {checked,name} = e.target
    const newFilter = {...filter,[name]:checked}
    setFilter(newFilter)
    try{
      const res = await api.post('/shop',{newFilter})
      setProducts(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const getProducts=async()=>{
    try {
      setLoading(false)
      const res = await api.get('/shop')
      const data = res.data
      setProducts(data)
      setLoading(true)
    } catch (error) {
      console.log(error)
      setLoading(true)
    }
  }

  const Category = [
    {"link":"Men","to":"allproducts"}
    ,{"link":"Women","to":"men"},
    {"link":"Kids","to":"women"},
    {"link":"Accessories","to":"kids"}
    ,{"link":"Footwear","to":"footwear"}]

 
    useEffect(()=>{getProducts()
    },[])
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
        {loading ?<Productcard products={products}/> : <div className='w-full h-[calc(100%-44px)] flex items-center justify-center animate-pulse'>LOADING...</div>}
      </div>
    </section>
  )
}
