// frontend\src\components\RoleSwitcher.js
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectTemporaryRole,
    selectHasSwitchedRole, 
    selectCurrentRole,
    setHasSwitchedRole,
    setTemporaryRole,
    hasSwitchedRole,
    switchRoleAndNavigate, 
    switchRole, 
    clearTemporaryRole,
    applyRole
} from '../slices/roleSwitchSlice.js';

import {
    selectUserRole
} from '../slices/authSlice.js';

import { getAvailableRoles } from '../utils/roleLogic';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/RoleSwitcher.css';

import api from '../api';
import { ErrorModal } from './Modals.js';
import { set } from 'mongoose';


const RoleSwitcher = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const currentRole = useSelector(selectCurrentRole);

    const originalRole = useSelector(selectUserRole);
    const temporaryRole = useSelector(selectTemporaryRole);
    const hasSwitchedRole = useSelector(selectHasSwitchedRole);
    const availableRoles = getAvailableRoles(currentRole);
    
    console.log('RoleSwitcher rendering, originalRole:', originalRole);
    console.log('RoleSwitcher rendering, temporaryRole:', temporaryRole);

    
    const [hasAppliedRole, setHasAppliedRole] = useState(false);

    const [roles, setRoles] = useState([]); // array of roles (dropdownlist)
    const [isOnDashboard, setIsOnDashboard] = useState(location.pathname.includes('/dashboard/'));
    // the above is tracker for whether or not the user is on the dashboard page

    useEffect(() => { // fetching roles to dropdown list
        const fetchRoles = async () =>{
            try {
                const response = await api.get('/api/users/roles');
                setRoles(response.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, []);

    useEffect(() => { // Update isOnDashboard whenever the location changes
        setIsOnDashboard(location.pathname.includes('/dashboard/'));
    }, [location.pathname]);
   

    const handleRoleChange_old = (event) => {
        console.log('(handleRoleChange) Event Target Value:', event.target.value);
        const newRole = event.target.value;
        //dispatch(setTemporaryRole(event.target.value));
        dispatch(switchRole(newRole));

        navigate(`/dashboard/${newRole}Dashboard`);
    };

    const handleRoleChange = (event) => {
        const newRole = event.target.value;
        dispatch(setTemporaryRole(newRole));
    };

    const handleApplyClick = () => {
        dispatch(applyRole());
    };
    
    
    const handleApplyRole = async () => {
        dispatch(switchRoleAndNavigate({ newRole: temporaryRole })) 
            .then((action) => {
                if (action.payload.success) {
                    // Navigate based on the role after it's applied
                    switch (action.payload.newRole) {
                        case 'admin':
                        navigate('/dashboard/AdminDashboard');
                        break;
                        case 'developer':
                        navigate('/dashboard/DeveloperDashboard');
                        break;
                        case 'cashier':
                        navigate('/dashboard/CashierDashboard');
                        break;
                        case 'accountant':
                        navigate('/dashboard/AccountantDashboard');
                        break;
                        case 'waiter':
                        navigate('/dashboard/WaiterDashboard');
                        break;
                        default:
                        navigate('/');
                        break;
                    }
                    dispatch(setHasSwitchedRole(true));
                }else {
                    // Handle error case
                    window.displayError(action.payload.message);
                }
            });
    };

    const handleRevertRole = async () => {
        // Use originalRole instead of temporaryRole to navigate to the correct dashboard
        dispatch(switchRoleAndNavigate({ newRole: originalRole, navigate }))
            .then((action) => {
                if (action.payload.success) {
                    dispatch(clearTemporaryRole()); // Clear the temporaryRole after reverting
                    dispatch(setHasSwitchedRole(false)); // Reset the hasSwitchedRole flag after reverting
                    navigate(`/dashboard/${originalRole}Dashboard`); // Navigate to the original role's dashboard
                }
            });
    };

    //////////////////////
    return (
        <div className="d-flex flex-column" id="role-switcher-container">
            { !hasSwitchedRole ? (
            <div 
                className="d-flex align-items-center mb-2" 
                id="role-switcher-dropdown">
                <select 
                    value={temporaryRole || ""}
                    onChange={handleRoleChange} 
                    className="form-select m-2" 
                    id="custom-width-role-selector"
                >
                    <option value="" disabled>Select role</option>
                    {roles.map((role, index) => (
                        <option key={index} value={role}>{role}</option>
                    ))}
                </select>
                <button 
                    onClick={handleApplyRole} 
                    className="btn btn-success m-2"
                    id="apply-role-button"
                    disabled={!temporaryRole || temporaryRole === ""}
                >
                    Apply
                </button>
                <hr className="m-2 w-100" />
            </div>
            ) : (
             (isOnDashboard && hasSwitchedRole) &&
                <button 
                    onClick={() => {
                        handleRevertRole();
                    }} 
                    className="btn btn-warning m-2"
                    id="revert-to-original-role-button"
                >
                    Revert to Original Role
                </button>
            )}
            <ErrorModal />
        </div>
    );
};

export default RoleSwitcher;
