import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Trade from "../components/Trade";
import { getOffer, acceptOffer, cancelOffer } from "../services/OfferService";
import Snackbar from '@mui/material/Snackbar';
import Alert from "./Alert";

const ManageOffer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [offer, setOffer] = useState();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'error'
    });

    const images = [
        require('../images/car1.jpg'),
        require('../images/car2.jpg'),
        require('../images/car3.jpg'),
        require('../images/car4.jpg'),
        require('../images/car5.jpg'),
        require('../images/car6.jpg'),
    ];

    const fetchOffer = async () => {
        try {
            const { trade } = location.state;
            if (!trade.offers || !trade.offers.length) return;
            const res = await getOffer({
                tradeId: trade.offers[0].tradeId,
                offeredTradeId: trade.offers[0].offeredTradeId,
                offeredBy: trade.offers[0].offeredBy
            });
            if (res.status === 200) {
                let newOffer = {
                    trade: res.data.trade,
                    offeredTrade: res.data.offeredTrade,
                    offeredBy: res.data.offeredBy
                };
                newOffer.trade.image =  images[Math.floor(Math.random() * images.length)];
                newOffer.offeredTrade.image = images[Math.floor(Math.random() * images.length)];
                setOffer(newOffer);
            }
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'Unable to fetch offer',
                severity: 'error'
            });
        }
        
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

    useEffect(() => {
        fetchOffer();
    }, []);

    const handleCancelOffer = async (action) => {
        try {
            const res = await cancelOffer({
                tradeId: offer.trade.id,
                offeredTradeId: offer.offeredTrade.id,
                offeredBy: offer.offeredBy
            });

            if (res.status === 200) {
                setSnackbar({
                    open: true,
                    message: (action == 'cancel') ? 'Offer cancelled successfully' : 'Offer rejected successfully',
                    severity: 'error'
                });
                setTimeout(() => {
                    navigate("/user/profile");
                }, 500);
            }
        } catch (err) {
            setSnackbar({
                open: true,
                message: (action == 'cancel') ? 'Unable to cancel offer' : 'Unable to reject offer',
                severity: 'error'
            });
        }
    }

    const handleAcceptOffer = async () => {
        try {
            const res = await acceptOffer({
                tradeId: offer.trade.id,
                offeredTradeId: offer.offeredTrade.id,
                offeredBy: offer.offeredBy
            });
            if (res.status === 200) {
                setSnackbar({
                    open: true,
                    message: 'Offer accepted successfully',
                    severity: 'success'
                });
                setTimeout(() => {
                    navigate("/user/profile");
                }, 500);
            }
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'Unable to accept offer',
                severity: 'error'
            });
        }
    }

    return (
        <div className="container my-2">
            <h3>Manage offer</h3>
            {offer && <div className="row d-flex flex-row">
                <Trade tradeDetails={offer.trade}/>
                <Trade tradeDetails={offer.offeredTrade}/>
            </div>}
            {location?.state?.trade?.createdBy == offer?.offeredBy && 
                <button className="btn btn-danger" onClick={() => handleCancelOffer('cancel')}>Cancel Offer</button>
            }
            {location?.state?.trade?.createdBy != offer?.offeredBy && 
                <>
                    <button className="btn btn-success" onClick={handleAcceptOffer}>Accept</button>
                    <button className="btn btn-danger mx-3" onClick={() => handleCancelOffer('reject')}>Reject</button>
                </>
            }
        </div>
    );
}

export default ManageOffer;