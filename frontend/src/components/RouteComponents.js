// src/components/RouteComponents.js
import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/Home.js';
import Login from '../pages/Login.js';
import RoleBasedRoute from './RoleBased/RoleBasedRoute.js';

// Import your dashboard components
import WaiterDashboard from '../dashboard/WaiterDashboard.js';
import CashierDashboard from '../dashboard/CashierDashboard.js';
import AccountantDashboard from '../dashboard/AccountantDashboard.js';
import AdminDashboard from '../dashboard/AdminDashboard.js';
import DeveloperDashboard from '../dashboard/DeveloperDashboard.js';

const RouteComponents = () => {
    return (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <RoleBasedRoute path="/dashboard/WaiterDashboard" allowedRoles={['waiter']} component={WaiterDashboard} />
        <RoleBasedRoute path="/dashboard/CashierDashboard" allowedRoles={['cashier']} component={CashierDashboard} />
        <RoleBasedRoute path="/dashboard/AccountantDashboard" allowedRoles={['accountant']} component={AccountantDashboard} />
        <RoleBasedRoute path="/dashboard/AdminDashboard" allowedRoles={['admin']} component={AdminDashboard} />
        <RoleBasedRoute path="/dashboard/DeveloperDashboard" allowedRoles={['developer']} component={DeveloperDashboard} />
      </>
    );
};

export default RouteComponents;
