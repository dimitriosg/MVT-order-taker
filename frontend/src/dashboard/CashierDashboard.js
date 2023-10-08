/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

// All Dashboard Setup + CSS (in 1 file)
import DashSetup from './AllDashSetup.js'; 

function CashierDashboard() {

  const updateCashHolding = (newAmount) => {
    // Update the cash holding in the backend
    // Update `cashHolding` state
    // Assume we have a function updateCashHoldingInBackend() that updates the backend
    // updateCashHoldingInBackend(newAmount).then(updatedCashHolding => {
    //   setCashHolding(updatedCashHolding);
    // });
  };

  const notifyAccountant = () => {
    // Notify the Accountant to collect the cash
    // Reset `cashHolding` amount to zero
    // Assume we have a function notifyAccountantInBackend() that notifies the accountant and resets the cash holding
    // notifyAccountantInBackend().then(() => {
    //   setCashHolding({ amount: 0 });
    // });
  };

  return (
    <div className="cashier-dashboard">
        <DashSetup />
      
    </div>
  );
}

export default CashierDashboard;
