import api from "../api"
import { useState , useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import React from "react";
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
    const sidebarDisplay=()=>{
        switch(toggleMain){
            case "maincontent":
                return <Maincontent Transactions={transactions} formatDate={formatDate} mainContent={setTogglemain}/>
            case "income":
                return <Income incomes={transactions.allIncome} incomebyCategory={transactions.allincomeCategory} formatDate={formatDate} setIncome={setincomeForm}/>
            case "expenses":
                return <Expenses expenses={transactions.allExpense} expensebyCategory={transactions.allexpenseCategory} formatDate={formatDate} setExpense={setincomeForm}/>
        }
    }

    const getTransactions = async()=>{
        try{
        const response = await api.get('/transactions')
        const transaction = await response.data
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
   return (auth ? 
        <main class=" h-screen w-full flex justify-center bg-gray-100 relative">
      {incomeForm!==null && <IncomeExpenseform setincomeForm={setincomeForm} type={incomeForm} getTransactions={getTransactions}/>}
      {confirmationMessage && <Confirmationmessage logout={logout} setConfirmationmessage={setConfirmationmessage}/>}
            <div class = "w-full flex flex-col md:gap-2 gap-0">
            <div class = "h-[55px] p-2 text-left font-bold w-full shadow-sm items-center flex gap-2 bg-white">
                <i onClick= {rollSidebar} class="md:!hidden fa-solid fa-bars p-1"></i>
                <h1>Expense Tracker</h1>
                </div>   
            <div class = "flex w-full flex-grow shadow-md p-1 relative gap-4">
            <Sidebar toggleSidebar={toggleSidebar} setTogglemain={setTogglemain} 
            toggleMain={toggleMain}
             settoggleSidebar={settoggleSidebar}
            setConfirmationMessage={setConfirmationmessage}/>
            {sidebarDisplay()}
            </div>
            </div>
        </main>
         : <Navigate to= "/login"/>
)
};

export default Home;