import React from "react";
import './App.css';
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import Products from "./components/Product/Products.js";
import ProductDetails from "./components/Product/ProductDetails.js"
import Search from "./components/Product/Search.js" 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader"; 
import LoginSignUp from "./components/User/LoginSignUp";


function App() {
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  },[])
  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home /> }/>
        <Route exact path="/product/:id" element={<ProductDetails/>}/>
        <Route exact path="/products" element={<Products/>}/>
        <Route path="/products/:keyword" element={<Products/>}/>
        <Route exact path="/search" element={<Search/>}/>
        <Route exact path="/login" element={<LoginSignUp/>}/>

      </Routes>
      <Footer/>

    </Router>
    </>
  );
}
//6:37:00
export default App;
