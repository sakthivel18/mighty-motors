import React, { useState } from "react";
import { useEffect } from "react";
import AuthApi from "../utils/AuthApi";
import "../styles/home.css";
import { useContext } from "react";
import { hasLoggedIn } from "../services/AuthService";
import { getUserTrades } from "../services/TradeService";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const Profile = () => {
    const navigate = useNavigate();
    const authApi = useContext(AuthApi);
    const [username, setUsername] = useState("");
    const [userTrades, setUserTrades] = useState([]);   

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
        } catch (err) {
            setUserTrades([]);
        }
    }   

    useEffect(() => {
        if (!authApi.auth) navigate("/");
        fetchUserTrades();
    }, []);
    
    const deleteTrade = async (trade) => {
        try {
            await axios.delete('http://localhost:5000/trades/' + trade.id, {withCredentials: true});
            fetchUserTrades();
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

    return (
        <div className="container home-page-content">
            { username.length && <h2>Greetings, {username}</h2> }
            <h2>Welcome to Mighty Motors!</h2>
            <p>Where people go to find and trade cars. <br/>
            Check out our new section on premium cars</p> 
            <div className="card">
                <div className="card-header">
                    <h4>Trades </h4>
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
                            userTrades.length !== 0 && userTrades.map(trade => <tr>
                                <td>{trade.name}</td>
                                <td>{trade.categoryName}</td>
                                <td>{new Date(trade.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleUpdate(trade)}> Update </button> 
                                    <button className="btn btn-danger mx-1" onClick={() => deleteTrade(trade)}> Delete </button>
                                </td>
                            </tr>)
                        }
                        {
                            userTrades.length === 0 && <h5 className="m-3 text-center">There no trades created yet.</h5>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Profile;