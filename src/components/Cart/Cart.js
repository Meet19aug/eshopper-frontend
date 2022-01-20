import React, { Fragment } from 'react'
import "./Cart.css"
import CartItemCard from "./CartItemCard.js"
import { useSelector, useDispatch } from 'react-redux'
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import RemoveShoppingCartIcon from  "@material-ui/icons/RemoveShoppingCart"
import { useNavigate } from 'react-router-dom'; 

const Cart = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state) => state.cart);

    const increseQuantity = (id, quantity, stock) =>{
        const newQty = quantity + 1;
        if(stock <= quantity){
            return;
        }
        dispatch(addItemsToCart(id,newQty))
    }

    const decreseQuantity = (id, quantity) =>{
        const newQty = quantity - 1;
        if(quantity<=1){
            return;
        }
        dispatch(addItemsToCart(id,newQty))
    }

    const deleteCartItems = (id) =>{
        dispatch(removeItemsFromCart(id));
    }

    const checkoutHandler = ()=>{
        console.log("Cart.js CheckoutHandler");
        navigate("/login", {state:"/shipping"});
    }

    return (
        <Fragment>
            {cartItems.length === 0 ? 
            <div className="emptyCart">
                <RemoveShoppingCartIcon/>
                <Typography>No Products in your Cart.</Typography>
                <Link to="/products">View Products</Link>

            </div>
            
            
            :<Fragment>
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>SubTotal</p>
                </div>
                {cartItems && cartItems.map((item)=>(
                    <div className="cartContainer" key={item.product}>
                    <CartItemCard item={item} deleteCartItems={deleteCartItems}/>
                    <div className="cartInput">
                        <button onClick={()=> decreseQuantity(item.product, item.quantity)}>-</button>
                        <input type="number" readOnly value={item.quantity} />
                        <button onClick={()=> increseQuantity(item.product, item.quantity, item.stock)}>+</button>
                    </div>
                    <p className="cartSubtotal">{`₹${item.price*item.quantity}`}</p>
                </div>
                ))}
                <div className="cartGrossTotal">
                    <div>
                    </div>
                    <div className="cartGrossTotalBox">
                        <p>Gross Total</p>
                        <p>{`₹${cartItems.reduce(
                            (acc,item)=>acc + item.quantity * item.price,
                            0
                        )}`}</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                        <button onClick={checkoutHandler}>Check Out</button>
                    </div>
                </div>
            </div>
        </Fragment>}
        </Fragment>
    )
}

export default Cart
