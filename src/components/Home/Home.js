import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product"

const product= {
    name: " Blue Tshirt",
    images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
    price : "3000",
    _id: "meet",
};

const Home = () => {
  return (    
    <Fragment>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
              <Product product={product}/>
              <Product product={product}/>
              <Product product={product}/>
              <Product product={product}/>
              <Product product={product}/>
              <Product product={product}/>
              <Product product={product}/>
          </div>
    </Fragment>
  );
};

export default Home;