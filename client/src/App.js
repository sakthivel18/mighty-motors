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
import ErrorPage from './components/ErrorPage';
import About from './components/About';
import Contact from './components/Contact';

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
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/contact" element={<Contact/>} />
          <Route exact path="/error" element={<ErrorPage/>} />
          <Route path="*" element={<ErrorPage error={{status: 404, message: "Page Not Found"}}/>} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
