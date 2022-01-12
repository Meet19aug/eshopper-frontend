import React, {useLayoutEffect } from "react";
import './App.css';
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import Products from "./components/Product/Products.js";
import ProductDetails from "./components/Product/ProductDetails.js"
import Search from "./components/Product/Search.js" 
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'

import WebFont from "webfontloader"; 
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store"
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions.js"
import { useSelector } from "react-redux";

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

  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"]
      }
    })

    store.dispatch(loadUser());
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
      </Routes>
      </Wrapper>
      <Footer/>
      
    </Router>
    </>
  );
}
//8:30:00
export default App;
