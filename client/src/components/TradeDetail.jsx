import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/tradeDetail.css";
import Snackbar from '@mui/material/Snackbar';
import Alert from "./Alert";
import AuthApi from "../utils/AuthApi";
import { watchUnwatchTrade, getAvailableTrades } from "../services/TradeService";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createOffer } from '../services/OfferService';

const TradeDetail = () => {
    const authApi = useContext(AuthApi);
    const navigate = useNavigate();
    const location = useLocation();
    const [trade, setTrade] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'error'
    });
    const [show, setShow] = useState(false);
    const [availableTrades, setAvailableTrades] = useState([]);
    const [selectedAvailableTrade, setSelectedAvailableTrade] = useState();

    const handleCloseModal = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (!location || !location.state || !location.state.image || !location.state.id) {
            navigate('/error', { state : { 
                "status" : 400,
                "message": "Bad Request - validation error"
             }});
        }
    }, []);

    const fetchTrade = async () => {
        try {
            const response = await axios.get('http://localhost:5000/trades/' + location.state.id, {withCredentials: true});
            setTrade(response.data.trade);
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
    
    useEffect(() => {
        fetchTrade();
    }, []);
    
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

    const deleteTrade = async () => {
        try {
            await axios.delete('http://localhost:5000/trades/' + location.state.id, {withCredentials: true});
            await setSnackbar({
                open: true,
                message: 'Trade deleted successfully',
                severity: 'success'
            });
            setTimeout(() => {
                navigate('/trades');
            }, 500);
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

    const handleTrade = () => {
        if (!authApi.auth) return navigate("/login");
        handleShow();
    }

    const handleWatch = async () => {
        if (!authApi.auth) return navigate("/login");
        try {
            let res = await watchUnwatchTrade(trade.id);
            fetchTrade();
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'Unable to watch trade',
                severity: 'error'
            })
        }
    }

    const handleMakeOffer = async () => {
        try {
            const res = await createOffer({
                tradeId: trade.id,
                offeredTradeId: selectedAvailableTrade.id
            });
            if (res.status === 200) {
                handleCloseModal();
                setTimeout(() => {
                    setSnackbar({
                        open: true,
                        message: 'Offer made successfully',
                        severity: 'success'
                    });
                }, 500);
                setTimeout(() => { navigate("/user/profile"); }, 100);
            }
            
        } catch (err) {
            handleCloseModal();
            setTimeout(() => {
                setSnackbar({
                    open: true,
                    message: 'Unable to make offer',
                    severity: 'error'
                });
            }, 500);
        }
        
        
    }

    useEffect(() => {
        const fetchAvailableTrades = async () => {
            let res = await getAvailableTrades();
            setAvailableTrades(res.data.trades);
            if (res.data.trades && res.data.trades.length !== 0) setSelectedAvailableTrade(res.data.trades[0]);
        }
        fetchAvailableTrades();
    }, []);

    return ( 
        <div className="container tradeDetailContainer">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6"> <h4> {trade?.name} </h4> </div>
                            {trade?.creator === false && <div className="col-md-4 d-flex flex-row-reverse"> 
                                {trade?.status === "Available"  && <button className="btn btn-success mx-3" type="button" onClick={handleTrade}>Trade</button> }
                                { (trade?.isWatched === false || trade?.isWatched === null) && <button className="btn btn-primary" type="button" onClick={handleWatch}>Watch</button>  }
                                { trade?.isWatched === true && <button className="btn btn-primary" type="button" onClick={handleWatch}>Unwatch</button> }
                            </div>}
                            {trade?.creator && <div className="col-md-4 d-flex flex-row-reverse"> 
                                <button className="btn btn-danger mx-3" type="button" onClick={deleteTrade}>Delete</button> 
                                <button className="btn btn-primary" type="button" onClick={() => navigate('/editTrade/' + trade.id, { state : { trade: trade, image: location?.state?.image }})}>Edit</button>  
                            </div>}
                        </div>
                        { location && location.state && location.state.image && <img src={location.state.image} alt={"car image" + Math.random()} height={200}/> }
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <h6 className="mt-1">Cost:</h6>
                    <p>
                        ${trade?.cost}
                    </p>
                </div>
                <div className="col-md-2"></div>
            </div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <h6 className="mt-1">Location:</h6>
                    <p>
                        {trade?.location}
                    </p>
                </div>
                <div className="col-md-2"></div>
            </div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <h6 className="mt-1">Description:</h6>
                    <p>
                        {trade?.description}
                    </p>
                </div>
                <div className="col-md-2"></div>
            </div>
            {SnackbarAlert}
            <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose an item to trade</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Select aria-label="Default select example">
                    { availableTrades.map(trade => <option key={trade.name} value={trade} onChange={e => setSelectedAvailableTrade(e.target.value)}>{trade.categoryName + " - " + trade.name} </option>) }
                </Form.Select>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleMakeOffer}>
                    Make Offer
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
     );
}
 
export default TradeDetail;