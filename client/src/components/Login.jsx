import React, { useContext, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import { login } from "../services/AuthService";
import AuthApi from "../utils/AuthApi";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Login = () => {
    const navigate = useNavigate();
    const authApi = useContext(AuthApi);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'error'
    });

    const handleLogin = async () => {
        if (!email || !password) {
            return setSnackbar({
                open: true,
                message: 'Please enter both email and password',
                severity: 'error'
            });
        }
        try {
            let res = await login({email, password});
            if (res.data.auth) {
                authApi.setAuth(true);
                setSnackbar({
                    open: true,
                    message: 'Login successful',
                    severity: 'success'
                });
                setTimeout(() => {
                    navigate("/user/profile");
                }, 500);   
            }
        } catch(axiosError) {
            let { message } = axiosError.response.data;
            authApi.setAuth(false);
            return setSnackbar({
                open: true,
                message: message,
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

    return ( 
        <div className="container-fluid mt-2">
            <h3>Login</h3>
            <div className="row">
                <div className="col-md-4">
                    <form>
                        <div className="form-group row my-3">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="email" onChange={e => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="password" onChange={e => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="d-flex flex-row-reverse m-2">
                            <a className="text-primary" href="/signUp">Forgot password?</a>
                        </div>
                    </form>
                    <div className="d-flex flex-row-reverse">
                            <button type="" className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
            {SnackbarAlert}
         </div>
     );
}
 
export default Login;