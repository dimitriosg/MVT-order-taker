// /frontend/src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole, selectLoginSuccess } from '../slices/authSlice';
import '../styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const userRole = useSelector(selectUserRole);
  const isLoggedIn = useSelector(selectLoginSuccess);
  
  const dashboardPath = `/dashboard/${userRole}Dashboard`;


  return (
    <div className="home-container">
      {isLoggedIn && userRole && (
        <Link to={dashboardPath} className="btn btn-primary m-2">Go To Dashboard</Link>
      )}

      <h1 className="home-title" id="welcome-part-1">Welcome to<br />Order Taker</h1>
      <p className="home-description">Your one-stop solution<br />for seamless order management.</p>

        <Link to="/login" className="btn btn-primary m-2">Login Page</Link>

    </div>
  );
};

export default Home;
