import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../images/mighty_motors_logo.png';
import AuthApi from '../utils/AuthApi';
import { signout } from '../services/AuthService';

const NavBar = () => {
    const navigate = useNavigate();
    const [toggleNavbar, setToggleNavBar] = useState(false);
    const authApi = useContext(AuthApi);

    const handleLogout = async () => {
        try {
            await signout();
            authApi.setAuth(false);
            navigate("/");
        } catch(err) {
            authApi.setAuth(false);
        }
    }

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid" id="primary-nav">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Mighty Motors" height={75}/>
                </Link>
                <button className="navbar-toggler" type="button" onClick={() => setToggleNavBar(!toggleNavbar)} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={toggleNavbar ? "collapse navbar-collapse showSupportedContent" : "collapse navbar-collapse hideSupportedContent"} id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        { authApi.auth && <li className="nav-item">
                            <Link className="nav-link" to="/newTrade">Start Trading</Link>
                        </li> }
                        { authApi.auth && <li className="nav-item">
                            <Link className="nav-link" to="/user/profile">Profile</Link>
                        </li> }
                        { authApi.auth && <li className="nav-item">
                            <span className="nav-link" style={{cursor: 'pointer'}} onClick={handleLogout}>Log out</span>
                        </li> }
                        { !authApi.auth &&  <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li> } 
                        { !authApi.auth && <li className="nav-item">
                            <Link className="nav-link" to="/signUp">Sign up</Link>
                        </li> }
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