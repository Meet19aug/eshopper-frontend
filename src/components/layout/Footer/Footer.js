import React from 'react';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css"


const Footer = () => {
    return (
        <footer>
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App For Android and IOS mobile Phone</p>
                <img src={playStore} alt="playstore"/>
                <img src={appStore} alt="appstore"/>
            </div>
            <div className="midFooter">
                <h1>Eshopper</h1>
                <p>Best Product is our first priority</p>
                <p>Copyright 2021 &copy; Eshopper</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://www.linkedin.com/in/meet-patel-a048231a0">LinkedIn</a>
                <a href="https://github.com/Meet19aug">Github</a>
                <a href="https://www.instagram.com/patel_meet_1908">Instagram</a>

            </div>
        </footer>
    )
}

export default Footer
