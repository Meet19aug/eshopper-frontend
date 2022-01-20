import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            // check if item is already exist in cart or not with product Id.
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i  // if product is same as cart product than replace that product with new same product with updated quantity.
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item], // we are adding item to new cartItem array with old products.
                }
            }
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload), // When press remove button than it filter and select the product where product id is not matched to products.
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            }
        default:
            return state;
    }
}
