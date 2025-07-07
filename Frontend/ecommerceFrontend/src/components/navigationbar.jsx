import React from 'react'
import { useState } from 'react'
import { Navigate,useNavigate } from 'react-router-dom'

export default function Navigationbar({setsidebarButton,sidebarButton}){
  const navigate = useNavigate()
  return (
    <section className={`absolute inset-0 bg-black/50 flex h-full z-50 w-full md:hidden ${sidebarButton ? "": "hidden"}`}>
    <div className='w-3/4 bg-white h-full p-2 gap-2 '>
    <div className='flex gap-1'>
        <button onClick={()=>{setsidebarButton(!sidebarButton)}}><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div className="font-bold flex-col gap-2">
        <p onClick={()=>{navigate("/admin")}}>Home</p>
        <p>Men</p>
        <p>Women</p>
        <p>Accessories</p>
        <p>Footwear</p>
        <p>Search</p>
    </div>
    </div>
    <div onClick={()=>{setsidebarButton(!sidebarButton)}} className='backdrop-opacity-0 w-1/4'>
    </div>
    </section>
  )
}
