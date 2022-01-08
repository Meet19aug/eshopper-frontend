import React, { useState, Fragment } from "react";
import { useNavigate } from 'react-router-dom'; 
import MetaData from "../layout/MetaData";
import "./Search.css";
/*
For Adding Search Functionality 1>.Backend Functionality is working properly.  2>.Action>productAction 
    made the variable link and fetch the data with axios 
    3> In search file we useNavigator for routing purpose.
    4> product> product.js file we got the parameter with use params and passes through dispatch(getProduct(keyword));
*/
const Search = () => {
    let history = useNavigate();
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault(); // Reloading is turned of when submitting the form.
        if (keyword.trim()) {
            history(`/products/${keyword}`);
        } else {
            history("/products");
        }
    };
    return (
        <Fragment>
            <MetaData title="Search A Product -- Eshopper" />

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident delectus alias natus maxime quam eius magni illum minima consectetur assumenda.
            </p>
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search a Product ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    )
}

export default Search;
