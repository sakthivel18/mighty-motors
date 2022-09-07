import React from 'react';
import '../styles/footer.css';


const Footer = () => {
    return (
        <React.Fragment>
            <div className="container-fluid footer py-2">
                <div className="row">
                    <div className="col-md-10 col-sm-10 col-xs-10">
                        <span className="m-2">&copy; Mighty Motors</span>
                        <span className="m-2">About</span>
                        <span className="m-2">Contact</span>
                    </div>
                    <div className="col-md-2 col-sm-2 col-xs-2">
                        <span className="m-2">Instagram</span>
                        <span className="m-2">Twitter</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Footer;