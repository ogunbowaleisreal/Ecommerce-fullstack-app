import api from "../api"
import { useState , useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import React from "react";
import Navigationbar from "../components/navigationbar";
import Sidebar from "../components/Sidebar"
import Maincontent from "../components/Maincontent";
import Income from "../components/income";
import Expenses from "../components/expenses";
import IncomeExpenseform from "../components/incomeExpenseform";
import Confirmationmessage from "../components/confirmationMessage";

function Home(){
    const [transactions , settransactions] = useState(null);
    const [auth, setauth] = useState(null);
    const [newtodo, setnewtodo] = useState('')
    const [error, seterror]= useState(false)
    const [confirmationMessage,setConfirmationmessage]=useState(false)
    const [edit, setedit]= useState(false)
    const [Id,setId] = useState("")
    const [toggleSidebar , settoggleSidebar] = useState(false)
    const [toggleMain, setTogglemain] = useState("maincontent")
    const [incomeForm, setincomeForm] = useState(null)
    const [sidebarButton, setsidebarButton] = useState(false)
    const [profileToggle,setprofileToggle] = useState(false)
    const navigate = useNavigate()

    const logout=async()=>{

        try{
            const response = await api.get("/logout")
            if(response.status== 200){
                navigate("/login")
            }
        }catch(err){
            navigate('/login')
        }
    }

    const updateCompleted=async({key,completedStatus,item})=>{

        try {
            const newitem = item
            if(newitem){
                setnewtodo(item)   
            const response = await api.patch("/todo",{"id":key,"item":newitem})
            if(response.status== 200){
                setedit(false)
                setnewtodo("")
                await gettodos()
                return
            }
            }
            const newChecked = !completedStatus
            const response = await api.patch("/todo",{"id":key,"completed":newChecked})
            if(response.status== 200){
                await gettodos()
                return
            }
        } catch (error) {
            console.log(error)
            setedit(false)
        }
    }

    const handleDelete=async(key)=>{
        try{
            const response = await api.delete("/todo",{data:{
                "id": key
            }})  
            if(response.status ==200){
                await gettodos()
                return
            }         
        }catch(err){
            console.log(err)
            return 
        }
    }

    const getTransactions = async()=>{
        try{
        const response = await api.get('/transactions')
        const transaction = await response.data
        console.log(transaction)
        if(transaction){
            settransactions(transaction)
            setauth(true)
            return
        }
    }catch(err){
        seterror(true)
       setauth(false)
       console.log(err) 
       return
    }
    };
// small screens only
    const rollSidebar=()=>{
        const newState= !toggleSidebar
        settoggleSidebar(newState)
    }

    function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' }); // e.g., Feb
  const year = date.getFullYear();

  const suffix = (d => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  })(day);

  return `${day}${suffix} ${month} ${year}`;
}
    useEffect(()=>{getTransactions()},[])
    if(auth == null){
        return <div class="flex justify-center h-screen items-center animate-pulse"><p> LOADING....</p></div>
    }
   return (
    <main className="relative flex flex-col items-center gap-2 h-screen">
        {sidebarButton && <Navigationbar setsidebarButton={setsidebarButton} sidebarButton={sidebarButton}></Navigationbar>}
    <nav className=" bg-amber-300 h-[50px] flex  justify-between w-full items-center p-2">
        <div className="flex md:gap-0 gap-1">
        <button onClick = {()=>{setsidebarButton(!sidebarButton)}}className=""><i class="fa-solid fa-bars md:!hidden"></i></button>
        <p className="font-bold">Ecommerce</p>
        </div>
            <div className="font-bold hidden md:gap-5 gap-2 justify-center md:flex">
        <p onClick={()=>{navigate("/admin")}}>Home</p>
        <p>Men</p>
        <p>Women</p>
        <p>Accessories</p>
        <p>Footwear</p>
        <p>Search</p>
    </div>
        <div className="flex gap-2 font-bold ">
        <i class="fa-solid fa-cart-shopping"></i>
        <i onClick={()=>{setprofileToggle(!profileToggle)}} class="fa-solid fa-circle text-lg"></i>
    </div>
    </nav>
    {profileToggle && <div className="absolute h-[60px] w-[100px] top-10 right-0 z-20 bg-gray-100
     flex flex-col font-bold p-2 rounded-md gap-2">
        <nav><i class="fa-solid fa-user"></i> Profile</nav>
        <p><i class="fa-solid fa-right-from-bracket"></i> Logout</p>
    </div>}
    </main>
   )
};

export default Home;