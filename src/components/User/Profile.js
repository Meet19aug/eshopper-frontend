import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux"; // so we can import user form redux store.
import { useNavigate } from 'react-router-dom'; 
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css"

const Profile = () => {
    let navigator = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user); // loading data from redux store
  useEffect(() => {
      if(isAuthenticated===false){
        navigator("/login");
      }
  }, [navigator, isAuthenticated])
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
