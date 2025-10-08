import { useState , useEffect } from "react";
import { Link,Outlet} from "react-router-dom";
import React from "react";
import Navigationbar from "../components/navigationbar";
import { useSelector,useDispatch } from "react-redux";
import Cart from "../components/cart";
import Productview from "../components/productview";
import Success from "../components/error/success";
import { getcartslice } from "../../reduxfeatures/getcartsslicer";


function Home(){

    const [cart,toggleCart] = useState(false)
    const [sidebarButton, setsidebarButton] = useState(false)
    const [profileToggle,setprofileToggle] = useState(false)
    const value = useSelector(state=> state.error.value)
    const toggle = useSelector(state=> state.error.toggle)
    const count = useSelector((state)=>state.getcart.count)
    const detailToggle = useSelector((state)=>state.getproduct.toggle)
    const dispatch = useDispatch()
    const token = useSelector((state)=>state.auth.token)
    


const Category = [
    {"link":"Home", "to":"/"},
    {"link":"Products","to":"allproducts"}
    ,{"link":"Men","to":"men"},
    {"link":"Women","to":"women"},
    {"link":"Kids","to":"kids"}
    ,{"link":"Footwear","to":"footwear"}]
    useEffect(()=>{
        dispatch(getcartslice(token))
},[])
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
        <i onClick={()=>{toggleCart(!cart)}} class="fa-solid fa-cart-shopping text-lg p-2 hover:bg-gray-300 rounded-full relative">
            <p className="absolute text-black text-xs font-bold top-0 right-0">{count}</p>
        </i>
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