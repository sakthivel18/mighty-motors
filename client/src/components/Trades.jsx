import React, { useEffect, useState } from "react";
import Trade from "./Trade";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Trades = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    
    const images = [
        require('../images/car1.jpg'),
        require('../images/car2.jpg'),
        require('../images/car3.jpg'),
        require('../images/car4.jpg'),
        require('../images/car5.jpg'),
        require('../images/car6.jpg'),
    ];
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/trades/');
                let { categories } = response.data;
                categories.forEach(category => {
                   category.trades.forEach(trade => {
                    let randomIndex = Math.floor(Math.random() * images.length);
                    trade.image = images[randomIndex];
                   });
                });
                setCategories(categories);
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
        fetchCategories();
    }, []);

    return ( 
        <div className="container-fluid mt-3">
            {
                categories.length && categories.map((c) => 
                    <div key={Math.random()}>
                        <h5>{c.categoryName}</h5>
                        <hr/>
                        <div className="row d-flex flex-row">
                        {
                            c.trades.map(trade =><Trade key={Math.random()} tradeDetails={trade}/>)
                        }      
                        </div>  
                    </div>
                )
            }
        </div>
    );
}
 
export default Trades;