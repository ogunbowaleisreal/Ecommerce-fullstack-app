import React from 'react'
import Barchart from './barchart'

export default function income({incomes,incomebyCategory,formatDate,setIncome}) {
  return (
    <section class="w-full flex h-[calc(100vh-60px)] flex-col pb-1 md:pb-2 md:pr-2 pr-1 scroll-m-0 gap-2 overflow-y-auto relative bg-gray-100">
      <div class="bg-white p-2">
      <div class="flex items-center">
        <div class="">
        <p class="font-bold text-lg"> Income Overview</p>
        <p class="text-sm font-light">Track your earnings overtime and analyze your spending trends</p>
        </div>
        <button onClick={()=>{setIncome("income")}} class="text-purple-600 text-sm font-semibold bg-purple-100 rounded-md p-2 ml-auto">+ Add Income</button>
        </div>
        <div class="h-[400px]">
          <Barchart Transactions={incomebyCategory.sort((a,b)=>a._id -b._id)}></Barchart>
        </div>
      </div>
      <div class="bg-white flex flex-col p-2">
      <div class="flex">
        <p class="text-lg font-bold">Income Sources</p>
        <button class="ml-auto bg-gray-100 py-1 px-2 rounded-md font-bold"><i class="fa-solid fa-download"></i> Download</button>
      </div>
      <div class="grid md:grid-cols-2 grid-cols-1 flex-grow py-4 gap-3 items-center">
              {incomes.reverse().map(item=>(
                <div class="flex items-center p-2 hover:bg-gray-100 rounded-md">
                  <div class="flex items-center gap-2">
                  <i class="bg-gray-100 fa-solid fa-car-side rounded-full p-2 "></i>
                  <div class="text-left">
                    <p class= "text-md font-bold ">{item.category}</p>
                    <p class="text-sm font-extralight">{formatDate(item.createdAt)}</p>
                  </div>
                  </div>
                  <div class= {`flex ml-auto mb-3 rounded-md px-1 items-center ${item.type== 'expense'?"text-red-500 bg-red-200": "text-green-500 bg-green-200"}`}>
                     <button class="ml-auto p-1 text-sm font-medium">{item.amount} <i class="fa-solid fa-arrow-trend-up"></i></button>
                  </div>
                  </div>               
              ))}                  
      </div>
      </div>
    </section>
  )
}
