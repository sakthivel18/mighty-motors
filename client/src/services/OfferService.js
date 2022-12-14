import axios from "axios";

const url = "http://localhost:5000";
const createOffer = offer => axios.post(url + "/offer/create", offer, {withCredentials: true});
const getOffers = () => axios.get(url + "/offer/show", {withCredentials: true});
const cancelOffer = offer => axios.post(url + "/offer/cancel", offer, {withCredentials: true});
const getOffer = offer => axios.post(url + "/offer/showOffer", offer, {withCredentials: true});
const acceptOffer = offer => axios.post(url + "/offer/accept", offer, {withCredentials: true});

export {
    createOffer,
    getOffers,
    cancelOffer,
    getOffer,
    acceptOffer
}