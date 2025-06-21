import React from 'react'

export default function Sidebar({toggleSidebar,setTogglemain, toggleMain, settoggleSidebar,setConfirmationMessage}) {
  const setMaincontent=(newcontent)=>{
    setTogglemain(newcontent)
    const newState = !toggleSidebar
    settoggleSidebar(newState)  
  }
  return (
    <div onClick={()=>{settoggleSidebar(!toggleSidebar)}} class={`md:flex flex-col w-full md:w-1/5 h-full md:p-1 bg-black/50 md:bg-white text-center gap-1 md:z-0 z-50 absolute inset-0 md:inset-auto md:relative ${toggleSidebar ? " " : "hidden" }`}>
      <div class="flex flex-col w-3/4 md:w-full bg-white h-full md:p-0 p-1 gap-1">
      <div class="flex flex-col justify-center rounded-sm text-black font-bold p-2 gap-3">
        <img class= "rounded-full w-[80px] h-[80px] m-auto" src="/ben-sweet-2LowviVHZ-E-unsplash.jpg"/>
        <p class="font-bold">Isreal Ayomide</p>
      </div>
      <div class="flex flex-col gap-1">
      <div onClick={()=>{
        setMaincontent("maincontent")
        }} class={`text-black text-center rounded-sm justify-start p-2 flex gap-2 items-center font-bold  w-full ${toggleMain=="maincontent" ?"text-white bg-purple-700":"hover:bg-gray-200" }`}>
        <i className="fas fa-tachometer-alt"></i>
        <p>Dashboard</p>
      </div>
            <div onClick={()=>{
              setMaincontent("income")
              }}class={`text-black rounded-sm justify-start flex gap-2 p-2 items-center w-full font-bold ${toggleMain=="income" ?"text-white bg-purple-700":"hover:bg-gray-200" }`}>
        <i class="fa-solid fa-wallet"></i>
        <p>Income</p>
      </div>
          <div onClick={()=>{
            setMaincontent("expenses")
            }}class={`text-black rounded-sm flex gap-2 p-2 justify-start items-center font-bold w-full  ${toggleMain=="expenses" ?"text-white bg-purple-700":"hover:bg-gray-200" }`}>
        <i class="fa-solid fa-hand-holding-dollar"></i> 
        <p>Expense</p>
      </div>
      <div onClick={()=>{setConfirmationMessage(true)}} class="text-black rounded-sm p-2 flex gap-2 justify-start items-center font-bold w-full hover:bg-gray-200">
        <i class="fa-solid fa-right-from-bracket"></i>
        <p>Logout</p>
      </div>
      </div>
      </div>
    </div>
  )
}
