import useAxios from "../api";
import { useState , useEffect } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import React from "react";
import Navigationbar from "../components/navigationbar";
import { useSelector,useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar"
import Maincontent from "../components/Maincontent";
import Confirmationmessage from "../components/confirmationMessage";
import Cart from "../components/cart";
import Productview from "../components/productview";
import Shopbycontent from "../components/shopbycontent";
import Featuredproducts from "../components/featuredproducts";
import Success from "../components/error/success";


function Home(){

    const [Id,setId] = useState("")
    const [toggleSidebar , settoggleSidebar] = useState(false)
    const [cart,toggleCart] = useState(false)
    const [sidebarButton, setsidebarButton] = useState(false)
    const [profileToggle,setprofileToggle] = useState(false)
    const api= useAxios()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const value = useSelector(state=> state.error.value)
    const toggle = useSelector(state=> state.error.toggle)
    const detailToggle = useSelector((state)=>state.getproduct.toggle)


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
const Category = [
    {"link":"Home", "to":"/admin"},
    {"link":"Products","to":"allproducts"}
    ,{"link":"Men","to":"men"},
    {"link":"Women","to":"women"},
    {"link":"Kids","to":"kids"}
    ,{"link":"Footwear","to":"footwear"}]

   return (
    <main className="relative flex flex-col h-screen bg-gray-100">
        {cart&& <Cart cart={cart} toggleCart={toggleCart}></Cart>}
        {detailToggle && <Productview></Productview>}
        {toggle && <Success error={value}></Success>}
        {sidebarButton && <Navigationbar setsidebarButton={setsidebarButton} sidebarButton={sidebarButton}></Navigationbar>}
    <nav className=" bg-white h-[50px] border-b-1 xl:h-[70px] flex  justify-between w-full items-center p-2">
        <div className="flex md:gap-0 gap-1">
        <button onClick = {()=>{setsidebarButton(!sidebarButton)}}className=""><i class="fa-solid fa-bars md:!hidden"></i></button>
        <p className="font-bold">Ecommerce</p>
        </div>
            <div className="font-bold hidden md:gap-5 gap-2 justify-center rounded-md md:flex">
                {Category.map((item,index)=>{
                    return <Link to={item.to} key={index} ><p className="hover:bg-gray-300 p-1 rounded-md">{item.link}</p></Link>
                })}
    </div>
        <div className="flex font-bold items-center">
        <i onClick={()=>{toggleCart(!cart)}} class="fa-solid fa-cart-shopping text-lg p-2 hover:bg-gray-300 rounded-full"></i>
        <i onClick={()=>{setprofileToggle(!profileToggle)}} class="fa-solid fa-circle text-lg p-2 hover:bg-gray-300 rounded-full"></i>
    </div>
    </nav>
    {profileToggle && <div className="absolute h-[80px] w-[100px] p-2 top-10 right-0 z-20 bg-gray-50
     flex flex-col font-bold rounded-md gap-2">
        <nav><i class="fa-solid fa-user"></i> Profile</nav>
        <p><i class="fa-solid fa-right-from-bracket"></i> Logout</p>
    </div>}
    <Outlet/>
    </main>
   )
};

export default Home;