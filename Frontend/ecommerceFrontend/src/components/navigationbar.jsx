import React from 'react'
import { useState } from 'react'
import { Navigate,useNavigate } from 'react-router-dom'

export default function Navigationbar({setsidebarButton,sidebarButton}){
  const navigate = useNavigate()
  return (
    <section className={`absolute inset-0 bg-black/50 flex h-full z-50 w-full md:hidden ${sidebarButton ? "": "hidden"}`}>
    <div className='w-1/2 bg-white h-full p-2 gap-2 '>
    <div className='flex gap-1'>
        <button onClick={()=>{setsidebarButton(!sidebarButton)}}><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div className="font-bold flex-col gap-2">
        <p className='hover:bg-gray-300 p-1 rounded-md' onClick={()=>{navigate("/admin")}}><i class="fa-solid fa-house"></i> Home</p>
        <p className='hover:bg-gray-300 p-1 rounded-md'><i class="fa-solid fa-shirt self-center"></i> Men</p>
        <p className='hover:bg-gray-300 p-1 rounded-md'><i class="fa-solid fa-cloud-bolt self-center"></i> Women</p>
        <p className='hover:bg-gray-300 p-1 rounded-md'><i class="fa-solid fa-headphones self-center"></i> Accessories</p>
        <p className='hover:bg-gray-300 p-1 rounded-md'><i class="fa-solid fa-socks self-center"></i> Footwear</p>
        <p className='hover:bg-gray-300 p-1 rounded-md'><i class="fa-solid fa-magnifying-glass"></i> Search</p>
    </div>
    </div>
    <div onClick={()=>{setsidebarButton(!sidebarButton)}} className='backdrop-opacity-0 w-1/4'>
    </div>
    </section>
  )
}
