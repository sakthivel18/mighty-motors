import axios from "axios";

const url = "http://localhost:5000";
const createOffer = offer => axios.post(url + "/offer/create", offer, {withCredentials: true});
const getOffers = () => axios.get(url + "/offer/show", {withCredentials: true});
const cancelOffer = offer => axios.post(url + "/offer/cancel", offer, {withCredentials: true});

export {
    createOffer,
    getOffers,
    cancelOffer
}