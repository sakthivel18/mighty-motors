import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/tradeDetail.css";

const TradeDetail = () => {
    const location = useLocation();
    const [trade, setTrade] = useState(null);

    useEffect(() => {
        const fetchTrade = async () => {
            try {
                const response = await axios.get('http://localhost:5000/trades/' + location.state.id);
                setTrade(response.data.trade);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTrade();
    }, []);

    return ( 
        <div className="container tradeDetailContainer">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-12">
                        <h4> {trade?.name} </h4>
                        <img src={location.state.image} alt={"car image" + Math.random()} height={200}/>
                        </div>
                    </div>
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