import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import "./ProductDetails.css";
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productAction';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from "./ReviewCard.js"
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';


// For backend req.params.id as same way for frontend match is used.
const ProductDetails = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();

    //This will fetch data from redux Store to frontend.
    const { product, loading, error } = useSelector((state) => state.productDetails)

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
    }
    const [quantity, setQuantity] = useState(1);

    const increseQuantity = () => {
        if (product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreseQuantity = () => {
        if (quantity <= 1) return;
        const qty = quantity - 1;
        setQuantity(qty);
    }

    //Functionality for add to cart Button
    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
    }

    //This will only fetch data from backend to redux store 
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, error, alert])


    return (
        <Fragment>
            {loading ? <Loader /> : (<Fragment>
                <div className="ProductDetails">
                    <MetaData title={`${product.name} -- ESHOPPER`} />
                    <div>
                        <Carousel>
                            {product.images &&
                                product.images.map((item, i) => (
                                    <img
                                        className="CarouselImage"
                                        key={i}
                                        src={item.url}
                                        alt={`${i} Slide`}
                                    />
                                ))}
                        </Carousel>
                    </div>
                    <div>
                        <div className="detailsBlock-1">
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>
                        </div>
                        <div className="detailsBlock-2">
                            <ReactStars {...options} />
                            <span>({product.numOfReviews} Reviews)</span>
                        </div>
                        <div className="detailsBlock-3">
                            <h1>{`₹${product.price}`}</h1>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <button onClick={decreseQuantity}>-</button>
                                    <input readOnly type="number" value={quantity} />
                                    <button onClick={increseQuantity}>+</button>
                                </div>
                                <button onClick={addToCartHandler}>
                                    Add to Cart
                                </button>
                            </div>

                            <p>
                                Status:
                                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>
                        </div>
                        <div className="detailsBlock-4">
                            Description : <p>{product.description}</p>
                        </div>
                        <button className="submitReview">
                            Submit Review
                        </button>

                    </div>
                </div>

                <h3 className="reviewsHeading">REVIEWS</h3>
                {product.reviews && product.reviews[0] ? (
                    <div className="reviews">
                        {product.reviews &&
                            product.reviews.map((review) => (
                                <ReviewCard review={review} />
                            ))}
                    </div>
                ) : (
                    <p className="noReviews">No Reviews Yet</p>
                )}
            </Fragment>)}
        </Fragment>
    )
}

export default ProductDetails
