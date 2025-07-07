import React from 'react'

export default function Shopbycontent(){
  return (
    <div className='flex flex-col gap-4'>
         <h2 className="self-center">Shop By Category</h2>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 self-center xl:w-[80vw] lg:grid-cols-5 justify-items-center gap-2">
                <div className=" w-[150px] md:w-[200px] h-[100px] hover:shadow-lg  cursor-pointer bg-white rounded-md justify-items-center grid">
                    <i class="fa-solid fa-shirt self-center"></i>
                    <p className='md:text-lg text-sm font-bold'>Men</p>
                </div>
                <div className=" w-[150px] md:w-[200px]h-[100px] bg-white cursor-pointer rounded-md justify-items-center grid">
                    <i class="fa-solid fa-cloud-bolt self-center"></i>
                    <p className='md:text-lg text-sm font-bold'>Women</p>
                </div>
                <div className=" w-[150px] md:w-[200px] h-[100px] bg-white cursor-pointer rounded-md justify-items-center grid">
                    <i class="fa-solid fa-face-smile self-center"></i>
                    <p className='md:text-lg text-sm font-bold'>Kids</p>
                </div>
                <div className=" w-[150px] md:w-[200px]h-[100px] bg-white cursor-pointer rounded-md justify-items-center grid">
                    <i class="fa-solid fa-headphones self-center"></i>
                    <p className='md:text-lg text-sm font-bold'>Accessories</p>
                </div>
                <div className=" w-[150px] md:w-[200px] h-[100px] bg-white cursor-pointer rounded-md justify-items-center grid">
                    <i class="fa-solid fa-socks self-center"></i>
                    <p className='md:text-lg text-sm font-bold'>Footwear</p>
                </div>
            </div>
    </div>
  )
}
