import React from 'react'

export default function Success({error}){
  return (
    <div className='absolute z-60 flex justify-center items-center
     bg-blue-600 p-1 rounded-sm top-1 right-1/2 left-1/2 h-[40px] md:min-w-[300px] w-[200px] text-center font-semibold text-white'>
      <div className='flex'>
      <p className='min-w-[250px] self-center'>{error}</p>
      <i class="fa-solid fa-xmark ml-auto rounded-full hover:bg-gray-200 p-1"></i>
      </div>
    </div>
  )
}
