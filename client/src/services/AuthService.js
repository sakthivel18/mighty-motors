import axios from "axios";

const url = "http://localhost:5000";
const login = user => axios.post(url + "/user/login", user, {withCredentials: true});
const signup = user =>  axios.post(url + "/user/signup", user, {withCredentials: true});
const hasLoggedIn = () => axios.get(url + "/user/hasLoggedIn", {withCredentials: true});
const signout = () => axios.get(url + "/user/signout", {withCredentials: true});

export {
    login,
    signup,
    hasLoggedIn,
    signout
}