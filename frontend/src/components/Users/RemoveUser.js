// src/components/Users/RemoveUser.js
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../../api';
import '../../styles/RemoveUser.css';

import { ConfirmationModalUserRemove } from '../../components/Modals.js';
import { displayMessage } from '../../utils/usefulFunc';

const roles = ['developer', 'admin', 'accountant', 'cashier', 'waiter'];


const RemoveUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  const [refreshKey, setRefreshKey] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);


  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/users/list');
      setUsers(response.data.users || []);
    } catch (error) {
      setMessage('Error fetching user list.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = selectedRole ? users.filter(user => user.role === selectedRole) : users;


  const handleRemove = async () => {
    if (!selectedUser) return;

    try {
      const response = await api.delete(`/api/users/delete/${selectedUser._id}`);
      //setMessage(response.data.message || 'User removed successfully!');
      displayMessage(`${selectedUser?.name} has been successfully removed!`, 'success');
      setSelectedUser(null);
      fetchUsers(); // Refresh user list after removal
    } catch (error) {
      displayMessage('Error removing user');
    }
  };

  return (
    <div className="remove-user-container">
      <h2>Remove User</h2>

      <div className="remove-user-selects">
        <div>
          <label>Filter Role: </label>
          <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            <option value="" disabled>Select a role</option>
            {roles.map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Select User: </label>
          <select 
            key={refreshKey} // Assign refresh key
            value={selectedUser?._id || ''} 
            onChange={(e) => setSelectedUser(filteredUsers.find(u => u._id === e.target.value))}
          >
            <option value="">Select a user...</option>
            {filteredUsers.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
          </select>
        </div>
      </div>
      
      <button onClick={() => setIsModalVisible(true)}>Remove User</button>

      {isModalVisible && (
        <ConfirmationModalUserRemove 
          show={isModalVisible}
          message={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
          successMessage={successMessage} 
          onConfirm={() => {
            handleRemove();
            setIsModalVisible(false);
          }}
          onCancel={() => {
            setIsModalVisible(false);
            setSuccessMessage(null); 
          }}
        />
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default RemoveUser;
