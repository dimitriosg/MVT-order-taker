/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';

// All Dashboard Setup + CSS (in 1 file)
import DashSetup from './AllDashSetup.js'; 

function AccountantDashboard() {
  const [name, setName] = useState('');


  useEffect(() => {
    // Fetch the name of the ACC from the backend
    DashSetup.api.get('/api/dashboard/acc/details', { withCredentials: true })
      .then(response => {
        setName(response.data.name);
      })
      .catch(error => {
        console.error('Error fetching acc name:', error);
      });

    // Fetch cash holdings for all ACCs from the backend
    DashSetup.api.get('/api/dashboard/data', { withCredentials: true })
      .then(response => {
        //setCashHoldings(response.data.cashHoldings);
      })
      .catch(error => {
        console.error('Error fetching cash holdings:', error);
      });
  }, []);

  const collectCash = (cashierID) => {
    // Collect the cash from the specified Cashier
    DashSetup.api.post('/api/dashboard/acc/update-cash-holding', { cashierID }, { withCredentials: true })
      .then(response => {
        // Update `cashHoldings` state with the updated data from the backend
        //setCashHoldings(response.data.cashHoldings);
      })
      .catch(error => {
        console.error('Error collecting cash:', error);
      });
  };

  return (
    <div className="accountant-dashboard">
      <DashSetup />
    
  </div>
);
}

export default AccountantDashboard;
