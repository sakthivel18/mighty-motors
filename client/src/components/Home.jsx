import React, { useState } from "react";
import { useEffect } from "react";
import AuthApi from "../utils/AuthApi";
import "../styles/home.css";
import { useContext } from "react";
import { hasLoggedIn } from "../services/AuthService";
const Home = () => {
    const authApi = useContext(AuthApi);
    const [username, setUsername] = useState("");   

    useEffect(() => {
        if (!authApi.auth) return;
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

    return (
        <div className="container home-page-content">
            { username.length !== 0 && <h2>Greetings, {username}</h2> }
            <h2>Welcome to Mighty Motors!</h2>
            <p>Where people go to find and trade cars. <br/>
            Check out our new section on premium cars</p> 
        </div>  
    );
}
 
export default Home;
