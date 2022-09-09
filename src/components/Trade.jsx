import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/trade.css";

const Trade = (props) => {
    const navigate = useNavigate();
    const { name, location, imageUrl } = props.tradeDetails;
    const imgSrc = require("../images/car1.jpg");

    return ( 
        <React.Fragment>
                <div className="card trade-card" onClick={() => navigate("/tradeDetail")}>
                    <img className="card-img-top" src={require("../images/car2.jpg")} alt="Card image cap"/>
                    <div className="card-body">
                        <p className="card-text">{name} available at {location} <br/> 
                        posted on: {new Date().toLocaleDateString() }
                        </p>
                    </div>
                </div>
        </React.Fragment>
     );
}
 
export default Trade;