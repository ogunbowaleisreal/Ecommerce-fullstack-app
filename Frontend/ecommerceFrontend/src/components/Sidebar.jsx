import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({sideBar,setsideBar}) {
    return(
      <div className={`md:flex md:flex-col h-full md:w-2/5 lg:w-2/10  w-full gap-4 absolute md:relative flex bg-black/50 ${sideBar? "":"hidden"}`}>
      <div className='bg-white relative flex flex-col w-full gap-4 h-full'>
        <div className='h-[50px] flex font-bold text-lg text-blue-950'>
          <p className='mt-auto flex gap-1 items-center pl-2'><i onClick={()=>{setsideBar(!sideBar)}} class="fa-solid fa-xmark md:!hidden absolute top-1 left-1" ></i>
          <i class="fa-solid fa-signal"></i> Admin panel</p>
          </div>
          <div className='flex flex-col gap-2 justify-center w-full pl-1 pr-1 text-lg text-blue-950'>
        <Link to='dashboard'><p className='hover:bg-gray-300 rounded-md h-[35px] py-1 px-2'><i class="fa-solid fa-gauge"></i> Dashboard</p></Link>
        <Link to='products'><p className='hover:bg-gray-300 rounded-md h-[35px] py-1 px-2'><i class=" fa-solid fa-basket-shopping"></i> Products</p></Link>
        <Link to='orders'><p className='hover:bg-gray-300 rounded-md h-[35px] py-1 px-2'><i class="fa-solid fa-truck"></i> Orders</p></Link>
          </div>
          </div>
            <div onClick={()=>{setsideBar(!sideBar)}} className='z-50 h-full md:hidden ml-auto bg-transparent w-[100px]'>
          </div>
        </div>
    )
}
