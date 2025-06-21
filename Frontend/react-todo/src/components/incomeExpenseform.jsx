import React from 'react'
import { useState } from 'react'
import api from "../api"


export default function incomeExpenseform({setincomeForm,type,getTransactions}){
    const[category,setCategory]=useState("")
    const[Amount,setAmount] = useState("")
    const[error,setError]=useState(false)

    const handleClick =async(e)=>{
        e.preventDefault()
        try{
            if(category == ""|| Amount==""){
                setError(true)
                return
            }
            const response = await api.post("/transactions",{"type":type=="income" ?"income":"expense",
        "category":category,
        "amount" : Amount})

            if(response.status == 200){
                console.log(response.status)
                setincomeForm(null)
                await getTransactions()
                return
            }
        }catch(err){
            console.log(err)
        }
    }
  return (
<div class="absolute inset-0 bg-black/50 z-40 p-2">
      <div class="flex justify-center items-center h-full w-full">
        <div class="flex flex-col bg-white h-4/5 md:w-3/5 md:h-4/5 lg:w-1/3 w-full gap-2 rounded-md ">
        <div class="flex py-2 items-center border-b-1 p-4">
            <p class="font-bold text-lg">Add {`${type=="income"? "income":"expense"}`}</p>
            <i onClick={()=>{
                const newincomeState = null
                setincomeForm(newincomeState)
            }} class="fa-solid fa-xmark ml-auto font-light hover:bg-gray-200 p-2"></i>
        </div>        
        <form onSubmit={handleClick} class="flex flex-col gap-2 p-4 h-full">
        <div class="flex gap-3 items-center">
            <i class="fa-solid fa-image p-2 rounded-md bg-purple-200 text-lg text-purple-400"></i>
            <p class="font-medium">Pick Icon</p>
        </div>
        <label class="flex flex-col gap-1 pt-2 font-light text-sm"> 
            Type of {`${type=="income"? "income":"expense"}`}
            <select value={category} onChange={(e)=>{
                setError(false)
                setCategory(e.target.value)}} class="bg-gray-300 p-2 rounded-md">
                <option value="">...</option>
                <option value="Transportation">Transportation</option>
                <option value="Food">Food</option>
                <option value="Salary">Salary</option>
                <option value="Leisure">Leisure</option>
                <option value="Subscriptions">Subscription</option>
                <option value="Others">Others</option>
            </select>
            </label>
        <div>
        <label class="flex flex-col gap-1 pt-2 font-light text-sm"> 
            Amount
            <input value={Amount} onChange={(e)=>{
                setError(false)
                setAmount(e.target.value)}} class="bg-gray-300 p-2 rounded-md" type="number" min="0" step="0.01" placeholder="Enter Amount"></input>
        </label>
        {error && (<i class="text-red-700 text-sm font-light"><i class="fa-solid fa-circle-exclamation"></i> some options not picked</i>)}
        </div>
        <div class="h-full flex flex-col">
        <button  class="bg-purple-700 ml-auto p-2 mt-auto  text-white rounded-md">Add {`${type=="income"? "income":"expense"}`}</button>
        </div>
        </form>
         </div>        
      </div>
      </div>)
}
