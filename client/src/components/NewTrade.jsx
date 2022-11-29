import axios from 'axios';
import { useEffect, useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import '../styles/newTrade.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from "./Alert";
import AuthApi from '../utils/AuthApi';

const NewTrade = () => {
    const authApi = useContext(AuthApi);
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [title, setTitle] = useState('');
    const [tradeLocation, setTradeLocation] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState();
    const [categoryNames, setCategoryNames] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'error'
    });

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
       if (!authApi.auth) return navigate("/");
        const fetchCategoryNames = async () => {
            try {
                let response = await axios.get('http://localhost:5000/trades/categories', {withCredentials: true});
                response.data.categoryNames.push({'label' : 'other', 'value' : 0});
                setCategoryNames(response.data.categoryNames);
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
        fetchCategoryNames();
    }, []);

    useEffect(() => {
        setCategory(categoryNames[0]);
    }, []);

    const postTrade = async () => {
        try {
            let areOtherFieldsNotValid = !title || !tradeLocation || !description || cost === null || cost === undefined;
            if (category.id === 0 && (!category.label || areOtherFieldsNotValid)) {
                await setSnackbar({
                    open: true,
                    message: 'Please enter all the fields',
                    severity: 'error'
                });
                return;
            } else if (areOtherFieldsNotValid) {
                await setSnackbar({
                    open: true,
                    message: 'Please enter all the fields',
                    severity: 'error'
                });
                return;
            }
            const trade = {
                categoryId: category.value,
                categoryName: category.label,
                name: title,
                location: tradeLocation,
                description: description,
                cost: cost
            };
            const response = await axios.post('http://localhost:5000/trades/create', { "trade" : trade }, {withCredentials: true});
            if (response.status === 200) {
                await setSnackbar({
                    open: true,
                    message: 'Trade created successfully',
                    severity: 'success'
                });
                setTimeout(() => {
                    navigate('/trades');
                }, 500);
            }
        } catch(axiosError) {
            let { status } = axiosError.response;
            let { message } = axiosError.response.data;
            let error = {
                "status": status,
                "message": message
            }
            navigate('/error', { state : { error }});
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
            {SnackbarAlert}
        </div>
     );
}
 
export default NewTrade;