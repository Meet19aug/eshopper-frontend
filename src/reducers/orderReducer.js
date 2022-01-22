import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_SUCCESS,
    CLEAR_ERRORS,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: true,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const myOrderReducer = (state = {order: []}, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
                loading: true,
            }
        case MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case MY_ORDERS_FAIL:
            return {
                loading: true,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};