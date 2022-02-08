import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewReducer, productsReducer, reviewReducer } from "./reducers/productReducer"
import { profileReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetialsReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrderReducer, myOrderReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer, // Backend data store to redux store
    user: userReducer,
    profile: profileReducer,
    forgotPassword : forgotPasswordReducer, 
    cart : cartReducer,
    newOrder : newOrderReducer,
    myOrders : myOrderReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrderReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetialsReducer,
    productReviews : productReviewReducer,
    review : reviewReducer
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