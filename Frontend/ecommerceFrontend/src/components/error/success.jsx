import React from 'react'

export default function Success({error}){
  return (
    <div className='absolute z-60 flex justify-center items-center md:bg-white
     bg-gray-300 p-1 rounded-md top-2 left-1/2 h-[30px] min-w-[100px]'>
      <i class="fa-solid fa-xmark ml-auto rounded-full absolute top-0 right-0 hover:bg-gray-200 p-1"></i>
        {error}
        <p className=''>Error</p>
    </div>
  )
}
