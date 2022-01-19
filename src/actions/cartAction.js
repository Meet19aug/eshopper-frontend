import { ADD_TO_CART } from "../constants/cartConstants";
import axios from "axios";

export const addItemsToCart = (id, quantity) => async (dispatch,getState) => {

    const { data } = await axios.get(`/api/v1/product/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity,
        }
    })
    // when we add item to cart if user reload than it will lost so we have to store in local storage of browser.
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
};