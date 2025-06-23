import React from 'react'
import Linegraph from './linegraph'

export default function expenses({expenses,formatDate,setExpense,expensebyCategory}) {
  return (
    <section class="flex flex-col pb-1 pr-1 bg-gray-100 h-[calc(100vh-60px)] w-full overflow-y-auto gap-2">
      <div class="h-2/3 bg-white w-full p-2 rounded-md">
      <div class="flex items-center">
        <div class="flex flex-col gap-0 flex-wrap">
          <p class="font-bold text-lg">Expense Overview</p>
          <p class="text-sm font-light">Track your spending trends over time and gain insights into where your money goes</p>
        </div>
        <button onClick={()=>{setExpense("expense")}} class="p-2 rounded-md ml-auto bg-purple-100 text-purple-600 text-sm font-medium">+ Add expense</button>
      </div>
      <div class="h-[calc(100%-50px)]"> 
      <Linegraph expensebyCategory={expensebyCategory}></Linegraph>
      </div>
      </div>
      <div class="bg-white h-[calc(100%-400px)] items-center gap-2 rounded-md ">
        <div class="flex font-bold text-md p-2">
          <p class="text-lg capitalize">All Expenses</p>
          <button class="ml-auto py-1 px-2 bg-gray-100 rounded-md"><i class="fa-solid fa-download "></i> Download</button>
        </div>
      <div className='grid grid-cols-1 md:grid-cols-2 p-2 gap-3 bg-white'>
              {expenses.reverse().map(item=>(
                <div class="flex items-center p-2  hover:bg-gray-100 rounded-md">
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
