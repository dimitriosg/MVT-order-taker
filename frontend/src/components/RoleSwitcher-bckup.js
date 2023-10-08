// frontend\src\components\RoleSwitcher.js
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../api';

const RoleSwitcher = () => {
    console.log(localStorage);  // Debugging line
    const navigate = useNavigate();
    const location = useLocation();
    const [originalRole, setOriginalRole] = useState(localStorage.getItem('role'));

    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [hasSwitchedRole, setHasSwitchedRole] = useState(false);
    const [isOnDashboard, setIsOnDashboard] = useState(location.pathname.includes('/dashboard/'));

    useEffect(() => {
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

    useEffect(() => {
        setIsOnDashboard(location.pathname.includes('/dashboard/'));
        console.log('Current path:', location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        console.log('Is on dashboard:', isOnDashboard);
        console.log('Has switched role:', hasSwitchedRole);
    }, [isOnDashboard, hasSwitchedRole]);

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleApplyRole = () => {
        console.log('Applying role:', selectedRole);
        if (selectedRole) {
            switchRoleAndNavigate(selectedRole, navigate);
            setHasSwitchedRole(true);
        }
    };

    const handleRevertRole = () => {
        console.log('Reverting to role:', originalRole);
        if (hasSwitchedRole) {
            switchRoleAndNavigate(originalRole, navigate);
            setHasSwitchedRole(false);
        }
    };

    const switchRoleAndNavigate = (newRole, navigate) => {
        const currentRole = localStorage.getItem('role');

        if (currentRole !== 'admin' && currentRole !== 'developer') {
            console.error('Permission denied: Only Admins and Developers can switch roles.');
            return;
        }

        if (currentRole === 'admin' && newRole === 'developer') {
            console.error('Permission denied: Admins cannot switch to Developer role.');
            return;
        }

        localStorage.setItem('role', newRole);

        switch (newRole) {
            case 'admin':
                navigate('/dashboard/AdminDashboard');
                break;
            case 'developer':
                navigate('/dashboard/DeveloperDashboard');
                break;
            case 'accountant':
                navigate('/dashboard/AccountantDashboard');
                break;
            case 'cashier':
                navigate('/dashboard/CashierDashboard');
                break;
            case 'waiter':
                navigate('/dashboard/WaiterDashboard');
                break;
            default:
                navigate('/');
        }
    };

    return (
        <div className="d-flex align-items-center">
            <select 
                value={selectedRole} 
                onChange={handleRoleChange} 
                className="form-select m-2" 
                id="custom-width-role-selector"
            >
                <option value="" disabled>Select role</option>
                {roles.map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                ))}
            </select>
            <button onClick={handleApplyRole} className="btn btn-success m-2">
                Apply
            </button>
            {hasSwitchedRole && (
                <button onClick={handleRevertRole} className="btn btn-warning m-2">
                    Revert to Original Role
                </button>
            )}
        </div>
    );
};

export default RoleSwitcher;
