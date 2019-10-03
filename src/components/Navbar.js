import React from 'react';
import {Link, NavLink } from 'react-router-dom'; 


const Navbar = (props) =>{
    return(
        <div className="nav-wrapper darken-3 navBar">
            <div className="container-fluid">
                <div className="row">
                    <div className = "col-sm-3">
                        <img src="./PAAE_logo.jpg" className="logo" alt="logo" />
                    </div>
                    <div className = "col-sm-6">
                        <h2 className="main-title">CMHC Barrier Estimation Tool</h2>
                    </div>
                    <div className="col">
                    
                        <nav className="navBarLink">
                        <ul className="active">
                            <li><a href="https://www.patchingassociates.com/">PAAE Canada Home</a></li>
                            <li><a href="https://www.patchingassociates.com/contact-us/">Contact</a></li>
                        </ul>
                        </nav> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar