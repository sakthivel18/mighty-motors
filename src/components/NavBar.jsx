import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const NavBar = () => {
    const [toggleNavbar, setToggleNavBar] = useState(false);
    
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid" id="primary-nav">
                <Link className="navbar-brand" to="/">Mighty Motors</Link>
                <button className="navbar-toggler" type="button" onClick={() => setToggleNavBar(!toggleNavbar)} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={toggleNavbar ? "collapse navbar-collapse showSupportedContent" : "collapse navbar-collapse hideSupportedContent"} id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/newTrade">Start Trading</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signUp">Sign up</Link>
                        </li>
                    </ul>
                </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid" id="secondary-nav">
                    <Link className="nav-link" to="/trades">Trades</Link>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default NavBar;