import { ADD_TO_CART } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            // check if item is already exist in cart or not with product Id.
            const isItemExist = state.cartItems.find(
                (i) => i.product ===  item.product  
            );

            if(isItemExist){
                return{
                    ...state,
                    cartItems: state.cartItems.map((i)=>
                        i.product === isItemExist.product ? item : i  // if product is same as cart product than replace that product with new same product with updated quantity.
                    )
                }
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item], // we are adding item to new cartItem array with old products.
                }
            }
            
    
        default:
            return state;
    }
}
