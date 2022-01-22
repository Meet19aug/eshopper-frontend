import React, {useLayoutEffect, useState } from "react";
import './App.css';
import { useEffect} from "react";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import Products from "./components/Product/Products.js";
import ProductDetails from "./components/Product/ProductDetails.js"
import Search from "./components/Product/Search.js" 
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import WebFont from "webfontloader"; 
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store"
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions.js"
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js"
import UpdateProfile from "./components/User/UpdateProfile.js"
import UpdatePassword from "./components/User/UpdatePassword.js"
import ForgotPassword from "./components/User/ForgotPassword.js"
import ResetPassword from "./components/User/ResetPassword.js"
import Cart from "./components/Cart/Cart.js"
import Shipping from "./components/Cart/Shipping.js"
import ConfirmOrder from "./components/Cart/ConfirmOrder.js"
import axios from "axios";
import Payment from "./components/Cart/Payment.js"
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess.js"

// Not Used as it create problems.

//https://stackoverflow.com/questions/70193712/how-to-scroll-to-top-on-route-change-with-react-router-dom-v6#:~:text=You%20can%20use%20the%20above,()%3B%20%7D%20%7D%2C%20%5BasPath%5D)%3B
const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
} 

function App() {

  const {isAuthenticated, user} = useSelector(state=>state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} =await axios("api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"]
      }
    })

    store.dispatch(loadUser());
    getStripeApiKey();
  },[])
  return (
    <>
    <Router>
    
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Wrapper>
      <Routes>
        <Route exact path="/" element={<Home /> }/>
        <Route exact path="/product/:id" element={<ProductDetails/>}/>
        <Route exact path="/products" element={<Products/>}/>
        <Route path="/products/:keyword" element={<Products/>}/>
        <Route exact path="/search" element={<Search/>}/>
        <Route exact path="/login" element={<LoginSignUp/>}/>
        <Route exact path="/password/forgot" element={<ForgotPassword/>}/>
        <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
        {isAuthenticated && <Route exact path="/account" element={<Profile/>}/>}
        {isAuthenticated && <Route exact path="/me/update" element={<UpdateProfile/>}/>}
        {isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword/>}/>}
        {isAuthenticated && <Route exact path="/shipping" element={<Shipping/>}/>}
        {isAuthenticated && <Route exact path="/order/confirm" element={<ConfirmOrder/>}/>}
        
        {isAuthenticated  && <Route exact path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>}/>}
        
        {isAuthenticated && <Route exact path="/success" element={<OrderSuccess/>}/>}

      </Routes>
      </Wrapper>
      <Footer/>
      
    </Router>
    </>
  );
}
//11:38:00
export default App;
