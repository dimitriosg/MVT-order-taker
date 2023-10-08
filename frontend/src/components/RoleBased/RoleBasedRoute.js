// src\components\RoleBased\RoleBasedRoute.js
import React from 'react';
import { Route } from 'react-router-dom';
import RoleBasedWrapper from './RoleBasedWrapper';

const RoleBasedRoute = ({ path, allowedRoles, component }) => {
  return (
    <Route
      path={path}
      element={
        <RoleBasedWrapper allowedRoles={allowedRoles}>
          {React.createElement(component)}
        </RoleBasedWrapper>
      }
    />
  );
};

export default RoleBasedRoute;
