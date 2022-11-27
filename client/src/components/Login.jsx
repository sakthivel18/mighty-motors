import React, { useState } from "react";
import Snackbar from '@mui/material/Snackbar';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: ''
    });

    const handleLogin = () => {
        if (!email || !password) {
            return setSnackbar({
                open: true,
                message: 'Please enter both email and password'
            });
        }
        console.log(email, password);
    }
    const handleClose = () => {
        setSnackbar({
            open: false,
            message: ''
        })
    }
    const SnackbarAlert = (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={snackbar.open}
                severity='error'
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbar.message}
                key={'top' + 'center'}
            />
        </React.Fragment>
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
                        <div className="d-flex flex-row-reverse">
                            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
            {SnackbarAlert}
         </div>
     );
}
 
export default Login;