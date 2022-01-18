import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer"
import { profileReducer, userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer, // Backend data store to redux store
    user: userReducer,
    profile: profileReducer,
});

let intialState = {};

const middleware = [thunk];

const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store; 