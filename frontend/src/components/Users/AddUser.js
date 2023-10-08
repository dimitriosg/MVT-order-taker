// src/components/Users/AddUser.js
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import api from '../../api';

import { ConfirmationModalUser } from '../Modals.js';
import { displayMessage } from '../../utils/usefulFunc.js';

import '../../styles/AddUser.css';

const roles = ['developer', 'admin', 'accountant', 'cashier', 'waiter'];

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '12345678',
    role: roles[4],
  });
  const [message, setMessage] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const closeAllModals = () => {
    setIsModalVisible(false); 
    setIsSuccessModalVisible(false);
};

  const handleSubmit = async (e) => {
        e.preventDefault();
    try {
        const response = await api.post('/api/users/create-user', formData);
        // setMessage(response.data.message || 'User added successfully!');
        displayMessage('User added successfully!', 'success');
    } catch (error) {
        displayMessage('Error adding user');
        // setMessage(error.response.data.message || 'Error adding user.');
    }
  };

  return (
    <div className="add-user">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit} id="add-user-form">
        <div>
          <label>Name: </label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        </div>
        
        <div>
          <label>Email: </label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </div>

        {/* Password is optional*/}

        <div>
          <label>Role: </label>
          <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required>
            {/* Assuming your roles are an array of strings */}
            {roles.map(role => <option key={role} value={role}>{role}</option>)}
          </select>
        </div>
        <button type="submit">Add User</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddUser;
