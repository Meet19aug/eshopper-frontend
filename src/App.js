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
import MyOrders from "./components/Order/MyOrders.js"
import OrderDetails from "./components/Order/OrderDetails.js"
import Dashboard from "./components/Admin/Dashboard.js";
// import ProtectedRoute from "./components/Route/ProtectedRoute";
import ProductList from "./components/Admin/ProductList.js"
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct.js"
import OrderList from "./components/Admin/OrderList.js"
import ProcessOrder from "./components/Admin/ProcessOrder.js"
import UsersList from "./components/Admin/UsersList.js"
import UpdateUser from "./components/Admin/UpdateUser.js"
import ProductReviews from "./components/Admin/ProductReviews.js"
import Contact from "./components/layout/Contact/Contact.js";
import About from "./components/layout/About/About.js";


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
    const {data} =await axios("/api/v1/stripeapikey");

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
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/about" element={<About/>}/>
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
        {isAuthenticated && <Route exact path="/orders" element={<MyOrders/>}/>}
        {isAuthenticated && <Route exact path="/order/:id" element={<OrderDetails/>}/>}

        {/* Admin Routes  */}
        {isAuthenticated  && user.role==="admin" &&<Route exact path="/admin/dashboard" element={<Dashboard/>}/>}
        {isAuthenticated  && user.role==="admin" &&<Route exact path="/admin/products" element={<ProductList/>}/>}
        {isAuthenticated  && user.role==="admin" &&<Route exact path="/admin/product/" element={<NewProduct/>}/>}
        {isAuthenticated  && user.role==="admin" &&<Route exact path="/admin/product/:id" element={<UpdateProduct/>}/>}
        {isAuthenticated  && user.role==="admin" &&<Route exact path="/admin/orders" element={<OrderList/>}/>}
        {isAuthenticated  && user.role==="admin" &&<Route exact path="/admin/order/:id" element={<ProcessOrder/>}/>}
        {isAuthenticated  && user.role==="admin" &&<Route exact path="/admin/users" element={<UsersList/>}/>}
        {isAuthenticated  && user.role==="admin" &&<Route exact path="/admin/user/:id" element={<UpdateUser/>}/>}
        {isAuthenticated  && user.role==="admin" &&<Route exact path="/admin/reviews" element={<ProductReviews/>}/>}



      </Routes>
      </Wrapper>
      <Footer/>
      
    </Router>
    </>
  );
}
//15:27:00
export default App;
