import React from 'react'
import { useState } from 'react'

export default function Confirmationmessage({logout,setConfirmationmessage}){
  return (
<div class="absolute inset-0 bg-black/50 z-40 p-2">
      <div class="flex justify-center items-center h-full w-full">
        <div class="flex flex-col items-center bg-white p-4 md:w-3/5 lg:w-1/3 w-full gap-4 rounded-md ">
        <p class="font-bold text-lg">Are you sure you want to logout ?</p>
        <div class="flex gap-4 ml-auto items-center text-white">
            <button onClick={()=>{logout()}} class="bg-green-400 py-1 px-2 rounded-md">Yes</button>
            <button onClick={()=>{setConfirmationmessage(false)}} class="bg-red-400 p-1 px-2 rounded-md">No</button>
        </div>
         </div>        
      </div>
      </div>)
}
