import axios from "axios";

const url = "http://localhost:5000";
const getUserTrades = () => axios.get(url + "/user/trades", {withCredentials: true});
const watchUnwatchTrade = id => axios.get(url + "/trades/watchlist/" + id, {withCredentials: true});
const getWatchlist = () => axios.get(url + "/user/watchlist", {withCredentials: true});
const getAvailableTrades = () => axios.get(url + "/user/availableTrades", {withCredentials: true});
const fetchTrade = id => axios.get(url + "/trades/"+ id, {withCredentials: true});
export {
    getUserTrades,
    watchUnwatchTrade,
    getWatchlist,
    getAvailableTrades,
    fetchTrade
}