import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import "./ProductDetails.css";
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import ReviewCard from "./ReviewCard.js"
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button} from "@material-ui/core";
import { Rating }from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../constants/productConstants';


// For backend req.params.id as same way for frontend match is used.
const ProductDetails = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();

    //This will fetch data from redux Store to frontend.
    const { product, loading, error } = useSelector((state) => state.productDetails)

    const { success, error: reviewError} = useSelector((state)=> state.newReview)

    const options = {
        size: "mediam",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    }
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

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

    const submitReviewToggle = () =>{
        open?setOpen(false): setOpen(true);
    }

    const reviewSubmitHandler = () =>{
        const myForm = new FormData();

        myForm.set("rating",rating);
        myForm.set("comment",comment);
        myForm.set("productId",id);

        dispatch(newReview(myForm));

        setOpen(false);
        
    }

    //This will only fetch data from backend to redux store 
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
        }
        if(success){
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET})
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, error, alert, reviewError, success])


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
                            <Rating {...options} />
                            <span className='detailsBlock-2-span'>({product.numOfReviews} Reviews)</span>
                        </div>
                        <div className="detailsBlock-3">
                            <h1>{`₹${product.price}`}</h1>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <button onClick={decreseQuantity}>-</button>
                                    <input readOnly type="number" value={quantity} />
                                    <button onClick={increseQuantity}>+</button>
                                </div>
                                <button disabled={product.Stock < 1 ? true:false} onClick={addToCartHandler}>
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
                        <button className="submitReview" onClick={submitReviewToggle}>
                            Submit Review
                        </button>

                    </div>
                </div>

                <h3 className="reviewsHeading">REVIEWS</h3>
                <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="submitDialog">
                        <Rating
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            size="large"
                        />
                        <textarea className="submitDialogTextArea"
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                        <Button color="primary" onClick={reviewSubmitHandler}>Submit</Button>

                    </DialogActions>

                </Dialog>


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
