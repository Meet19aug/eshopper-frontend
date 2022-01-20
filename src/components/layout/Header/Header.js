import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';


const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Eshopper</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" aria-current="page" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            </ul>


            <Link className="navbar-brand" to="/search"><i className="fas fa-search fa-1x my-1" style={{fontSize: "1.5em"}}></i></Link>
          <Link className="navbar-brand" to="/cart"><i className="fa fa-shopping-cart fa-1x my-1" style={{fontSize: "1.5em", color: cartItems.length > 0 ? "tomato" : "unset" }}aria-hidden="true"></i></Link>
          <Link className="navbar-brand" to="/login"><i className="fas fa-user-circle fa-1x my-1" style={{fontSize: "1.5em"}}></i></Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
