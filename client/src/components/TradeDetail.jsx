import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/tradeDetail.css";

const TradeDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [trade, setTrade] = useState(null);

    useEffect(() => {
        if (!location || !location.state || !location.state.image || !location.state.id) {
            navigate('/error', { state : { 
                "status" : 404,
                "message": "Page Not Found"
             }});
        }
    }, []);

    useEffect(() => {
        const fetchTrade = async () => {
            try {
                const response = await axios.get('http://localhost:5000/trades/' + location.state.id);
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
        fetchTrade();
    }, []);

    const deleteTrade = async () => {
        try {
            await axios.delete('http://localhost:5000/trades/' + location.state.id);
            navigate('/trades');
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
                                <button className="btn btn-danger mx-3" type="button" onClick={deleteTrade}>Delete</button> 
                                <button className="btn btn-primary" type="button" onClick={() => navigate('/editTrade/' + trade.id, { state : { trade: trade, image: location.state.image }})}>Edit</button>  
                            </div>
                        </div>
                        { location.state.image && <img src={location.state.image} alt={"car image" + Math.random()} height={200}/> }
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
            
        </div>
     );
}
 
export default TradeDetail;