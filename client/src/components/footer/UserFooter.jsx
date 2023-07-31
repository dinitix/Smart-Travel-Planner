import React from 'react'
import "./userfooter.css"
import logo from "../../assets/tripgenielogo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagram, faPinterestSquare, faRedditSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

function UserFooter() {
    return (
        <div className='footer'>
            <div className="logo-container">
                <img className="footer-logo" src={logo} alt="Logo" />
            </div>

            <div className="line">
                <hr />
            </div>

            <div className="copyright">
                <p className='copywrite-txt'>Copyright © 20022-2023 TRIPGENIE Inc. All Rights Reserved.</p>
            </div>

        </div>
    )
}

export default UserFooter