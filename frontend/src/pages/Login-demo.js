/* eslint-disable no-unused-vars */
// frontend\src\pages\Login-demo.js

// REDUX
import { useDispatch, useSelector } from 'react-redux';

import { // for login/logout
  loginSuccess as loginSuccessAction, 
  resetLogoutSuccess, 
  selectLoginSuccess, 
  selectUserRole // Original Role
} from '../slices/authSlice.js'; // original from db
// logout is located on components/LogoutButton.js

import { 
  setOriginalRole, // copy from 'selectUserRole' in authSlice
  setTemporaryRole, 
  selectTemporaryRole,
  switchRoleAndNavigate
} from '../slices/roleSwitchSlice.js';

// DASHBOARD COMPONENTS
import { LogoutButton, useDashHooks } from '../dashboard/AllDashSetup.js';

// REACT + others
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 

import Cookies from 'js-cookie';  // For setting cookies
import api from '../api.js';  // For making HTTP requests
import '../styles/Login.css';  // Import the CSS 
import Home from '../pages/Home.js';

import axios from 'axios'; // Import axios for making HTTP requests
import { useHandleGoToDashboard } from '../utils/dashboardNavigation.js';



const Login = () => { 
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const location = useLocation();

  ///////////////////////////////
  // from AUTH slice
  const originalRole = useSelector((state) => state.auth.role); // orinal role from db
  const logoutSuccess = useSelector(state => state.auth.logoutSuccess); // logout success status
///////////////////////////////
  // from ROLE SWITCH slice
  const temporaryRole = useSelector((state) => state.auth.role); // temporarily, just for definition
  ///////////////////////////////
  // for API
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const token = Cookies.get('token');  // Get the token from cookies
  ///////////////////////////////

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [forgotEmail, setForgotEmail] = useState(''); 
  const [forgotRole, setForgotRole] = useState(''); 
  const [showForgotPassword, setShowForgotPassword] = useState(false); 

  const [fadeOut, setFadeOut] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.loginSuccess);

  const [successMessage, setSuccessMessage] = useState('');

  const handleGoToDashboard = useHandleGoToDashboard(originalRole, navigate, setError);
  
  useEffect(() => { // check if the user is logged in
    if (isLoggedIn) {
        handleGoToDashboard(); // or wherever you'd like to redirect to
    }
}, [isLoggedIn, handleGoToDashboard]);


  useEffect(() => { // fade-out logic
      if (logoutSuccess) {
        const timer = setTimeout(() => {
          setFadeOut(true);
        }, 3000);  // 3 seconds
        return () => clearTimeout(timer);  // Cleanup timer on component unmount
      }
  }, [logoutSuccess, dispatch]);

  useEffect(() => { // loads dashboard if user is already logged in
    if (originalRole) {
      setError('Loading dashboard...');
      setLoading(false);

      setTimeout(() => {
        handleGoToDashboard();
      }, 500);
    }
  }, [originalRole, handleGoToDashboard]);


  const handleLogin = async () => { 
    setLoading(true); 
    setError(null); 

    try { 
      const response = await api.post('/api/users/authenticate', { 
        email, 
        password, 
        role, 
        token
      }); 
      console.log('(Login-demo) Response from login:', response);  // Log the response 

      setLoading(false); 
      dispatch(loginSuccessAction({ 
        userName: response.data.name,
        role: response.data.role,
        token: response.data.token,
        user: {
          name: response.data.name,
          role: response.data.role,
        }
      }));
      console.log('Login success action dispatched');

      if (!response.data.role) {
        setError('Loading dashboard... Please wait.');
        return;
      }

      dispatch(setOriginalRole(response.data.role));

    } catch (error) { 
      setLoading(false); 
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        setError(error.response.data.message || 'Invalid credentials or error logging in.');
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        setError('No response received from server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        setError(error.message);
      }
    } 
    
  }; 

  const handleForgotPassword = async () => { 
    try { 
      await api.post('/forgot-password', { 
        email: forgotEmail, 
        role: forgotRole, 
      }); 
      alert('If the information is correct and if approved, an email will be sent with instructions on how to reset the password. You can also contact your admin directly if you need a faster response.'); 
    } catch (error) { 
      console.log('Error during forgot password', error); 
    } 
  }; 

  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    dispatch(setTemporaryRole(newRole));
  };
  

  const { handleLogout } = useDashHooks();

  // Admin or Developer switches roles
  const handleSwitchRoleAndNavigate = (newRole) => {
    dispatch(setTemporaryRole(newRole));
    dispatch(switchRoleAndNavigate({ newRole, navigate }));
  };

  return (
    <div className="login-container">
      <button className="back-button" onClick={() => navigate('/')}>Back</button>

      {logoutSuccess && !fadeOut && <p className="logout-successfully">Successfully logged out</p>}

      {isLoggedIn && (
      <>        
        <button 
          className="dashboard-button" 
          onClick={handleGoToDashboard}>Go to Dashboard</button>
        <LogoutButton />
      </>
      )}

      
      { !showForgotPassword ? ( 
        <div className="login-form">
          {/* Logo */}
          <img src={`${process.env.PUBLIC_URL}/imavrithalassa_logo.jpg`} alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
        
          {/* Login form */}
          <h1>Login</h1>
          {error && <p className="error-text">{error}</p>}
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit" id="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      ) : (
        <div className="forgot-password-section">
          <h2>Forgot Password?</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleForgotPassword(); }}>
            <label>
              Email:
              <input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
            </label>
            <br />
            <label>
              Role:
              <input type="text" value={forgotRole} onChange={(e) => setForgotRole(e.target.value)} />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <button onClick={() => setShowForgotPassword(!showForgotPassword)}>
        {showForgotPassword ? 'Back to Login' : 'Forgot Password?'}
      </button>
    </div>
  );
}; 

export default Login;
