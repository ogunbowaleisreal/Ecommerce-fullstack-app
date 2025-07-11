import React from 'react';
import Shopbycontent from './shopbycontent';
import Featuredproducts from './featuredproducts';
import { Link } from 'react-router-dom';


export default function Shopmaincontent() {
  return (
    <div className="h-full flex flex-col gap-2 w-full overflow-y-auto ">
            <div className=" overflow-clip  md:h-[400px] h-[280px] lg:h-[70vh] xl:h-[70vh] relative">
            <img className="opacity-80 object-cover w-full h-full" src="/freestocks-_3Q3tsJ01nc-unsplash.jpg" alt="" />
            <div className="absolute z-20 left-5 top-5 md:top-15 md:left-15 w-[200px]">
                <h3 className="text-wrap text-xl font-extrabold">Shop with us</h3> 
                <p className="">U can only do so with us </p>
                <Link to='allproducts'><button className='bg-blue-950 text-white p-2 rounded-md mt-15'>Go To Collections  <i class="fa-solid fa-arrow-right"></i></button></Link>
            </div>
            </div>
            <div className="font-bold text-xl flex flex-col gap-4 md:gap-6 justify-center p-2">
                <Shopbycontent></Shopbycontent>
                <Featuredproducts></Featuredproducts>
            </div>
    </div>
  )
}
