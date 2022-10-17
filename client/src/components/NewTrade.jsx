import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import '../styles/newTrade.css';

const NewTrade = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [title, setTitle] = useState('');
    const [tradeLocation, setTradeLocation] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState(0);
    const [categoryNames, setCategoryNames] = useState([]);

    useEffect(() => {
        const fetchCategoryNames = async () => {
            try {
                let response = await axios.get('http://localhost:5000/trades/categories');
                response.data.categoryNames.push({'label' : 'other', 'value' : 0});
                setCategoryNames(response.data.categoryNames);
            } catch(error) {
                console.log(error);
            }
        }
        fetchCategoryNames();
    }, []);

    useEffect(() => {
        setCategory(categoryNames[0]);
    }, []);

    const postTrade = async () => {
        try {
            const trade = {
                categoryId: category.value,
                categoryName: category.label,
                name: title,
                location: tradeLocation,
                description: description,
                cost: cost
            };
            const response = await axios.post('http://localhost:5000/trades/create', { "trade" : trade });
            if (response.status === 200) {
                navigate('/trades');
            }
        } catch (error) {
            console.log(error);
        }
        
    };

    return ( 
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form>
                        <div className="form-group row my-3">
                            <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                            <div className="col-sm-10"> 
                                <Select 
                                    options={categoryNames}
                                    onChange={setCategory}
                                />
                            </div>
                        </div>
                        {
                            category && category.value === 0 && (
                                <div className="form-group row my-3">
                                    <label htmlFor="newCategory" className="col-sm-2 col-form-label">Category name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="title" placeholder="Enter new category" onChange={e => setCategory({label: e.target.value, value : 0})}/>
                                    </div>
                                </div>
                            )
                        }
                        <div className="form-group row my-3">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="title" placeholder="title" onChange={e => setTitle(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="tradeLocation" className="col-sm-2 col-form-label">Trade Location</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="tradeLocation" placeholder="Enter trade location" onChange={e => setTradeLocation(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="details" className="col-sm-2 col-form-label">Details</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" placeholder="description" onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="cost" className="col-sm-2 col-form-label">Cost</label>
                            <div className="col-sm-10">
                                <input className="form-control" placeholder="Enter cost" onChange={e => setCost(e.target.value)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 d-flex flex-row-reverse">
                                <button type="button" className="btn btn-primary" onClick={() => postTrade()}> Create Trade</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
     );
}
 
export default NewTrade;