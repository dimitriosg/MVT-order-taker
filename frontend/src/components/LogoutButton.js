// src/components/LogoutButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import '../dashboard/dashCSS/AllDashStyles.css';


const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login');  // Redirect to login page after logging out
  };

  return (
    <button 
      className="btn btn-primary" 
      id="logout-button" onClick={handleLogout} >
      Logout
    </button>
  );
};

export default LogoutButton;
