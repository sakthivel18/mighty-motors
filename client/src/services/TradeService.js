import axios from "axios";

const url = "http://localhost:5000";
const getUserTrades = () => axios.get(url + "/user/trades", {withCredentials: true});

export {
    getUserTrades
}