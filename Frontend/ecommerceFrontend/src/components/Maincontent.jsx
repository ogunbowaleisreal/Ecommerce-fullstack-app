import React from 'react'
import Piecharts from './piecharts'
import Barchart from "../components/barchart";


export default function Maincontent({Transactions,formatDate,mainContent}) {
  const transactionContent = Transactions.allTransactions
  if (Transactions ==null){
    return <div>LOADING TRANSACTIONS .....</div>
  }
      return (
    <section class ="flex flex-col w-full shadow-md gap-2  h-[calc(100vh-60px)] overflow-y-auto">
            <div class= "md:flex-row flex flex-col w-full justify-between gap-2">
        <div class=" w-full flex justify-center items-center text-center shadow-md hover:shadow-lg rounded-lg p-2 bg-white font-bold">
        <div class= " mr-auto md:m-0 flex justify-center items-center md:gap-3 gap-2 ">
          <i class="fa-solid fa-wallet bg-purple-700 p-2 rounded-full text-white"></i>
        <div>
          <p class = "font-medium text-sm text-left">Total Balance</p>
          <p class= {`font-bold text-lg text-left ${Transactions.balance<= 0 ? "text-red-500":""}`}>${Transactions.balance}</p>
          </div>
          </div>
        </div>
 <div class=" w-full justify-center items-center flex text-center shadow-md hover:shadow-lg rounded-lg p-2 bg-white font-bold">
        <div class= "mr-auto md:m-0 flex justify-center items-center md:gap-3 gap-1">
          <i class="fa-solid fa-wallet bg-orange-500 p-2 rounded-full text-white"></i>
        <div>
          <p class = "font-medium text-sm text-left">Total Income</p>
          <p class="font-bold text-lg text-left">$ {Transactions.totalIncome}</p>
          </div>
          </div>
        </div>        
 <div class="w-full justify-center items-center flex text-center shadow-md hover:shadow-lg rounded-lg p-2 bg-white font-bold">
        <div class= "mr-auto md:m-0 flex justify-center items-center md:gap-3 gap-1">
          <i class="fa-solid fa-money-bill bg-red-500 p-2 rounded-full text-white"></i>
        <div>
          <p class = "font-medium text-sm">Total Expenses</p>
          <p class="font-bold text-lg text-left">$ {Transactions.totalExpense}</p>
          </div>
          </div>
        </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:h-[550px] h-[450px]">     
          <div class="bg-white flex flex-col md:p-4 p-2 rounded h-[550px] shadow-md text-center font-bold md:gap-4 gap-2">
            <div class="flex ">
              <p class= "text-md font-bold">Recent Transactions</p>
              <button class="ml-auto p-1 bg-gray-100 rounded-md text-sm font-medium"> See all <i class="fa-solid fa-arrow-right"></i></button>
            </div>
            <div class="px-2 sm:px-1">
              {transactionContent.slice(-6).reverse().map(item=>(
                <div class="flex mb-4 items-center hover:bg-gray-200 rounded-md p-2">
                  <div class="flex items-center gap-2">
                  <i class="bg-gray-100 fa-solid fa-car-side rounded-full p-2 "></i>
                  <div class="text-left">
                    <p class= "text-md font-bold ">{item.category}</p>
                    <p class="text-sm font-extralight">{formatDate(item.createdAt)}</p>
                  </div>
                  </div>
                  <div class= {`flex ml-auto mb-3 rounded-md px-1 ${item.type== 'expense'?"text-red-500 bg-red-200": "text-green-500 bg-green-200"}`}>
                     <button class="ml-auto p-1 text-sm font-medium">{item.amount} <i class="fa-solid fa-arrow-trend-up"></i></button>
                  </div>
                  </div>               
              ))}                  
                  </div>
                  </div>
          <div class="bg-white p-4 rounded flex flex-col min-h-[550px] shadow-md text-center font-bold">
            <p class="font-bold text-left">Financial Overview</p>
            <Piecharts text1={"Total Income"} text2={Transactions.totalIncome} Transactions={Object.entries(Transactions).slice(-3).map(([key,value])=>{
          return {"_id":key,"total":value}
      })}>
            </Piecharts>
          </div>
          <div class="bg-white flex flex-col md:p-4 p-1 rounded min-h-[550px] shadow-md text-center font-bold gap-4">
       <div class="flex ">
              <p class= "text-md font-bold">Recent Income</p>
              <button onClick={()=>{mainContent("income")}} class="ml-auto p-1 bg-gray-100 rounded-md text-sm font-medium"> See all <i class="fa-solid fa-arrow-right"></i></button>
            </div>
            <div class=" px-2 sm:px-1">
              {Transactions.allIncome.slice(-6).reverse().map(item=>(
                <div class="flex mb-4 items-center hover:bg-gray-200 rounded-md p-2">
                  <div class="flex items-center gap-2">
                  <i class="bg-gray-100 fa-solid fa-car-side rounded-full p-2 "></i>
                  <div class="text-left">
                    <p class= "text-md font-bold ">{item.category}</p>
                    <p class="text-sm font-extralight">{formatDate(item.createdAt)}</p>
                  </div>
                  </div>
                  <div class= {`flex ml-auto mb-3 rounded-md px-1 ${item.type== 'expense'?"text-red-500 bg-red-200": "text-green-500 bg-green-200"}`}>
                     <button class="ml-auto p-1 text-sm font-medium">{item.amount} <i class="fa-solid fa-arrow-trend-up"></i></button>
                  </div>
                  </div>               
              ))}                  
                  </div>
                  </div>
          <div class="bg-white p-4 rounded min-h-[550px] shadow-md text-left font-bold">
            <p class="font-bold text-sm">Last 30 Days Income</p>
            <Barchart Transactions={Transactions.incomeCategory.sort((a,b)=>a._id -b._id)}></Barchart> 
            </div>
          <div class="bg-white p-4 rounded min-h-[550px] shadow-md text-center font-bold">
            <p class="font-bold text-left">30 Days Expense</p>
            <Piecharts Transactions={Transactions.expenseCategory} text1={"Total Expense"} text2={Transactions.totalExpense}></Piecharts>
          </div>
          <div class="bg-white flex flex-col gap-4 md:p-4 p-1 rounded min-h-[550px] shadow-md text-center font-bold ">
          <div class="flex ">
              <p class= "text-md font-bold">Recent Expenses</p>
              <button onClick={()=>{mainContent("expenses")}} class="ml-auto p-1 bg-gray-100 rounded-md text-sm font-medium"> See all <i class="fa-solid fa-arrow-right"></i></button>
          </div>
            <div class=" px-2 sm:px-1">
              {Transactions.allExpense.slice(-6).reverse().map(item=>(
                <div class="flex mb-4 items-center hover:bg-gray-200 rounded-md p-2">
                  <div class="flex items-center gap-2">
                  <i class="bg-gray-100 fa-solid fa-car-side rounded-full p-2 "></i>
                  <div class="text-left">
                    <p class= "text-md font-bold">{item.category}</p>
                    <p class="text-sm font-extralight">{formatDate(item.createdAt)}</p>
                  </div>
                  </div>
                  <div class= {`flex ml-auto mb-3 rounded-md px-1 ${item.type== 'expense'?"text-red-500 bg-red-200": "text-green-500 bg-green-200"}`}>
                     <button class="ml-auto p-1 text-sm font-medium">{item.amount} <i class="fa-solid fa-arrow-trend-up"></i></button>
                  </div>
                  </div>               
              ))}                  
                  </div>
          </div>                            
      </div>
      </section>
  )
}
