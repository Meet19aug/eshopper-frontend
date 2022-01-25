import React, { Fragment, useState } from 'react'
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import BackDrop from "@material-ui/core/Backdrop"
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import ShopingCartIcon from "@material-ui/icons/ShoppingCart"

const UserOptions = ({ user }) => {

    const { cartItems } = useSelector((state) => state.cart);

    let navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ShopingCartIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ]

    if (user.role === "admin") {
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard }); // unshift add at first <-> shift remove first 
    }

    function dashboard() {
        navigate("/admin/dashboard");
    }
    function orders() {
        navigate("/orders");
    }
    function account() {
        navigate("/account");
    }
    function cart() {
        navigate("/cart");
    }
    function logoutUser() {
        dispatch(logout());
        navigate("/");
        alert.success("Logout Successfully");
    }

    return (
        <Fragment>
            <BackDrop open={open} style={{ zIndex: "10" }} /> {/*  When SpeedDial is open it makes background blur*/}
            <SpeedDial
                className="speedDial"
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                icon={<img
                    className='speedDialIcon'
                    src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                    alt="Profile"
                />}

            >
                {options.map((item) => (
                    <SpeedDialAction icon={item.icon} tooltipTitle={item.name} onClick={item.func} key={item.name} tooltipOpen={window.innerWidth <= 600 ? true : false} />
                ))}
            </SpeedDial>

        </Fragment>
    )
}

export default UserOptions
