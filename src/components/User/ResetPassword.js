import React, { Fragment, useState, useEffect } from 'react'
import "./ResetPassword.css"
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock"; 
import { useParams } from "react-router-dom";

// For backend req.params.id as same way for frontend match is used.
const ResetPassword = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { token } = useParams();
    console.log("\n\nBefore token\n\n: ", token);
    const { error, success, loading } = useSelector((state) => state.forgotPassword); // We are taking information for forgotPassword Reducer in store.

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
    console.log("\n\nAfter token\n\n: ", token);
        
        dispatch(resetPassword(token ,myForm))
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }
        if (success) {
            alert.success("Password Updated Successfully");
            navigate("/login");
        }
    }, [dispatch, alert, error, navigate, success])
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Reset Password" />
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading">Update Profile</h2>
                            <form
                                className="resetPasswordForm"
                                onSubmit={resetPasswordSubmit}
                            >
                            <div>
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <LockIcon />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                                
                                <input type="submit" value="Update" className="resetPasswordBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>
                )}
        </Fragment>
    )
}

export default ResetPassword
