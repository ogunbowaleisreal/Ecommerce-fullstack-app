import React from 'react'

export default function Success({error}){
  return (
    <div className='absolute z-60 flex justify-center items-center
     bg-blue-950 p-1 rounded-sm bottom-0 right-0 h-[40px] min-w-[100px] font-semibold text-white'>
      <p className=''>{error}</p>
      <i class="fa-solid fa-xmark ml-auto rounded-full hover:bg-gray-200 p-1"></i>
    </div>
  )
}
