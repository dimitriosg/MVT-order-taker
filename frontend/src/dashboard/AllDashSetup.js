/* eslint-disable no-unused-vars */
// AllDashSetup.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// REDUX slicers
import { // for login/logout
    loginSuccess, 
    logout, 
    resetLogoutSuccess
} from '../slices/authSlice.js'; // original from db
import * as authSlice from '../slices/authSlice.js';

import { // for role switch
    setOriginalRole, 
    setTemporaryRole,
    setUserName,
    setHasSwitchedRole
} from '../slices/roleSwitchSlice'; // for role switch
import * as roleSwitchActions from '../slices/roleSwitchSlice.js';
/////////////////////////////////

import RoleSwitcher from '../components/RoleSwitcher.js';

import './dashCSS/AllDashStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../api.js';


export const DashboardHeader = () => {
    const dispatch = useDispatch();

    const originalRole = useSelector((state) => state.auth.role);
    const temporaryRole = useSelector((state) => state.roleSwitch.temporaryRole);
    const userName = useSelector((state) => state.auth.userName);
    const hasSwitchedRole = useSelector((state) => state.roleSwitch.hasSwitchedRole);


    return (
        <div className="dashboard-header">
            <h1 className="welcome-msg-dash">Welcome, {userName}!</h1>
            <h4 className="original-role-msg-dash">Original Role: {originalRole}</h4>
            {hasSwitchedRole && (
                <h6 className="selected-role-msg-dash">Selected Role: {temporaryRole}</h6>
            )}
        </div>
    );
};


export const useDashHooks = () => { // for handleLogout
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return {
        handleLogout
    };
};


export const LogoutButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handleLogout = () => {
      dispatch(logout()); 
      navigate('/login'); 
    };
  
    return (
      <button 
        className="btn btn-danger logout-button" 
        id="logout-button" onClick={handleLogout} >
        Logout
      </button>
    );
};

export const BackButton = ({ onBack }) => (
    <button className="btn btn-secondary back-button" 
        id="back-button" onClick={onBack}>
        Back
    </button>
);

const AllDashSetup = () => {
    const navigate = useNavigate();
    const { handleLogout } = useDashHooks();

    const userName = useSelector(authSlice.selectUserName);
    const originalRole = useSelector(authSlice.selectUserRole);
    const hasSwitchedRole = useSelector(roleSwitchActions.selectHasSwitchedRole);
    const temporaryRole = useSelector(roleSwitchActions.selectTemporaryRole);

    console.log('Original Role:', originalRole);
    console.log('Selected Role:', temporaryRole);
    console.log('Has Switched Role:', hasSwitchedRole);

    return (
        <div>
            <div className="d-flex justify-content-between p-2">
                <BackButton onBack={() => navigate('/login')} />
                <LogoutButton onLogout={handleLogout} />
            </div>
            <DashboardHeader 
                userName={userName} 
                originalRole={originalRole} 
                hasSwitchedRole={hasSwitchedRole}
                selectedRole={temporaryRole} 
            />
            <hr id="role-switcher-divider-top" />
            <RoleSwitcher />
            <hr id="role-switcher-divider-bottom" />
        </div>
    );
};

export default AllDashSetup;