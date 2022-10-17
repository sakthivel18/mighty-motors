import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
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

function App() {
  return (
    <Router>
      <NavBar/>
      <div className="page-container">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signUp" element={<Signup/>} />
          <Route exact path="/trade/:id" element={<TradeDetail/>} />
          <Route exact path="/trades" element={<Trades/>} />
          <Route exact path="/newTrade" element={<NewTrade/>} />
          <Route exact path="/editTrade/:id" element={<EditTrade/>} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
