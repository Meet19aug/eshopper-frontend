import React from "react";
import './App.css';
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader"; 


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
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/product/:id" element={<ProductDetails/>}/>

      </Routes>
      <Footer/>

    </Router>
    </>
  );
}
//6:26:00
export default App;
