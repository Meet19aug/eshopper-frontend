import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer"
import { profileReducer, userReducer, forgotPasswordReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer, // Backend data store to redux store
    user: userReducer,
    profile: profileReducer,
    forgotPassword : forgotPasswordReducer, 
    cart : cartReducer,
});
// if local storage has data than take it otherwise empty
let intialState = {
    cart:{
        cartItems: localStorage.getItem("cartItems") // same name as given in cartAction to store locally
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
        shippingInfo: localStorage.getItem("shippingInfo") // same name as given in cartAction to store locally
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    }
};

const middleware = [thunk];

const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store; 