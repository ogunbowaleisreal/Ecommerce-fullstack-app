import React from 'react'
import {useNavigate,Navigate} from 'react-router-dom'

function Notfound() {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col justify-center items-center h-screen p-2'>
      <button onClick= {()=>{navigate('/')}}className='bg-blue-950 mr-auto rounded-sm p-2 text-white absolute top-2 left-2'>Go to store</button>
        <p className='text-lg font-bold text-blue-950'>Oops Page not found</p>
    </div>
  )
}

export default Notfound