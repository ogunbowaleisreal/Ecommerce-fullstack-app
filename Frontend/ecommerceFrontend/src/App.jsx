import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useState } from "react"
import Home from './pages/Home'
import Login from './pages/login'
import Register from './pages/register'
import Notfound from './pages/notfound'
import ProtectedRoute from './components/ProtectedRoute'
import Admindashboard from "./pages/admindashboard"
import React from "react";
import Cart from "./components/cart";
import Orders from "./components/orders";
import Products from "./components/adminproducts"
import Maincontent from "./components/Maincontent";
import Shopmaincontent from "./components/shopmainContent";
import AllProducts from "./components/products";
import Checkout from "./components/checkout"

function Registerlogout(){
    return <Register/>
}
function App(){

  const [productForm, setproductForm] = useState(false)
  const [products, setProducts] = useState([])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<ProtectedRoute route="admin"><Admindashboard productForm={productForm} products={products} setProducts={setProducts} setproductForm={setproductForm} /></ProtectedRoute>}>
        <Route index element = {<Maincontent productForm={productForm} setproductForm={setproductForm} products={products} setProducts={setProducts}/>}/>
        <Route path = 'dashboard'element = {<Maincontent productForm={productForm} products={products} setProducts={setProducts} setproductForm={setproductForm}/>}/>
        <Route path = 'orders' element = {<Orders/>}/>
        <Route path = 'products' element = {<Products/>}/>
        </Route>

        <Route path = '/' element = {<ProtectedRoute route="home"><Home/></ProtectedRoute>}>
        <Route index element={<Shopmaincontent/>}></Route>
        <Route path = 'cart' element = {<Cart/>}/>
        <Route path = 'allproducts' element = {<AllProducts/>}/>
        <Route path='shop' index element={<Shopmaincontent/>}></Route>
        <Route path = 'checkout' element={<Checkout/>}></Route>
        </Route>
        <Route path= '*' element = {<Notfound/>}/>
        <Route path= '/register' element = {<Registerlogout/>}/>
        <Route path = '/login' element = {<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
