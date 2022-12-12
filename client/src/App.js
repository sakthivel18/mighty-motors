import React, { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import NavBar from './components/NavBar';
import NewTrade from './components/NewTrade';
import Signup from './components/Signup';
import TradeDetail from './components/TradeDetail';
import Trades from './components/Trades';
import Login from './components/Login';
import EditTrade from './components/EditTrade';
import ErrorPage from './components/ErrorPage';
import About from './components/About';
import Contact from './components/Contact';
import AuthApi from './utils/AuthApi';
import Profile from './components/Profile';
import { hasLoggedIn } from './services/AuthService';
import ManageOffer from './components/ManageOffer';

function App() {
  const authApi = useContext(AuthApi);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const readSession = async () => {
      try {
        const res = await hasLoggedIn();
        if (res.data.auth) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (err) {
        setAuth(false);
      }
    }
    readSession();
  }, []);

  return (
    <AuthApi.Provider value ={{auth, setAuth}}>
        <Router>
          <NavBar/>
          <div className="page-container">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/login" element={ !authApi.auth ? <Login/> : <Navigate to="/" replace/> } />
              <Route exact path="/signUp" element={ !authApi.auth ? <Signup/> : <Navigate to="/" replace/> } />
              <Route exact path="/trade/:id" element={<TradeDetail/>} />
              <Route exact path="/trades" element={<Trades/>} />
              <Route exact path="/newTrade" element={<NewTrade/>} />
              <Route exact path="/editTrade/:id" element={<EditTrade/>} />
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/contact" element={<Contact/>} />
              <Route exact path="/error" element={<ErrorPage/>} />
              <Route exact path="/user/profile" element={<Profile/>} />
              <Route exact path="/offer/manage" element={<ManageOffer/>} />
              <Route path="*" element={<ErrorPage error={{status: 404, message: "Page Not Found"}}/>} />
            </Routes>
          </div>
          <Footer/>
        </Router>
    </AuthApi.Provider>
  );
}

export default App;
