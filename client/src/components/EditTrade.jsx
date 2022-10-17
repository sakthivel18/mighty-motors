import axios from 'axios';
import { useState } from 'react';
import {  useLocation, useNavigate } from "react-router-dom";

const EditTrade = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { trade, image } = location.state;
    const [title, setTitle] = useState(trade.name);
    const [tradeLocation, setTradeLocation] = useState(trade.location);
    const [description, setDescription] = useState(trade.description)
    const [cost, setCost] = useState(trade.cost);

    const putTrade = async () => {
        try {
            const newTrade = {
                id: trade.id,
                name: title,
                location: tradeLocation,
                cost: cost, 
                description: description
            }
            const response = await axios.put('http://localhost:5000/trades/' + trade.id, { trade: newTrade });
            if (response.status === 200) {
                navigate('/trade/' + trade.id, { state: { id: trade.id, image: image } });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <h3>Edit Trade</h3>
                    <form>
                        <div className="form-group row my-3">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                            <div className="col-sm-10">
                                <input type="text" value={title} className="form-control" id="title" placeholder="title" onChange={e => setTitle(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="tradeLocation" className="col-sm-2 col-form-label">Trade Location</label>
                            <div className="col-sm-10">
                                <input type="text" value={tradeLocation} className="form-control" id="tradeLocation" placeholder="Enter trade location" onChange={e => setTradeLocation(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="details" className="col-sm-2 col-form-label">Details</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" value={description} placeholder="description" onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="cost" className="col-sm-2 col-form-label">Cost</label>
                            <div className="col-sm-10">
                                <input className="form-control" value={cost} placeholder="Enter cost" onChange={e => setCost(e.target.value)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 d-flex flex-row-reverse">
                                <span type="button" className="btn btn-default mx-3" onClick={() => navigate('/trade/' + trade.id, { state: { id: trade.id, image: image } })}> Cancel</span>
                                <button type="button" className="btn btn-primary" onClick={() => putTrade()}> Update Trade</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}

export default EditTrade;

