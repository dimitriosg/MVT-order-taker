//src\components\RoleBased\RoleBasedWrapper.js
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../slices/authSlice';
import { getAvailableRoles } from '../../utils/roleLogic';

const RoleBasedWrapper = ({ allowedRoles, children }) => {
  const currentRole = useSelector(selectUserRole);
  const availableRoles = getAvailableRoles(currentRole);

  console.log('Current role:', currentRole);
  console.log('Allowed role:', allowedRoles);
  console.log('Available roles:', availableRoles);

  if (currentRole === 'developer' || currentRole === 'admin') {
    if (!allowedRoles.every(currentRole => availableRoles.includes(currentRole))) {
      console.log('Inside RoleBasedWrapper:', allowedRoles, availableRoles);
      return <div>RoleBasedWrapper: Access Denied</div>;
    }
  }

  return children;
};

export default RoleBasedWrapper;
