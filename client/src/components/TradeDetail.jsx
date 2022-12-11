import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/tradeDetail.css";
import Snackbar from '@mui/material/Snackbar';
import Alert from "./Alert";
import AuthApi from "../utils/AuthApi";
import { watchUnwatchTrade } from "../services/TradeService";

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

    return ( 
        <div className="container tradeDetailContainer">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6"> <h4> {trade?.name} </h4> </div>
                            <div className="col-md-4 d-flex flex-row-reverse"> 
                                <button className="btn btn-success mx-3" type="button" onClick={handleTrade}>Trade</button> 
                                { (trade?.isWatched === false || trade?.isWatched === null) && <button className="btn btn-primary" type="button" onClick={handleWatch}>Watch</button>  }
                                { trade?.isWatched === true && <button className="btn btn-primary" type="button" onClick={handleWatch}>Unwatch</button> }
                            </div>
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
        </div>
     );
}
 
export default TradeDetail;