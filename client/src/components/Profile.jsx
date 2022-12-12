import React, { useState } from "react";
import { useEffect } from "react";
import AuthApi from "../utils/AuthApi";
import "../styles/home.css";
import { useContext } from "react";
import { hasLoggedIn } from "../services/AuthService";
import { getUserTrades, getWatchlist, watchUnwatchTrade } from "../services/TradeService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from "./Alert";
import { getOffers, cancelOffer } from "../services/OfferService";

const Profile = () => {
    const navigate = useNavigate();
    const authApi = useContext(AuthApi);
    const [username, setUsername] = useState("");
    const [userTrades, setUserTrades] = useState([]);  
    const [userWatchlist, setUserWatchList] = useState([]); 
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'error'
    });
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        if (!authApi.auth) navigate("/");
        const fetchUserProfile = async () => {
            const res = await hasLoggedIn();
            if (res.data.user) {
                let {firstName, lastName} = res.data.user;
                setUsername(firstName + " " + lastName);
            } else {
                setUsername("");
            }
        }
        fetchUserProfile();
    }, []);

    const images = [
        require('../images/car1.jpg'),
        require('../images/car2.jpg'),
        require('../images/car3.jpg'),
        require('../images/car4.jpg'),
        require('../images/car5.jpg'),
        require('../images/car6.jpg'),
    ];
    
    const fetchUserTrades = async() => {
        try {
            const res = await getUserTrades();
            setUserTrades(res.data.trades);
            fetchOffers();
        } catch (err) {
            setUserTrades([]);
        }
    }   

    const fetchUserWatchlist = async() => {
        try {
            const res = await getWatchlist();
            setUserWatchList(res.data.trades);
            
        } catch (err) {
            setUserWatchList([]);
        }
        

    }

    useEffect(() => {
        if (!authApi.auth) return navigate("/");
        fetchUserTrades();
    }, []);

    useEffect(() => {
        if (!authApi.auth) return navigate("/");
        fetchUserWatchlist();
    }, []);
    
    const deleteTrade = async (trade) => {
        try {
            await axios.delete('http://localhost:5000/trades/' + trade.id, {withCredentials: true});
            await setSnackbar({
                open: true,
                message: 'Trade deleted successfully',
                severity: 'success'
            });
            setTimeout(() => {
                fetchUserTrades();
            }, 0);
        } catch(axiosError) {
            let { status } = axiosError.response;
            let { message } = axiosError.response.data;
            let error = {
                "status": status,
                "message": message
            }
            navigate('/error', { state : { error }});
        }
    }

    const handleUpdate = (trade) => {
        let randomIndex = Math.floor(Math.random() * images.length);
        let image = images[randomIndex];
        navigate("/editTrade/" + trade.id , {
            state: {
                trade: trade,
                image: image
            }
        });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({
            open: false,
            message: '',
            severity: 'error'
        })
    }

    const SnackbarAlert = (
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbar.message}
                key={'top' + 'center'}
            >
                <Alert severity={snackbar.severity} onClose={handleClose} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>   
            </Snackbar>
        
    );
    
    const handleUnwatch = async (id) => {
        try {
            let res = await watchUnwatchTrade(id);
            fetchUserWatchlist();
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'Unable to watch trade',
                severity: 'error'
            })
        }
    }

    const fetchOffers = async () => {
        try {
            const res = await getOffers();
            if (res.status === 200) {
                setOffers(res.data.offers);
            } else {
                setOffers([]);
            }
        } catch (err) {
            setOffers([]);
        }
    };

   /*  useEffect(() => {
        fetchOffers();
    }, []); */

    const handleCancelOffer = async (offer) => {
        try {
            const res = await cancelOffer(offer);
            if (res.status === 200) {
                setSnackbar({
                    open: true,
                    message: 'Offer cancelled successfully',
                    severity: 'success'
                });
            }
            fetchUserTrades();
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'Unable to cancel offer',
                severity: 'error'
            });
        }
    }

    const handleManageOffer = (trade) => {
        return navigate("/offer/manage", {
            state: {
                trade
            }
        });
    }

    return (
        <div className="container my-2">
            { username.length && <h2>Greetings, {username}</h2> }
            <h2>Welcome to Mighty Motors!</h2>
            <p>Where people go to find and trade cars. <br/>
            Check out our new section on premium cars</p> 
            <div className="card">
                <div className="card-header">
                    <h4>Your Trades </h4>
                </div>
                <div class="table-responsive">
                    <table className="card-table table my-0">
                        <thead>
                        <tr>
                            <th scope="col">Name </th>
                            <th scope="col">Category</th>
                            <th scope="col">Created on</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            userTrades.length !== 0 && userTrades.map(trade => <tr>
                                <td>{trade.name}</td>
                                <td>{trade.categoryName}</td>
                                <td>{new Date(trade.createdAt).toLocaleDateString()}</td>
                                <td>{trade.status}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleUpdate(trade)}> Update </button> 
                                    <button className="btn btn-danger mx-1" onClick={() => deleteTrade(trade)}> Delete </button>
                                    {trade.offers && trade.offers.length > 0 && <button className="btn btn-secondary mx-1" onClick={() => handleManageOffer(trade.offers)}> Manage Offer </button>}
                                </td>
                            </tr>)
                        }
                        {
                            userTrades.length === 0 && <h5 className="m-3 text-center">There are no trades created yet.</h5>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card my-2">
                <div className="card-header">
                    <h4>Your Watchlist </h4>
                </div>
                <div class="table-responsive">
                    <table className="card-table table my-0">
                        <thead>
                        <tr>
                            <th scope="col">Name </th>
                            <th scope="col">Category</th>
                            <th scope="col">Created on</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            userWatchlist.length !== 0 && userWatchlist.map(trade => <tr>
                                <td>{trade.name}</td>
                                <td>{trade.categoryName}</td>
                                <td>{new Date(trade.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleUnwatch(trade.id)}> Unwatch </button> 
                                </td>
                            </tr>)
                        }
                        {
                            userWatchlist.length === 0 && <h5 className="m-3 text-center">There are no trades watchlisted yet.</h5>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card my-2">
                <div className="card-header">
                    <h4>Your Offers </h4>
                </div>
                <div class="table-responsive">
                    <table className="card-table table my-0">
                        <thead>
                        <tr>
                            <th scope="col">Name </th>
                            <th scope="col">Category</th>
                            <th scope="col">Created on</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            offers.length !== 0 && offers.map(offer => <tr>
                                <td>{offer.trade.name}</td>
                                <td>{offer.categoryName}</td>
                                <td>{new Date(offer.trade.createdAt).toLocaleDateString()}</td>
                                <td>{offer.trade.status}</td>
                                <td>
                                <button className="btn btn-danger" onClick={() => handleCancelOffer(offer)}> Cancel Offer </button> 
                                </td>
                            </tr>)
                        }
                        {
                            offers.length === 0 && <h5 className="m-3 text-center">There are no trades watchlisted yet.</h5>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            {SnackbarAlert}
        </div>
    );
}

export default Profile;